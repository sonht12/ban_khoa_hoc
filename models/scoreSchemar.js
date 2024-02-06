import mongoose from "mongoose";
import Progress from "./learning_process";
const scoreSchema = new mongoose.Schema({
    score: {
      type: Number,
      required: true
    },
    scoreNew: {
      type: Number,
      required: false
    },
    lessonName: {
      type: String,
      required: true
    },
    lessonId: {
      type: String,
      required: true
    },
    statusVideo: {
      type: String,
      enum: ['hoàn thành video', 'chưa hoàn thành video']
    },
    progressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Progress'
    }
  }, { timestamps: true }); 
  // Thêm middleware ở đây
  scoreSchema.post('findOneAndDelete', async function(score, next) {
    console.log("Middleware findOneAndDelete triggered", score);
    if (score) {
      const result = await Progress.updateMany(
        { scores: score._id },
        { $pull: { scores: score._id } }
      );
      console.log("Update result", result);
    }
    next();
  });
export default mongoose.model('Score', scoreSchema);