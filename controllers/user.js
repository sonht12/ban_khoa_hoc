import UserCheme from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CheckvalidateSignIn, CheckvalidateSignUp } from "../middlewares/User";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const UserExists = await UserCheme.findOne({ email });
    if (UserExists) {
      return res.json({
        message: " Tài khoản đã tồn tại ",
      });
    }
    const { error } = CheckvalidateSignUp.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        message: error.details[0].message,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await UserCheme.create({
      name,
      email,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.json({
      message: "Tạo tài khoản thành công",
      data: user,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = CheckvalidateSignIn.validate(req.body);
    if (error) {
      return res.status(500).json({
        error: error.details[0].message,
      });
    }
    const user = await UserCheme.findOne({ email });
    if (!user) {
      return res.json({
        message: "Email không tồn tại",
      });
    }
    const isMach = await bcrypt.compare(password, user.password);
    if (!isMach) {
      return res.json({
        message: "Password không đúng",
      });
    }
    const token = jwt.sign({ _id: user.id }, "1234", { expiresIn: "1h" });
    user.password = undefined;
    return res.json({
      message: "Đăng nhập thành công",
      accessTokent: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      massage: error.message,
    });
  }
};
export const GetOneUser = async (req, res, next) => {
  try {
    const data = await UserCheme.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const GetAllUser = async (req, res, next) => {
  try {
    const data = await UserCheme.find();
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      
    });
  }
};
export const DeleteUser = async (req, res, next) => {
  try {
    const data = await UserCheme.findByIdAndDelete({ _id: req.params.id });
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
