import Blog from "../models/Blog";
import UserCheme from "../models/Blog";
import { blogecheme } from "../middlewares/Blog";
import user from "../models/user";
import { v2 as cloudinary } from "cloudinary";


export const GetOneBlog = async (req, res, next) => {
  try {
    const data = await UserCheme.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const GetAllBlog = async (req, res, next) => {
  try {
    
    // Sử dụng .populate() để lấy cả userId và các trường khác của blog
    const data = await Blog.find();
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export const updateBlog=async(req,res)=>{
    try {
      const filedata = req.file;
    console.log(filedata);
    const productId = req.params.id;
    const product = await Blog.findById(productId);
    
    if (filedata) {
      // Nếu có file mới được tải lên, xử lý xóa hình ảnh cũ trên Cloudinary
      if (product && product.img) {
        const imageUrl = product.img; // URL hình ảnh
        const parts = imageUrl.split("/"); // Chia chuỗi URL thành các phần dựa trên dấu /
        const imageFileName = parts[parts.length - 1]; // Lấy phần cuối cùng của mảng là tên tệp hình ảnh
        // Nối tên tệp hình ảnh với tiền tố 'lesson_img/' để tạo publicId
        const publicId = `lesson_img/${imageFileName
          .split(".")
          .slice(0, -1)
          .join(".")}`;

        // Sử dụng phương thức uploader.destroy của Cloudinary để xóa hình ảnh bằng publicId
        cloudinary.uploader.destroy(publicId, function (error, result) {
          if (error) {
            console.error("Xóa hình ảnh không thành công:", error);
          } else {
            console.log("Xóa hình ảnh thành công:", result);
          }
        });
      }
    }

    const updatedData = {
      ...req.body,
      img: filedata ? filedata.path : product ? product.img : undefined, // Giữ nguyên ảnh cũ nếu không có file mới
    };

        const data = await Blog.findByIdAndUpdate(productId,updatedData,{ new: true });
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
export const DeleteBlog = async (req, res, next) => {
  try {
    const data = await UserCheme.findByIdAndDelete({ _id: req.params.id });
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
export const createBlog = async (req, res) => {
  try {
    const filedata = req.file;
      const { error } = blogecheme.validate({...req.body,img: filedata.path}, { abortEarly: false });
      if (error) {
        if (filedata) cloudinary.uploader.destroy(filedata.filename);
          return res.status(400).json({
              message: error.details.map((err) => err.message)
          });
      }

      // Lưu bài viết vào cơ sở dữ liệu
      const data = await Blog.create({ ...req.body, img: filedata.path });


      return res.json({
          message: "Thêm thành công",
          data: data,
      });
  } catch (error) {
      return res.status(400).json({
          message: error.message
      });
  }
}
