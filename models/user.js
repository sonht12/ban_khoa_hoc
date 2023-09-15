import mongoose from "mongoose";

const UserCheme = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  secret: String, // Secret key dùng cho mã OTP
  role: {
    type: String,
    default: "member",
  },
  phoneNumber: Number
},{
  timestamps: true
});

export default mongoose.model("User", UserCheme);