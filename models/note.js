import mongoose from "mongoose";

// Định nghĩa schema cho model Note
const noteSchema = new mongoose.Schema(
  {
    // ID tự động được tạo bởi MongoDB
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    minute: {
      type: String,
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson", // Đây là tên của model Lesson
      required: true,
    },
    video: {
      // Thêm trường videoUrl vào schema
      type: String,
      required: false,
    },
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến model User
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Tạo model từ schema
export default mongoose.model("Note", noteSchema);
