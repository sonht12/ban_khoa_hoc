import joi from "joi";
import mongoose from "mongoose";
export const orderSchema = joi.object({
    course: joi
    .string()
    .custom((value, helpers) => {
      // Kiểm tra xem `course` có phải là một ID sản phẩm hợp lệ hay không
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Trường 'course' phải là một ID sản phẩm hợp lệ.");
      }
      // Nếu là một ID sản phẩm hợp lệ, trả về giá trị
      return value;
    })
    .required()
    .messages({
      "string.required": 'Trường "course" là bắt buộc',
    }),
      payment: joi.object({
        paymentMethod: joi
          .string()
          .valid(
            "Thanh toán bằng thẻ",
            "Chuyển khoản ngân hàng",
            "Ví điện tử"
          )
          .required()
          .messages({
            "string.required": 'Trường "paymentMethod" là bắt buộc',
            "any.only": 'Trường "paymentMethod" phải là một giá trị hợp lệ',
          }),
        paymentContent: joi.string().required().messages({
          "string.required": 'Trường "paymentContent" là bắt buộc',
        }),
        bankName: joi.string().when("paymentMethod", {
          is: "Chuyển khoản ngân hàng",
          then: joi.string().required().messages({
            "string.required": 'Trường "bankName" là bắt buộc khi chọn "Chuyển khoản ngân hàng"',
          }),
          otherwise: joi.string().allow("").optional(),
        }),
      }).required(),
})