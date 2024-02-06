import joi from "joi";
import mongoose from "mongoose";
export const orderSchema = joi.object({
  user: joi.string(),
  vouche: joi.string(),
  orderStatus : joi.string(),
  course: joi
    .string()
    .custom((value, helpers) => {
      // Kiểm tra xem `course` có phải là một ID sản phẩm hợp lệ hay không
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message(
          "Trường 'course' phải là một ID sản phẩm hợp lệ."
        );
      }
      // Nếu là một ID sản phẩm hợp lệ, trả về giá trị
      return value;
    })
    .messages({
      "string.required": 'Trường "course" là bắt buộc',
    }),
  paymentMethod: joi.string(),
  paymentCode: joi.string(),
  paymentAmount: joi.string(),
  paymentContent: joi.string(),
  bankName: joi.string(),
  payment: joi.object({
    paymentAmount: joi.string(),
    paymentMethod: joi
      .string()
      .valid("Thanh toán bằng thẻ", "Chuyển khoản ngân hàng", "Ví điện tử")
      .messages({
        "string.required": 'Trường "paymentMethod" là bắt buộc',
        "any.only": 'Trường "paymentMethod" phải là một giá trị hợp lệ',
      }),
    paymentContent: joi.string().messages({
      "string.required": 'Trường "paymentContent" là bắt buộc',
    }),
    bankName: joi.string().when("paymentMethod", {
      is: "Chuyển khoản ngân hàng",
      then: joi.string().required().messages({
        "string.required":
          'Trường "bankName" là bắt buộc khi chọn "Chuyển khoản ngân hàng"',
      }),
      otherwise: joi.string().allow("").optional(),
    }),
  }),
});
