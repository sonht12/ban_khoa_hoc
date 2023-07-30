
import highlightChema from "../models/highlight"
import joi from "joi";
const Checkvalidate = joi.object({
  name: joi.string().required(),
  Video: joi.string().required(),
  description: joi.string().required()
});

export const create = async (req, res, next) => {
  try {
    const { error } = Checkvalidate.validate(req.body);
    if (error) {
      return res.json({
        error: error.details[0].message,
      });
    }
    const data = await highlightChema.create(req.body);
    console.log(data);
    return res.json({
      message: "Thêm thanh công",
      data: data,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const GetAll = async (req, res, next) => {
  try {
    const data = await highlightChema.find();
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const GetOne = async (req, res, next) => {
  try {
    const data = await highlightChema.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const Delete = async (req, res, next) => {
  try {
    const data = await highlightChema.findByIdAndDelete({ _id: req.params.id });
    return res.json({
      message: "Xóa thành công",
      data: data,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const Update = async (req, res, next) => {
  try {
    const data = await highlightChema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.json({
      message: "Cập nhật thành công",
      data: data,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
