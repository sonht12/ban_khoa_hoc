import learning_process from "../models/learning_process";
import scoreSchemar from "../models/scoreSchemar";
export const saveScore  = async (req, res) => {
  try {
    const { score, lessonName,lessonId, progressId } = req.body;
    // Tìm bản ghi điểm số hiện tại dựa trên progressId và lessonName
    const existingScore = await scoreSchemar.findOne({ progressId, lessonName , lessonId });
  
    // Kiểm tra xem bản ghi có tồn tại và liệu điểm số mới có cao hơn không
    if (existingScore && score > existingScore.score) {
      // Xác định trạng thái dựa trên điểm số mới
      const status = score >= 80 ? 'hoàn thành' : 'chưa hoàn thành';
      
      // Cập nhật bản ghi điểm số
      const updatedScore = await scoreSchemar.findByIdAndUpdate(
        existingScore._id,
        { score, status },
        { new: true }
      );
      res.status(200).json(updatedScore);
    } else if (!existingScore) {
      // Nếu không tồn tại bản ghi, tạo mới
      const status = score >= 80 ? 'hoàn thành' : 'chưa hoàn thành';
      const newScore = new scoreSchemar({ score, lessonName, status, progressId, lessonId });

      await newScore.save();

      // Cập nhật tiến trình học tập liên quan
      if (progressId) {
        await learning_process.findByIdAndUpdate(
          progressId, 
          { $addToSet: { scores: newScore._id } },
          { upsert: true }
        );
      }
  
      res.status(201).json(newScore);
    } else {
      // Nếu điểm số mới không cao hơn hoặc lessonName và progressId đã thay đổi, trả về bản ghi hiện tại
      res.status(200).json(existingScore);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  };
  export const getOne=async(req,res)=>{
    try {
        const data = await scoreSchemar.findById(req.params.id);
    return res.json({
      message: "Lấy dữ liệu thanh công",
      data: data,
    });
    } catch (error) {
        return res.status(400).json({
            message:error.message,
        })
    }
}