import Rating from "../models/rating";
import jwt from "jsonwebtoken";
import Product from "../models/product";
export const createRating = async (req, res) => {
  try {
    const { productId, rating } = req.body;

    // Lấy userId từ thông tin người dùng trong request
    const userId = req.user._id;

    // Tạo một đánh giá mới từ mô hình Rating và lưu nó vào cơ sở dữ liệu
    const newRating = new Rating({ productId, userId, rating });
    await newRating.save();

    // Lấy sản phẩm dựa trên productId
    const product = await Product.findById(productId);

    // Thêm thông tin đánh giá mới vào mảng rating của sản phẩm và lưu lại sản phẩm
    product.rating.push(newRating);
    await product.save();

    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating review' });
  }
};




export const updateRatingtatus = async(req,res) => {
    try {
        const { id } = req.params;
        const { hidden } = req.body;
        // Kiểm tra vai trò của người dùng
        // if (req.user.role !== 'admin') {
        //   return res.status(403).json({ message: 'Bạn không đủ quyền để thực hiện việc này.' });
        // }
        const review = await Rating.findByIdAndUpdate(
          id,
          { hidden },
          { new: true }
        );
        if (!review) {
          return res.status(404).json({ message: 'Không tìm thấy đánh giá.' });
        }
        res.status(200).json(review);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi cập nhật trạng thái đánh giá.' });
      }
}

export const getAllRatings = async (req, res) => {
    try {
      const ratings = await Rating.find();
      res.status(200).json({
        success: true,
        message: 'Danh sách đánh giá đã được tải thành công.',
        data: ratings,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Lỗi khi lấy danh sách đánh giá.' });
    }
  }
  
  export const getRatingById = async (req, res) => {
    try {
      const { id } = req.params;
      const rating = await Rating.findById(id);
      if (!rating) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đánh giá.',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Đánh giá đã được tải thành công.',
        data: rating,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Lỗi khi lấy đánh giá theo Id.' });
    }
  }
  
  export const deleteRating = async (req, res) => {
    try {
      const { id } = req.params;
      const rating = await Rating.findByIdAndDelete(id);
      if (!rating) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đánh giá.',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Đánh giá đã được xóa thành công.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Lỗi khi xóa đánh giá.' });
    }
  }
  
  export const getProductRatings = async (req, res) => {
    try {
      const { _id } = req.params;
  
      // Sử dụng Mongoose để lấy sản phẩm dựa trên productId
      const productWithRatings = await Product.findById(_id).populate({
        path: "rating",
        populate: {
          path: "userId",
          select: "name email",
        },
      });
  
      if (!productWithRatings) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
      }
  
      res.status(200).json(productWithRatings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi khi lấy danh sách đánh giá." });
    }
  };