import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(
  {
    // Thông tin đơn hàng
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderStatus: {
      type: String,
      enum: ["Chờ xử lý", "Thất bại", "Done"],
      default: "Chờ xử lý",
    },
    paymentMethod: {
      type: String,
      enum: ["Chuyển khoản ngân hàng", "Ví điện tử", "free"],
    },
    // Thông tin khóa học
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Tham chiếu đến model Course
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến model User
      required: true,
    },
    paymentCode: {
      type: String,
    },
    payment: {
      paymentMethod: {
        type: String,
        enum: ["Chuyển khoản ngân hàng", "Ví điện tử"],
      },
      paymentDate: Date,
      transactionID: String,
      paymentAmount: String,
      paymentContent: String,
      bankName: String,
    },
  },
  { timestamps: true, versionKey: false }
);
mongoose.plugin(mongoosePaginate);
export default mongoose.model("Order", orderSchema);
