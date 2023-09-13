import UserCheme from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CheckvalidateSignIn, CheckvalidateSignUp } from "../middlewares/User";
import nodemailer  from 'nodemailer'
import twilio from 'twilio'
export const SignUp = async (req, res) => {
  try {
    const { name, password, email, phoneNumber  } = req.body;
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
      phoneNumber,
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
    const User = await UserCheme.findOne({email});
    if(!User){
      return res.json({
        message:"Gmail không tồn tại"
      })
    }
    const otpCode = generateOTP();
    User.otp = otpCode;
    await User.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'son01247662388@gmail.com',// tài khoản của mình
        pass: 'ildsabobxdxzyzio' // mật khẩu của mình 01247662388
      }
    });
    const mailOptions = {
      from: 'son01247662388@gmail.com',
      to: email,
      subject: 'Mã OTP để đặt lại mật khẩu',
      text: `Mã OTP của bạn là: ${otpCode}`,
  };
  transporter.
  sendMail(mailOptions, (error, info) => {
      
if (error) {
  console.log(error);
  
 
return res.status(500).json({ message: 'Gửi OTP thất bại' });
}  
    else {  
    console.log('Email đã được gửi: ' + info.response); 
    return res.json({ message: 'OTP đã được gửi thành công' });
        }
      });
  } catch (error) {
    return res.status(401).json({
      message:"không xác định",
    });
  }
};
export const resetPassword = async (req, res) =>{ 
  try {
    const { email, otp, newPassword } = req.body;
    const user = await UserCheme.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: 'Mã OTP không hợp lệ' });
    }
    user.password = newPassword;
    user.otp = undefined;
    await user.save();
      return res.json({ message: 'Đặt lại mật khẩu thành công' });
  } catch (error) {
    return res.status(401).json({
      message:"không xác định",
    });
  }
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
export const changePassword = async (req, res)=>{
  const { email, newPassword } = req.body;
  try {
    
    const User = await UserCheme.findOne({ email });
    if(!User){
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 6);
    User.password = hashedPassword;
    await User.save();
    res.status(200).json({ message: 'Đã đổi mật khẩu thành công' });
  } catch (error) {
    return res.status(401).json({
      message:"không xác định",
    });
  }
}
export const send_otp = async (req,res)=>{
  const accountSid = 'AC2c8d5ecf24d9c97e9cfc671ec2e1e6fd';
  const authToken = 'b4f6636244b058ca9b10009d6674db75';
  const client = twilio(accountSid, authToken);
  try{
    const phoneNumber = req.body.phoneNumber;
    const otp = Math.floor(100000 + Math.random() * 900000);
    client.messages
    .create({
      body: `OTP của bạn là: ${otp}`,
      from: '+84 379 878 379',
      to: phoneNumber,
    })
    .then(() => {
      res.status(200).send('Đã gửi OTP thành công');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Gửi OTP không thành công');
    });
  }catch (error) {
    return res.status(401).json({
      message:"không xác định",
    });
  }
}
export const verify_otp = async (req,res)=>{
  try{
    const phoneNumber = req.body.phoneNumber;
    const User = await UserCheme.findOne({ phoneNumber });
    if(!User){
      return res.status(404).json({ message: 'Không tìm thấy số điện thoại đã đăng ký' });
    }
    const userOTP = req.body.otp;
    if (userOTP === savedOTP) {
      res.status(200).send('Xác minh OTP thành công');
    } else {
      res.status(400).send('OTP không hợp lệ');
    }
  }catch (error) {
    return res.status(401).json({
      message:"không xác định",
    });
  }
}

