import Lesson from "../models/lesson";
import Quizz from "../models/quizz";
import { quizzSchema } from "../middlewares/quizz";
export const getAll=async(req,res)=>{
    try {
        const data = await Quizz.find(req.params.id);
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
        const data = await Quizz.findById(req.params.id).populate("lessonId","name");
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
    const data = await Quizz.findByIdAndDelete( req.params.id );
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
        const data = await Quizz.findByIdAndUpdate(req.params.id ,req.body,{ new: true });
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
        const {error} = quizzSchema.validate(req.body,{abortEarly:false});
        if(error){
            return res.status(400).json({
                message:error.details.map((err)=>err.message)
            })
        }
        const data= await Quizz.create(req.body)
        await Lesson.findByIdAndUpdate(data.lessonId,{
            $addToSet:{
                quizzs: data._id
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
