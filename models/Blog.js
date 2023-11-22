import { string } from "joi";
import mongoose from "mongoose";

const BlogCheme = new mongoose.Schema({
  name: String,
  description: String,
    img: String,
    language: String,
    imgUser: String,
    nameUser: String,
  },

    {
        timestamps: true
    },
    

);

export default mongoose.model("Blog", BlogCheme);