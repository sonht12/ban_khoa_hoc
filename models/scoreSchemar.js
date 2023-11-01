import mongoose from "mongoose";
import Progress from "./learning_process";
const scoreSchema = new mongoose.Schema({
    score: {
      type: Number,
      required: true
    },
    lessonName: {
      type: String,
      required: true
    },
    lessonId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['hoàn thành', 'chưa hoàn thành']
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