import mongoose from "mongoose";
const QuizzSchema = new mongoose.Schema(
  {
    name:{
        type:String,
       },
       correctAnswer:{
        type: String
        },
        Wronganswer1:{
            type: String
        },
        Wronganswer2:{
            type: String
        },
        Wronganswer3:{
          type: String
      },
    lessonId:{
      type:mongoose.Types.ObjectId,
      ref:"Lesson",
     },
    lessons:{
      type:mongoose.Types.ObjectId,
      ref:"Lesson",
     },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Quizz",QuizzSchema);