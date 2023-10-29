import mongoose from "mongoose";

const BlogCheme = new mongoose.Schema({
  name: String,
  description: String,
  img: String,},
    {
        timestamps: true
    }
  
);

export default mongoose.model("Blog", BlogCheme);