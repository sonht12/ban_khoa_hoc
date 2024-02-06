import Joi from 'joi';

// Định nghĩa schema kiểm tra cho model hisory test với thông báo tùy chỉnh
export const HistoryTestSchema = Joi.object({

  content: Joi.string()
    .required()
    .messages({
      'any.required': 'Nội dung là trường bắt buộc.',
    }),
  lessonId: Joi.string()
    .required()
    .messages({
      'any.required': 'Bài học là trường bắt buộc.',
    }),
    userId: Joi.string()
    .required()
    .messages({
      'any.required': 'User là trường bắt buộc.',
    })
});
