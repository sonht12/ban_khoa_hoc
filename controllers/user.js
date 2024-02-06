import UserCheme from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CheckvalidateSignIn, CheckvalidateSignUp } from "../middlewares/User";
import nodemailer from "nodemailer";
import twilio from "twilio";
import bodyParser from "body-parser";
import speakeasy from "speakeasy";
import { generateAccessToken, generateRefreshToken } from "../middlewares/jwt";
import user from "../models/user";
import { v2 as cloudinary } from "cloudinary";

export const SignUp = async (req, res) => {
  try {
    const { name, password, img, email, phoneNumber } = req.body;
    const UserExists = await UserCheme.findOne({ email });
    if (UserExists) {
      return res.json({
        message: "Email đã tồn tại ",
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
      img,
      phoneNumber,
      password: hashedPassword,
      isBlock: 0 // active
    });
    user.password = undefined;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "son01247662388@gmail.com", // tài khoản của mình
        pass: "ildsabobxdxzyzio", // mật khẩu của mình 01247662388
      },
    });
    async function main() {
      const info = await transporter.sendMail({
        from: "son01247662388@gmail.com", // tài khoản ở trên
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
// export const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const { error } = CheckvalidateSignIn.validate(req.body);
//     if (error) {
//       return res.status(500).json({
//         error: error.details[0].message,
//       });
//     }
//     const user = await UserCheme.findOne({ email });
//     if (!user) {
//       return res.json({
//         message: "Email không tồn tại",
//       });
//     }
//     const isMach = await bcrypt.compare(password, user.password);
//     if (!isMach) {
//       return res.json({
//         message: "Password không đúng",
//       });
//     }
//     const token = jwt.sign({ _id: user.id }, "1234", { expiresIn: "1h" });
//     user.password = undefined;
//     return res.json({
//       message: "Đăng nhập thành công",
//       accessTokent: token,
//       user,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       massage: error.message,
//     });
//   }
// };

export const Login = async (req, res) => {
  const { email, password } = req.body;
  // plain object
  const response = await UserCheme.findOne({ email });
  console.log("response_____________", response);
  if (response) {
    if(response.isBlock == 1) { // kiểm tra xem tk có bị block không
      return res.status(401).json({
        success: false,
        message: "Tài khoản đang bị tạm khóa, vui lòng liên hệ Admin để mở khóa.",
      });
    } 
    // Kiểm tra xem mật khẩu có đúng không
    const isPasswordCorrect = await response.isCorrectPassword(password);
    if (isPasswordCorrect) {
      // Tách password và role ra khỏi response
      const { password, refreshToken, ...userData } = response.toObject();
      // Tạo access token
      const accessToken = generateAccessToken(response._id);
      // Tạo refresh token
      const newRefreshToken = generateRefreshToken(response._id);
      // Lưu refresh token vào database
      await UserCheme.findByIdAndUpdate(
        response._id,
        { refreshToken: newRefreshToken },
        { new: true }
      );
      // Lưu refresh token vào cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        accessToken,
        userData,
      });
    }
  }
  // Trường hợp email hoặc mật khẩu không chính xác
  return res.status(401).json({
    success: false,
    message: 'Đăng nhập thất bại. Vui lòng kiểm tra tài khoản hoặc mật khẩu.',
  });
};
export const getCurrent = async (req, res) => {
  const { _id } = req.user;
  const user = await UserCheme.findById(_id).select(
    "-refreshToken -password -role"
  );
  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not found",
  });
};
export const refreshAccessToken = async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies;
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Check token có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
};
export const logout = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Xóa refresh token ở db
  await UserCheme.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xóa refresh token ở cookie trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserCheme.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "son01247662388@gmail.com", // tài khoản của mình
        pass: "ildsabobxdxzyzio", // mật khẩu của mình 01247662388
      },
    });

    const otp = speakeasy.totp({
      secret: user.secret, // Sử dụng secret key của người dùng từ cơ sở dữ liệu
      encoding: "base32",
    });

    const mailOptions = {
      from: "son01247662388@gmail.com",
      to: `${email}`, // email của khách hàng
      subject: "Mã OTP để đặt lại mật khẩu",
      text: `Mã OTP của bạn là: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Gửi OTP thất bại" });
      } else {
        console.log("Email đã được gửi: " + info.response);
        return res.json({ message: "OTP đã được gửi thành công" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi không xác định" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await UserCheme.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    const isValidOTP = speakeasy.totp.verify({
      secret: user.secret,
      encoding: "base32",
      token: otp,
      window: 6,
    });

    if (!isValidOTP) {
      return res.status(400).json({ message: "Mã OTP không hợp lệ" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi không xác định" });
  }
};
export const GetOneUser = async (req, res, next) => {
  try {
    const data = await UserCheme.findById(req.params.id).populate([
      { path: "product" },
      { path: "voucher" },
    ]);
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
export const GetAllUser = async (req, res, next) => {
  try {
    const {role, isBlock, phoneNumber, q, email} = req.query
    let params = {}
    if(phoneNumber) params = {...params, phoneNumber : { $regex: phoneNumber, $options: "i" }} 
    if(q) params = {...params, name : { $regex: q, $options: "i" }  }
    if(email) params = {...params, email : { $regex: email, $options: "i" } }
    if(isBlock) {
      if(isBlock == 'tất cả') {
        delete params.isBlock
      }else if(isBlock == 0) {
        params = {...params, isBlock:  { $ne: 1 } }
      }else {
        params = {...params, isBlock}
      }
    } 
    if(role) {
      if(role == 'tất cả') {
        delete params.role
      }else {
        params = {...params, role }
      }
    }

    const data = await UserCheme.find(params);
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
export const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const User = await UserCheme.findOne({ email });
    if (!User) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 6);
    User.password = hashedPassword;
    await User.save();
    res.status(200).json({ message: "Đã đổi mật khẩu thành công" });
  } catch (error) {
    return res.status(401).json({
      message: "không xác định",
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const filedata = req.file;
    const users = await user.findById(req.params.id); // Use the imported User model
    console.log(filedata);
    if (filedata) {
      // Nếu có file mới được tải lên, xử lý xóa hình ảnh cũ trên Cloudinary
      if (users && users.img) {
        const imageUrl = users.img; // URL hình ảnh
        const parts = imageUrl.split("/"); // Chia chuỗi URL thành các phần dựa trên dấu /
        const imageFileName = parts[parts.length - 1]; // Lấy phần cuối cùng của mảng là tên tệp hình ảnh
        // Nối tên tệp hình ảnh với tiền tố 'lesson_img/' để tạo publicId
        const publicId = `lesson_img/${imageFileName
          .split(".")
          .slice(0, -1)
          .join(".")}`;

        // Sử dụng phương thức uploader.destroy của Cloudinary để xóa hình ảnh bằng publicId
        cloudinary.uploader.destroy(publicId, function (error, result) {
          if (error) {
            console.error("Xóa hình ảnh không thành công:", error);
          } else {
            console.log("Xóa hình ảnh thành công:", result);
          }
        });
      }
    }
    
    const updatedData = {
      ...req.body,
      img: filedata ? filedata.path : users ? users.img : undefined, // Giữ nguyên ảnh cũ nếu không có file mới
    };
    

    const data = await user.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    }); // Use the imported User model
    return res.json({
      message: "Cập nhật thành công",
      data:data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const useGG = async (req, res) => {
  try {
    const { name, password, img, email, phoneNumber } = req.body;
    const UserExists = await UserCheme.findOne({ email });
    if (UserExists) {
      return res.json({
        message: "Email đã tồn tại ",
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
      img,
      phoneNumber,
      password: hashedPassword,
      isBlock: 0,
    });
    user.password = undefined;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "son01247662388@gmail.com", // tài khoản của mình
        pass: "ildsabobxdxzyzio", // mật khẩu của mình 01247662388
      },
    });
    async function main() {
      const info = await transporter.sendMail({
        from: "son01247662388@gmail.com", // tài khoản ở trên
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

export const updateBlockUser = async (req, res) => {
  try {
    console.log(" req.body",  req.body);
    const { isBlock, _id } = req.body;
    const UserExists = await UserCheme.findById(_id);
    if (!UserExists) {
      return res.json({
        message: "User không tồn tại",
      });
    }
    const data = await user.findByIdAndUpdate(_id, {isBlock}, {
      new: true,
    });
    return res.json({
      message: "Cập nhật thành công",
      data: data,
    });

  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}
