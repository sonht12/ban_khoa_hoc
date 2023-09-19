import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    // Thông tin đơn hàng
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        enum: ["Chờ xử lý", "Đã xác nhận", "Đã thanh toán"],
        default: "Chờ xử lý",
    },

    // Thông tin khóa học
    course:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Tham chiếu đến model Course
        required: true,
    },
    courseInfo: {
        name: String,
        price: String,
        // Thêm các trường khác nếu cần
    },
    // Thông tin người dùng
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến model User
        required: true,
    },
    userInfo: {
        name: String,
        email: String,
        phoneNumber: String,
        // Thêm các trường khác nếu cần
    },
    
    // Thông tin thanh toán
    payment: {
        paymentMethod: {
            type: String,
            enum: ["Thanh toán bằng thẻ", "Chuyển khoản ngân hàng", "Ví điện tử"],
            required: true,
        },
        paymentDate: Date,
        transactionID: String,
        paymentAmount: String,
        paymentContent: String,
        bankName: String,
    },
});

export default mongoose.model("Order",orderSchema);