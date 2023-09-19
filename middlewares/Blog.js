import joi from "joi";
export const blogecheme = joi.object({
    name:joi.string().required().messages({
        "string.required": "Vui lòng nhập Tên",
        "any.required": 'Trường "Tên" là bắt buộc',
    }),

    img:joi.string().required().messages({
        "string.required": "Vui lòng nhập Vui lòng nhập ảnh",
        "any.required": 'Trường "ảnh" là bắt buộc',
    }),
    description:joi.string().required().messages({
        "string.required": "Vui lòng nhập description",
        "any.required": 'Trường "description" là bắt buộc',
    })
  
    
    });