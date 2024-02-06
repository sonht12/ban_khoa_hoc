import HistoryTest from "../models/historyTest";
import {  HistoryTestSchema } from "../middlewares/historyTest";

export const getOne = async(req,res)=>{
    try {
        const lessonId = req.params.lessonId; // Lấy productId từ route
        const userId = req.params.userId; // Lấy userId từ route
        // Sử dụng productId và userId để tìm sản phẩm và populate thông tin scores
        const data = await HistoryTest.findOne({ lessonId, userId })
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

export const create = async(req,res)=>{
    try {
        const {error} = HistoryTestSchema.validate(req.body,{abortEarly:false});

        if(error){
            return res.status(400).json({
                message:error.details.map((err)=>err.message)
            })
        }
        console.log("req.body", req.body);
        const {lessonId, userId} = req.body
        const dataFind = await HistoryTest.findOne({ lessonId, userId })
        if(dataFind) {
            await HistoryTest.findByIdAndDelete(dataFind._id );
        }
        const data= await HistoryTest.create(req.body)
        
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
