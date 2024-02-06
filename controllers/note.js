import Note from "../models/note"; // Import model Note
import Product from "../models/product";
import Lesson from "../models/lesson";
import { noteSchema } from "../middlewares/note";
// Controller để tạo ghi chú mới
export const createNote = async (req, res) => {
  try {
    const { lessonId, title, content, minute ,userId} = req.body;

    // Kiểm tra xem lessonId có tồn tại trong cơ sở dữ liệu không.
    const existingLesson = await Lesson.findById(lessonId);
    if (!existingLesson) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy bài học có lessonId tương ứng." });
    }
    // Lấy URL video từ bài học
    const video = existingLesson.video;
    // Tạo một ghi chú mới và liên kết nó với bài học (lessonId).
    const newNote = new Note({
      lessonId,
      title,
      content,
      minute,
      video, // Lưu URL video vào trường videoUrl
      userId,
    });

    const savedNote = await newNote.save();
    if (!savedNote) {
      return res.status(500).json({ error: "Lỗi khi lưu ghi chú." });
    }
    res
      .status(201)
      .json({ message: "Ghi chú đã được tạo thành công.", data: savedNote });
  } catch (error) {
    console.error("Lỗi khi tạo ghi chú:", error);
    res.status(500).json({ error: "Lỗi khi tạo ghi chú."+error });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    // Tìm tất cả các ghi chú liên quan đến bài học có lessonId.
    const notes = await Note.find({ lesson: lessonId });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách ghi chú cho bài học:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách ghi chú." });
  }
};

export const getNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    // Tìm ghi chú có ID là noteId.
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: "Không tìm thấy ghi chú." });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin ghi chú:", error);
    res.status(500).json({ error: "Lỗi khi lấy thông tin ghi chú." });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    // Xóa ghi chú có ID là noteId.
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ error: "Không tìm thấy ghi chú để xóa." });
    }
    res.status(200).json({ message: "Ghi chú đã được xóa thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa ghi chú:", error);
    res.status(500).json({ error: "Lỗi khi xóa ghi chú." });
  }
};

export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content, videoUrl } = req.body;

    // Cập nhật thông tin ghi chú có ID là noteId, bao gồm cả URL video.
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, videoUrl }, // Bổ sung cập nhật video
      { new: true }
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy ghi chú để cập nhật." });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Lỗi khi cập nhật ghi chú:", error);
    res.status(500).json({ error: "Lỗi khi cập nhật ghi chú." });
  }
};

export const getNotesByLessonId = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;

    // Tìm tất cả các ghi chú có lessonId tương ứng
    const notes = await Note.find({ lessonId });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách ghi chú theo bài học:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách ghi chú." });
  }
};
export const getNotesByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    // Tìm tất cả các ghi chú có userId tương ứng
    const notes = await Note.find({ user: userId });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách ghi chú theo người dùng:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách ghi chú." });
  }
};
