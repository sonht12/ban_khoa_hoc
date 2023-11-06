import joi from "joi";
export const CourseProgress_Schema = joi.object({
userId:joi.string().required().messages({
    "any.required": 'Trường "id người dùng" là bắt buộc',
}),

productId:joi.string().required().messages({
"any.required": 'Trường "id khóa học" là bắt buộc',
}),

progress:joi.number().messages({
    "any.required": 'Trường "tiến độ" là bắt buộc',
}),


});