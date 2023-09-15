import Lesson from "../models/lesson";
import Product from "../models/product";
import { lessonSchema } from "../middlewares/lesson";
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
export const remove=async(req,res)=>{
    try {
    const data = await Lesson.findByIdAndDelete( req.params.id );
    return res.json({
      message: "Xóa thành công",
      data: data,
    });
    } catch (error) {
        return res.status(400).json({
            message:error.message,
        })
    }
}
export const update=async(req,res)=>{
    try {
        const data = await Lesson.findByIdAndUpdate(req.params.id ,req.body,{ new: true });
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
export const create=async(req,res)=>{
    try {
        const {error} = lessonSchema.validate(req.body,{abortEarly:false});
        if(error){
            return res.status(400).json({
                message:error.details.map((err)=>err.message)
            })
        }
        const data= await Lesson.create(req.body)
        await Product.findByIdAndUpdate(data.productId,{
            $addToSet:{
                lessons: data._id
            }
        })
        return res.json({
            message: "thêm thành công",
            data: data,
          });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
