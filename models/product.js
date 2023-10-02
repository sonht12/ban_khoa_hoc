import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
   name:{
    type:String,
   },
   price:{
    type:String,
   },
   img:{
    type:String,
   },
   description:{
    type:String,
   },
   categoryId:{
    type:mongoose.Types.ObjectId,
    ref:"Category",
   },
   lessons: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  paymentContent: {
    type: String, 
  },
  comment: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  totalComment: {
    type: Number, 
    default: 0, 
  },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product",ProductSchema);