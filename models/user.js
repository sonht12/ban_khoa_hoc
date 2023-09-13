import mongoose from "mongoose";

const UserCheme = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  otp: { type: Number },
  role: {
    type: String,
    default: "member",
  },
  phoneNumber: Number
},{
  timestamps: true
});

export default mongoose.model("User", UserCheme);
