import Product from "../models/product"; 

async function calculateTotalComment(productId) {
    try {
      // Lấy sản phẩm dựa trên productId và populate trường Comment
      const product = await Product.findById(productId).populate('comment');
  
      if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
      }
  
      // Lấy danh sách đánh giá của sản phẩm
      const comments = product.comment;
  
      if (!comments || comments.length === 0) {
        throw new Error('Không có đánh giá cho sản phẩm.');
      }
  
      // Tính tổng điểm đánh giá
      const total = comments.reduce((sum, comment) => sum + comment.comment, 0);
  
      // Tính điểm trung bình
      const averageComment = total / comments.length;
  
      // Cập nhật trường totalRating của sản phẩm
      product.totalComment = averageComment;
  
      // Lưu sản phẩm với totalRating cập nhật
      await product.save();
  
      return averageComment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

// Hàm lấy giá trị totalComment của sản phẩm
async function getTotalComment(productId) {
  try {
    // Lấy sản phẩm dựa trên productId
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Sản phẩm không tồn tại.');
    }

    // Trả về giá trị totalComment của sản phẩm
    return product.totalComment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Export các hàm để sử dụng trong mã của bạn
export { calculateTotalComment, getTotalComment };
