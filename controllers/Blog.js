import Blog from "../models/Blog";
import UserCheme from "../models/Blog";
import { blogecheme } from "../middlewares/Blog";
import user from "../models/user";



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
        const data = await Blog.findByIdAndUpdate(req.params.id ,req.body,{ new: true });
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
      const { error } = blogecheme.validate(req.body, { abortEarly: false });
      if (error) {
          return res.status(400).json({
              message: error.details.map((err) => err.message)
          });
      }

      // Lưu bài viết vào cơ sở dữ liệu
      const data = await Blog.create(req.body);


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
