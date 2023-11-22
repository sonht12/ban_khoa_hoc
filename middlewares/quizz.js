import joi from "joi";
export const quizzSchema = joi.object({
name:joi.string().required().messages({
    "string.required": "Vui lòng nhập Tên",
    "any.required": 'Trường "Tên" là bắt buộc',
}),
correctAnswer:joi.string().required().messages({
    "string.required": "Vui lòng nhập đáp án đúng ",
    "any.required": 'Trường "Đáp án" là bắt buộc',
}),
Wronganswer1:joi.string().required().messages({
    "string.required": "Vui lòng nhập đáp án sai ",
    "any.required": 'Trường "Đáp án" là bắt buộc',
}),
Wronganswer2:joi.string().required().messages({
    "string.required": "Vui lòng nhập đáp án sai ",
    "any.required": 'Trường "Đáp án" là bắt buộc',
}),
Wronganswer3:joi.string().required().messages({
    "string.required": "Vui lòng nhập đáp án sai ",
    "any.required": 'Trường "Đáp án" là bắt buộc',
}),
lessonId:joi.string().required(),

});