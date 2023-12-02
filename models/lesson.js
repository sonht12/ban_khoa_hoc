import mongoose from "mongoose";
const LessonSchema = new mongoose.Schema(
  {
    name:{
        type:String,
       },
    video:{
        type: String
    },
    videotime:{
      type: Number
  },
    productId:{
      type:mongoose.Types.ObjectId,
      ref:"Product",
     },
    products:{
      type:mongoose.Types.ObjectId,
      ref:"Product",
     },
     quizzs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Quizz",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Lesson",LessonSchema);