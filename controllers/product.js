import Product from "../models/product";
import { productSchema } from "../middlewares/product";
import category from "../models/category";
// import Lesson from "../models/lesson";
// import lesson from "../models/lesson";
export const getAll=async(req,res)=>{
    try {
        const data = await Product.find(req.params.id);
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
export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;

        // Lấy thông tin sản phẩm và danh sách rating của sản phẩm
        const product = await Product.findById(productId)
            .populate('categoryId', 'name')
            .populate("lessons")
            .populate({
                path: 'comment',
                populate: {
                    path: 'userId',
                    select: 'name email', // Chọn các trường bạn muốn lấy từ user
                },
            });

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Chuyển đổi dữ liệu rating để tách riêng name, email và userId
        const modifiedComments = product.comment.map((comment) => ({
            _id: comment._id,
            productId: comment.productId,
            name: comment.userId.name,
            email: comment.userId.email,
            comment: comment.comment,
            hidden: comment.hidden,
            createdAt: comment.createdAt,
            __v: comment.__v,
        }));

        return res.json({
            message: 'Lấy dữ liệu thành công',
            data: {
                ...product.toObject(),
                comment: modifiedComments,
                totalComment: modifiedComments.length,
            },
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await comment.findByIdAndDelete(id);
      if (!rating) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy bình luận.',
        });
      }
      res.status(200).json({
        success: true,
        message: 'bình luận đã được xóa thành công.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Lỗi khi xóa bình luận.' });
    }
  }
export const update=async(req,res)=>{
    try {
        const data = await Product.findByIdAndUpdate(req.params.id ,req.body,{ new: true });
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
        const {error} = productSchema.validate(req.body,{abortEarly:false});
        if(error){
            return res.status(400).json({
                message:error.details.map((err)=>err.message)
            })
        }
        const data= await Product.create(req.body)
        await category.findByIdAndUpdate(data.categoryId,{
            $addToSet:{
                products: data._id
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