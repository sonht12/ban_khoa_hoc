import learning_process from "../models/learning_process";
import scoreSchemar from "../models/scoreSchemar";
export const saveScore  = async (req, res) => {
  try {
    const { score,statusVideo, lessonName,lessonId, progressId , scoreNew } = req.body;
    // Tìm bản ghi điểm số hiện tại dựa trên progressId và lessonName
    const existingScore = await scoreSchemar.findOne({ progressId, lessonId });
  
    // Kiểm tra xem bản ghi có tồn tại và liệu điểm số mới có cao hơn không
    if (existingScore) {
      // Xác định trạng thái dựa trên điểm số mới
      // Cập nhật bản ghi điểm số

      const bodyForm = score > existingScore.score ? { score, scoreNew} : {scoreNew}
      const updatedScore = await scoreSchemar.findByIdAndUpdate(
          existingScore._id,
          bodyForm,
          { new: true }
        );
      res.status(200).json(updatedScore);
    } else if (!existingScore) {
      // Nếu không tồn tại bản ghi, tạo mới
 
      const newScore = new scoreSchemar({ score,statusVideo,lessonName,progressId, lessonId, scoreNew });

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
      // Nếu  lessonName và progressId đã thay đổi, trả về bản ghi hiện tại
      res.status(200).json(existingScore);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  };

  export const updatestatusVideo = async (req, res) => {
    try {
      // Sử dụng hàm getOne để lấy dữ liệu ban đầu
      const dataToUpdate = await scoreSchemar.findById(req.params.id);
      console.log("dataToUpdate",dataToUpdate)
      if (!dataToUpdate) {
        return res.status(404).json({
          message: "Không tìm thấy bản ghi",
        });
      }
  
      // Kiểm tra trạng thái của bản ghi
      if (dataToUpdate.statusVideo === "hoàn thành video") {
        return res.status(400).json({
          message: "Không thể cập nhật khi trạng thái đã 'hoàn thành'",
        });
      }
  
      // Nếu trạng thái không phải 'hoàn thành', thực hiện cập nhật
      const updatedData = await scoreSchemar.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      return res.json({
        message: "Cập nhật thành công",
        data: updatedData,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
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
export const getAll= async (req, res, next) => {
  try {
    const data = await scoreSchemar.find();
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      
    });
  }
};
export const getScoreForprogress = async (req, res, next) => {
  try {
    const progressId = req.params.progressId;
    const data = await scoreSchemar.find({
      progressId: progressId,
      statusVideo: "hoàn thành video",
      score: { $gt: 80 }, // Lọc theo điểm số lớn hơn 80
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};