import Lesson from "../models/lesson";
import Product from "../models/product";
import Quizz from "../models/quizz";
import { lessonSchema } from "../middlewares/lesson";
import { v2 as cloudinary } from "cloudinary";
import quizz from "../models/quizz";
export const getAll=async(req,res)=>{
    try {
        const data = await Lesson.find(req.params.id);
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
export const getOne=async(req,res)=>{
    try {
        const data = await Lesson.findById(req.params.id).populate("productId","name").populate("quizzs");
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
export const remove = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const lesson = await Lesson.findById(lessonId);
    // ... logic xóa video trên cloudinary ...
    const videoUrl = lesson.video; //  video URL
      const parts = videoUrl.split("/"); // Chia chuỗi URL thành các phần dựa trên dấu /
      const videoFileName = parts[parts.length - 1]; // Lấy phần cuối cùng của mảng là tên tệp video
      // Nối tên tệp ảnh với tiền tố 'lesson/' để tạo publicId
      const publicId = `lesson_video/${videoFileName
        .split(".")
        .slice(0, -1)
        .join(".")}`;
      console.log(publicId);
      // Sử dụng phương thức delete_resources của Cloudinary để xóa video bằng publicId
      cloudinary.api.delete_resources([publicId], {
        type: "upload",
        resource_type: "video",
      });
    // Xóa `Lesson`
    const data = await Lesson.findByIdAndDelete(lessonId);
    return res.json({
      message: "Xóa bài học và các trắc nghiệm liên quan thành công",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
  
  export const update = async (req, res) => {
    try {
      const videoInfo = req.file;
      const lessonId = req.params.id;
      const lesson = await Lesson.findById(lessonId);
      if (videoInfo) {
        if (lesson && lesson.video) {
          const videoUrl = lesson.video; //  video URL
          const parts = videoUrl.split("/"); // Chia chuỗi URL thành các phần dựa trên dấu /
          const videoFileName = parts[parts.length - 1]; // Lấy phần cuối cùng của mảng là tên tệp video
          // Nối tên tệp ảnh với tiền tố 'lesson/' để tạo publicId
          const publicId = `lesson_video/${videoFileName
            .split(".")
            .slice(0, -1)
            .join(".")}`;
          console.log(publicId);
          // Sử dụng phương thức delete_resources của Cloudinary để xóa video bằng publicId
          cloudinary.api.delete_resources([publicId], {
            type: "upload",
            resource_type: "video",
          });
        }
      }
      const updatedData = {
        ...req.body,
        video: videoInfo ? videoInfo.path : (lesson ? lesson.video : undefined), // Giữ nguyên ảnh cũ nếu không có file mới
      };
  
      const data = await Lesson.findByIdAndUpdate(lessonId, updatedData, { new: true });
  
      return res.json({
        message: "Cập nhật thành công",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
  
  export const create = async (req, res) => {
    try {
      const videoInfo = req.file;
      console.log(videoInfo);
      const { error } = lessonSchema.validate(
        { ...req.body, video: videoInfo.path },
        { abortEarly: false }
      );
      if (error) {
        if (videoInfo)
          cloudinary.api.delete_resources([videoInfo.filename], {
            type: "upload",
            resource_type: "video",
          });
        return res.status(400).json({
          message: error.details.map((err) => err.message),
        });
      }
      const data = await Lesson.create({ ...req.body, video: videoInfo.path });
      await Product.findByIdAndUpdate(data.productId, {
        $addToSet: {
          lessons: data._id,
        },
      });
      return res.json({
        message: "thêm thành công",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };