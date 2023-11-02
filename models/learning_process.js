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
    scores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
      }
    ],
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Progress",ProgressSchema);