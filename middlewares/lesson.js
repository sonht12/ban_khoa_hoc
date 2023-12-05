import joi from "joi";
export const lessonSchema = joi.object({
name:joi.string().required().messages({
    "string.required": "Vui lòng nhập Tên",
    "any.required": 'Trường "Tên" là bắt buộc',
}),
video:joi.string().required().messages({
    "string.required": "Vui lòng nhập link video ",
    "any.required": 'Trường "Video" là bắt buộc',
}),
videotime:joi.number().required(),

productId:joi.string().required(),

});