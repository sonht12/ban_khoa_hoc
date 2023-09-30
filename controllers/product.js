import Product from "../models/product";
import { productSchema } from "../middlewares/product";
import category from "../models/category";
import { getTotalRating , calculateTotalRating } from "../util/totalRating";
export const getAll = async (req, res) => {
    try {
      // Lấy danh sách tất cả sản phẩm và populate trường categoryId và rating
      const products = await Product.find()
        .populate('categoryId', 'name')
        .populate({
          path: 'rating',
          populate: {
            path: 'userId',
            select: 'name email', // Chọn các trường bạn muốn lấy từ user
          },
        });
  
      return res.json({
        message: 'Lấy dữ liệu thành công',
        data: products,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
  export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;

        // Lấy thông tin sản phẩm và danh sách rating của sản phẩm
        const product = await Product.findById(productId)
            .populate('categoryId', 'name')
            .populate({
                path: 'rating',
                populate: {
                    path: 'userId',
                    select: 'name email', // Chọn các trường bạn muốn lấy từ user
                },
            });

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Chuyển đổi dữ liệu rating để tách riêng name, email và userId
        const modifiedRatings = product.rating.map((rating) => ({
            _id: rating._id,
            productId: rating.productId,
            name: rating.userId.name,
            email: rating.userId.email,
            rating: rating.rating,
            hidden: rating.hidden,
            createdAt: rating.createdAt,
            __v: rating.__v,
        }));

        return res.json({
            message: 'Lấy dữ liệu thành công',
            data: {
                ...product.toObject(),
                rating: modifiedRatings,
                totalRating: modifiedRatings.length,
            },
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

  
export const remove=async(req,res)=>{
    try {
    const data = await Product.findByIdAndDelete( req.params.id );
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