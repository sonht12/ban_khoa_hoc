import mongoose from "mongoose";

const ProductChema = new mongoose.Schema(
  {
    name: String,
    content: String,
    description: String,
    image: String,
    date:String,
    category:String,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", ProductChema);
