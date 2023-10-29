import mongoose from "mongoose";
const ProgressSchema = new mongoose.Schema(
  {
    productId:{
        type:String,
       },
    userId:{
        type: String
    },
    progress:{
        type: Number
    },
   
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Progress",ProgressSchema);