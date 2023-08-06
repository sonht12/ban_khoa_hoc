import UserCheme from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import { CheckvalidateSignIn, CheckvalidateSignUp } from "../middlewares/User";
import ResetPasswordSchema from "../models/resetPassword";

import nodemailer  from 'nodemailer'
import user from "../models/user";

export const SignUp = async (req, res) => {
  try {
    const { name, password, email  } = req.body;
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'son01247662388@gmail.com',// tài khoản của mình
        pass: 'ildsabobxdxzyzio' // mật khẩu của mình 01247662388
      }
    });
    async function main() {
  
      const info = await transporter.sendMail({
        from: 'son01247662388@gmail.com', // tài khoản ở trên 
        to: `${email}`, // email của khách hàng
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
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
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // check email
    const user = await UserCheme.findOne({ email });
    if (!user) {
      return res.json({
        message: "Email không tồn tại",
      });
    }
    // dich vu gmail cua minh
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'son01247662388@gmail.com',// tài khoản của mình
        pass: 'ildsabobxdxzyzio' // mật khẩu của mình 01247662388
      }
    });
    const resetToken = uuidv4();
    user.resetToken = resetToken;

    const mailOptions = {
      from: 'son01247662388@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://son01247662388@gmail.com/reset-password/${resetToken}`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
  
      return res.json({ message: 'Email sent successfully' });
    });
  } catch (error) {
    return res.status(400).json({
      massage: error.message,
    });
  }
};
export const resetPassword = async (req, res) =>{
  const { email, token, newPassword } = req.body;
  const user = user.find((user) => user.email === email && user.resetToken === token);

  if (!user) {
    return res.status(404).json({ message: 'User not found or invalid token' });
  }

  // Update the user's password and clear the reset token
  user.password = newPassword;
  user.resetToken = null;

  return res.json({ message: 'Password reset successful' });
}


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