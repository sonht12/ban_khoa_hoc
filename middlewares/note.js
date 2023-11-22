import Joi from 'joi';

// Định nghĩa schema kiểm tra cho model Note với thông báo tùy chỉnh
export const noteSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'any.required': 'Tiêu đề là trường bắt buộc.',
    }),
  content: Joi.string()
    .required()
    .messages({
      'any.required': 'Nội dung là trường bắt buộc.',
    }),
  lessonId: Joi.string()
    .required()
    .messages({
      'any.required': 'Bài học là trường bắt buộc.',
    })
});
