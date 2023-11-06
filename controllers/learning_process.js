import Progress from "../models/learning_process"
import { CourseProgress_Schema } from "../middlewares/learning_process";
import scoreSchemar from "../models/scoreSchemar";
export const GetOneprocess = async (req, res, next) => {
  try {
    const data = await Progress.findById(req.params.id);
return res.json({
  message: "Lấy dữ liệu thanh công",
  data: data,
});
} catch (error) {
    return res.status(400).json({
        message:error.message,
    })
}
};
export const GetOne = async (req, res, next) => {
  try {
    const productId = req.params.productId; // Lấy productId từ route
    const userId = req.params.userId; // Lấy userId từ route

    // Sử dụng productId và userId để tìm sản phẩm và populate thông tin scores
    const data = await Progress.findOne({ productId, userId }).populate("scores");
   
    if (data) {
      // Lấy ra scores, lessonName và status từ data
      return res.json({
        message: 'Lấy dữ liệu thành công',
        data: data// Gửi thông tin scores, lessonName và status về client
      });
    } else {
      return res.status(404).json({
        message: 'Không tìm thấy bản ghi',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const checkCourseAndReturnMessage = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;

  try {
    const existingProgress = await Progress.findOne({ productId, userId });
    if (existingProgress) {
      return res.json({ message: "Khóa học đã được đăng ký" });
    } else {
      return res.json({ message: "Khóa học chưa được đăng ký" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Lỗi xảy ra trong quá trình kiểm tra trạng thái khóa học." });
  }
};

export const getAll= async (req, res, next) => {
  try {
    const data = await Progress.find();
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      
    });
  }
};
export const getCoursesForUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // Sử dụng userId để tìm tất cả các khóa học của người dùng
    const data = await Progress.find({ userId: userId });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const update=async(req,res)=>{
    try {
        const data = await Progress.findByIdAndUpdate(req.params.id ,req.body,{ new: true });
          return res.json({
            message: "Cập nhật thành công",
            data: data,
          });
    } catch (error) {
        return res.status(400).json({
            message:error.message,
        })
    }
}

export const Delete = async (req, res) => {
  try {
    const data = await Progress.findByIdAndDelete({ _id: req.params.id });
    return res.json({
      message: "Xóa thành công",
      data: data,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const progress = 0;
    const { error } = CourseProgress_Schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    // Kiểm tra xem đã tồn tại bản ghi với cùng productId và userId chưa
    const existingProgress = await Progress.findOne({ productId: req.body.productId, userId: req.body.userId });
    
    if (existingProgress) {
      return res.status(409).json({
        message: 'Người dùng đã đăng ký khóa học này trước đó.',
      });
    }

    // Nếu không có bản ghi tồn tại, thì thêm mới vào cơ sở dữ liệu
    const data = await Progress.create({ ...req.body, progress: progress });
    return res.json({
      message: 'Thêm thành công',
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

