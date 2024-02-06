import mongoose from "mongoose";
const HistoryTestSchema = new mongoose.Schema(
  {
      userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
      },
      content:{
        type:String
      },
      lessonId:{
        type:mongoose.Types.ObjectId,
        ref:"Lesson",
      },
   
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("HistoryTest",HistoryTestSchema);