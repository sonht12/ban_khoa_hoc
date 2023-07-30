import mongoose from "mongoose";

const UserCheme = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "member",
  },
});

export default mongoose.model("User", UserCheme);
