import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserCheme = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    authGoogleId:{
      type: String,
      default: null
    },
    authType:{
      type: String,
      enum:['local', 'google'],
      default: 'local'
    },
    secret: String,
    img: String,
    voucher: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voucher",
      },
    ],
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    role: {
      type: String,
      default: "member",
    },
    isBlock: {
      type: Number,
      default: 0, //0 là active , 1 là đã bị khóa,
    },
    refreshToken: {
      type: String,
    },
    phoneNumber: String,
  },
  {
    timestamps: true,
  }
);

UserCheme.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};
export default mongoose.model("User", UserCheme);
