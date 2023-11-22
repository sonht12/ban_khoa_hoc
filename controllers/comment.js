import Comment from "../models/comment";
import jwt from "jsonwebtoken";
import Product from "../models/product";
import user from "../models/user";
export const createComment = async (req, res) => {
  try {
    const { productId, comment, lessonId } = req.body;
    // Lấy userId từ thông tin người dùng trong request
    const userId = req.user._id;
    // Tạo một đánh giá mới từ mô hình Rating và lưu nó vào cơ sở dữ liệu
    const newComment = new Comment({ productId, userId, comment, lessonId });
    await newComment.save();
    // Lấy sản phẩm dựa trên productId
    const product = await Product.findById(productId);
    // Thêm thông tin đánh giá mới vào mảng rating của sản phẩm và lưu lại sản phẩm
    product.comment.push(newComment);
    await product.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { hidden } = req.body;
    // Kiểm tra vai trò của người dùng
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Bạn không đủ quyền để thực hiện việc này." });
    }
    const review = await Comment.findByIdAndUpdate(
      id,
      { hidden },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy bình Luận." });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật trạng thái bình luận." });
  }
};

export const GetAllCommentForlesson = async (req, res) => {
  try {
    const lessonId = req.params.idlesson; // Lấy lessonId từ route
    const data = await Comment.find({ lessonId: lessonId });
    res.status(200).json({
      success: true,
      message: "Danh sách bình luận đã được tải thành công.",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Lỗi khi lấy danh sách bình luận." });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const lessonId = req.params.idlesson; // Lấy lessonId từ route
    const comments = await Comment.find({ lessonId: lessonId });

    // Lấy danh sách userId từ các bình luận
    const userIds = comments.map((comment) => comment.userId);

    // Tìm thông tin của người dùng dựa trên userIds
    const users = await user.find({ _id: { $in: userIds } });

    // Kết hợp thông tin người dùng và bình luận
    const commentsWithUserDetails = comments.map((comment) => {
      const user = users.find(
        (u) => u._id.toString() === comment.userId.toString()
      );
      return {
        ...comment.toObject(), // Chuyển comment thành một đối tượng thường (plain object)
        Username: user ? user.name : "Không tìm thấy thông tin người dùng",
        Userimg: user ? user.img : null,
      };
    });

    res.status(200).json({
      success: true,
      message: "Danh sách bình luận đã được tải thành công.",
      data: commentsWithUserDetails,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Lỗi khi lấy danh sách bình luận." });
  }
};

export const DeleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Bình Luận không xóa thành công.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Bình luận đã được xóa thành công.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Lỗi khi xóa bình luận." });
  }
};

export const getProductComments = async (req, res) => {
  try {
    const { _id } = req.params;

    // Sử dụng Mongoose để lấy sản phẩm dựa trên productId
    const productWithComment = await Product.findById(_id).populate({
      path: "comment",
      populate: {
        path: "userId",
        select: "name email",
      },
    });

    if (!productWithComment) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }

    res.status(200).json(productWithComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách đánh giá." });
  }
};
