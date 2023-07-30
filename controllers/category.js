import ChemeCategory from "../models/category";
import joi from "joi";
const Checkvalidate = joi.object({
  name: joi.string().required(),
});

export const create = async (req, res, next) => {
  try {
    const { error } = Checkvalidate.validate(req.body);
    if (error) {
      return res.json({
        error: error.details[0].message,
      });
    }
    const { name } = req.body;
    const CategoryExists = await ChemeCategory.findOne({ name });
    if (CategoryExists) {
      return res.json({
        message: "Danh mục đã tồn tại",
      });
    } else {
      const data = await ChemeCategory.create(req.body);
      return res.json({
        message: "Thêm thanh công",
        data: data,
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const GetAll = async (req, res, next) => {
  try {
    const data = await ChemeCategory.find();
    return res.json({
      message: "Lấy dữ liệu thanh công",
      data: data,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const GetOne = async (req, res, next) => {
  try {
    const data = await ChemeCategory.findById(req.params.id).populate(
      "Product"
    );
    return res.json({
      message: "Lấy dữ liệu thanh công",
      data: data,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const Delete = async (req, res, next) => {
  try {
    const data = await ChemeCategory.findByIdAndDelete({ _id: req.params.id });
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
    const data = await ChemeCategory.findByIdAndUpdate(
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