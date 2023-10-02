import Blog from "../models/Blog";
import BlogCheme from "../models/Blog";
import { blogecheme } from "../middlewares/Blog";



export const GetOneBlog = async (req, res, next) => {
  try {
    const data = await BlogCheme.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const GetAllBlog = async (req, res, next) => {
  try {
    const data = await BlogCheme.find();
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
    const data = await BlogCheme.findByIdAndDelete({ _id: req.params.id });
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
export const createBlog=async(req,res)=>{
    try {
        const {error} = blogecheme.validate(req.body,{abortEarly:false});
        if(error){
            return res.status(400).json({
                message:error.details.map((err)=>err.message)
            })
        }
        const data= await Blog.create(req.body)
        return res.json({
            message: "Thêm thành công",
            data: data,
          });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

