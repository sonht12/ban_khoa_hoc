import React, { useEffect, useState, useRef, useMemo } from "react";
import { useGetLessonByIdQuery } from "@/Api/lesson";
import { Quiz } from "@/interface/quizzs";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegStickyNote } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { MdSlowMotionVideo } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Button, Drawer, Input, List, Modal, Space, notification } from "antd";
import {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useRemoveNoteMutation,
} from "@/Api/note";
// Định nghĩa kiểu cho một đối tượng trả lời
type Answer = {
  quizId: any;
  selectedOption: any; 
};

function Videodetail() {
  const { idLesson } = useParams<{ idLesson: string }>();
  const { data: lessonData, isLoading } = useGetLessonByIdQuery(idLesson || "");

  // Trạng thái lưu trữ dữ liệu câu hỏi đã xáo trộn
  const [shuffledQuizzData, setShuffledQuizzData] = useState([]);
  // Trạng thái kiểm tra xem câu trả lời đã được gửi chưa
  const [submitted, setSubmitted] = useState(false);
  // Trạng thái hiển thị nút thử lại
  const [showRetryButton, setShowRetryButton] = useState(false);
  // Trạng thái đếm ngược để hiển thị nút thử lại
  const [countdown, setCountdown] = useState(10);
  // Trạng thái lưu trữ câu trả lời đã chọn
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

  const [noteContent, setNoteContent]: any = useState(""); // State for note content
  const [isEditingNote, setIsEditingNote]: any = useState(false); // State to check if editing note or not
  const [open, setOpen] = useState(false);
  const [noteList, setNoteList]: any = useState([]);
  const [currentLesson, setCurrentLesson]: any = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  // Khai báo mutation và query
  const [addNoteMutation] = useAddNoteMutation();
  const [updateNoteMutation] = useUpdateNoteMutation();
  const [removeNoteMutation] = useRemoveNoteMutation();
  const { data: notesData } = useGetNotesQuery();

  // Hàm xáo trộn một mảng
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const dispatch = useDispatch();
  // Hàm xử lý khi người dùng chọn một câu trả lời
  const selectAnswer = (quiz: Quiz, selectedOption: any) => {
    const updatedAnswers = [...selectedAnswers];
    const answerIndex = updatedAnswers.findIndex(
      (answer: any) => answer.quizId === quiz._id
    );

    if (answerIndex !== -1) {
      updatedAnswers[answerIndex].selectedOption = selectedOption;
    } else {
      updatedAnswers.push({
        quizId: quiz._id,
        selectedOption: selectedOption,
      });
    }
    setSelectedAnswers(updatedAnswers);
  };

  // Hàm xử lý khi người dùng nhấn nút "Nộp bài"
  const handleSubmit = () => {
    setSubmitted(true);
    shuffledQuizzData.forEach((quiz: Quiz) => {
      const correctIndex = quiz.options.indexOf(quiz.correctAnswer);
      const selectedAnswer: any = selectedAnswers.find(
        (answer: any) => answer.quizId === quiz._id
      );

      if (selectedAnswer) {
        const selectedOptionIndex = quiz.options.indexOf(
          selectedAnswer.selectedOption
        );
        quiz.isCorrect = selectedOptionIndex === correctIndex;
      }
    });

    // Đặt thời gian đếm ngược 10 giây trước khi hiển thị nút "Thử lại"
    setTimeout(() => {
      setShowRetryButton(true);
    }, 10000);

    let countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
    }, 10000);
  };

  // Hàm xử lý khi người dùng nhấn nút "Thử lại"
  const handleRetry = () => {
    setSubmitted(false);
    setSelectedAnswers([]);
    setShowRetryButton(false);
  };

  // Sử dụng useEffect để xử lý dữ liệu khi nó thay đổi
  useEffect(() => {
    if (lessonData?.data.quizzs) {
      const quizDataFromAPI = lessonData.data.quizzs;
      const shuffledData: any = quizDataFromAPI.map((quiz:Quiz) => ({
        ...quiz,
        options: shuffleArray([
          quiz.correctAnswer,
          quiz.Wronganswer1,
          quiz.Wronganswer2,
          quiz.Wronganswer3,
        ]),
      }));
      setShuffledQuizzData(shuffledData);
    }
  }, [lessonData]);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (!lessonData) {
    return <div>Không tìm thấy dữ liệu cho sản phẩm này.</div>;
  }
  console.log(lessonData);

  // Note Function
  const startEditingNote = () => {
    setIsEditingNote(true);
  };
  useEffect(() => {
    // Nạp danh sách ghi chú khi nó thay đổi
    if (notesData) {
      setNoteList(notesData);
    }
  }, [notesData]);
  // const setCurrentLesson = (lessonName:any) => {
  //   setCurrentLesson(lessonName);
  // };
  const Context = React.createContext({ name: "Default" });
  const openNotificationDelete = (placement: any) => {
    notification.success({
      message: "Success",
      description: "Ghi chú đã được xóa thành công.",
      placement,
    });
  };

  const openNotificationDSave = (placement: any) => {
    notification.success({
      message: "Success",
      description: "Ghi chú đã được lưu thành công.",
      placement,
    });
  };
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  const quillRef = useRef(null);

  const saveNote = async () => {
    if (quillRef.current) {
      const quillInstance = quillRef.current.getEditor();
      const noteContentHTML = quillInstance.root.innerHTML; // Lấy nội dung HTML từ trình soạn thảo

      // Loại bỏ thẻ HTML để chỉ lấy nội dung văn bản thuần túy
      const plainText = noteContentHTML.replace(/<[^>]+>/g, "");

      if (plainText.trim() !== "") {
        if (editingNoteIndex !== null) {
          // Nếu đang chỉnh sửa một ghi chú tồn tại
          const updatedNotes = [...noteList];
          const editedNoteIndex = editingNoteIndex;
          const editedNote = { ...updatedNotes[editedNoteIndex] }; // Tạo một bản sao của đối tượng
          editedNote.content = plainText; // Cập nhật thuộc tính nội dung

          // Ghi log dữ liệu trước khi gửi lên máy chủ
          console.log(
            "Dữ liệu gửi từ máy khách khi chỉnh sửa ghi chú:",
            editedNote
          );

          try {
            // Gọi updateNoteMutation để cập nhật ghi chú trên máy chủ
            await updateNoteMutation(editedNote);
            updatedNotes[editedNoteIndex] = editedNote; // Gán đối tượng đã cập nhật trở lại mảng
            setNoteList(updatedNotes);
            setIsEditingNote(false);
            setNoteContent("");
            setEditingNoteIndex(null);
          } catch (error) {
            console.error("Lỗi khi chỉnh sửa ghi chú:", error);
          }
        } else {
          // Nếu đang thêm một ghi chú mới
          const newNote = {
            lessonId: lessonData.data._id, // Sử dụng _id từ lessonData
            title: lessonData.data.name, // Sử dụng name từ lessonData
            content: plainText, // Lưu nội dung văn bản thuần túy
          };

          // Ghi log dữ liệu trước khi gửi lên máy chủ
          console.log(
            "Dữ liệu gửi từ máy khách khi thêm ghi chú mới:",
            newNote
          );

          try {
            // Gọi addNoteMutation để thêm ghi chú mới vào máy chủ
            const response = await addNoteMutation(newNote);
            const updatedNotes = [...noteList, response];
            setNoteList(updatedNotes);
            setIsEditingNote(false);
            setNoteContent("");
            openNotificationDSave("bottomLeft");
            console.log(openNotificationDSave);
          } catch (error) {
            console.error("Lỗi khi thêm ghi chú mới:", error);
          }
        }
      }
    }
  };

  const cancelEditingNote = () => {
    setIsEditingNote(false);
    setNoteContent("");
  };

  const toolbarOptions = [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["code-block", "blockquote"],
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const newNote = {
    lessonName: currentLesson,
    content: noteContent,
  };
  const handleEditNote = (index: number) => {
    // Sử dụng ghi chú đã có để chỉnh sửa
    setNoteContent(noteList[index].content);
    setIsEditingNote(true);
    setEditingNoteIndex(index);
  };

  // Hàm để xóa ghi chú
  // Hàm để xóa ghi chú
  const handleDeleteNote = async (index: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa ghi chú này?"
    );

    if (confirmDelete) {
      const noteIdToDelete = noteList[index]._id;

      try {
        const response: any = await removeNoteMutation(noteIdToDelete);

        if (response.error) {
          console.error("Lỗi khi xóa ghi chú:", response.error);
        } else {
          const updatedNotes = [...noteList];
          updatedNotes.splice(index, 1);
          setNoteList(updatedNotes);

          // Hiển thị thông báo sau khi xóa thành công
          openNotificationDelete("bottomLeft");
          console.log(openNotificationDelete);
        }
      } catch (error) {
        console.error("Lỗi khi xóa ghi chú:", error);
      }
    }
  };

  const showModal = (videoId: any) => {
    setSelectedVideoId(videoId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  // Trả về giao diện của component

  return (
    <>
    {/* Phần hiển thị video */}
    <div className="h-[40%]" >
    <video controls width="100%" height="auto">
        <source src={lessonData.data.video} type="video/mp4" />
    
      </video>
    </div>

    {/* Phần hiển thị danh sách câu hỏi và câu trả lời */}
    <div className="justify-center w-full mt-10">
      
    <div className="">
          {isEditingNote ? (
            <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="bg-white shadow-lg rounded-lg">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-3 text-[#50c9c3] text-gradient-[#96deda] text-gradient-[#50c9c3]">
                    Thêm ghi chú
                  </h2>

                  <ReactQuill
                    theme="snow"
                    value={noteContent}
                    onChange={setNoteContent}
                    className="rounded mb-3"
                    modules={{
                      toolbar: toolbarOptions,
                    }}
                    placeholder="Viết ghi chú của bạn ở đây..."
                    style={{ height: "150px" }}
                    ref={quillRef}
                  />
                  <div className="text-right mt-10">
                    <button
                      onClick={cancelEditingNote}
                      className="px-4 py-1 rounded-md transition duration-300 mr-3 font-medium border-4 border-transparent 
  hover:border-4 hover:border-gradient-to-r hover:from-[#13547a] hover:to-[#80d0c7] 
  from-blue-400 to-purple-600 hover:text-eef4fc hover:bg-opacity-50 mt-4"
                      style={{
                        backgroundColor: "#f6f7f9",
                        color: "#04a0ff",
                        borderRadius: "8px",
                      }}
                    >
                      Hủy bỏ
                    </button>

                    <button
                      onClick={saveNote}
                      className="px-4 py-2 text-white rounded-md transition duration-300 
  bg-gradient-to-r from-[#96deda] to-[#50c9c3] hover:bg-gradient-to-r 
  hover:from-[#B7F8DB] hover:to-[#50A7C2] hover:rounded-full font-medium"
                      style={{
                        backgroundColor:
                          "transparent" /* Đặt màu nền trong suốt */,
                        color: "#f6f7f9" /* Mã màu phông */,
                        borderRadius: "10px" /* Góc bo tròn ban đầu */,
                      }}
                    >
                      Lưu ghi chú
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div
                  className="flex rounded p-2 hover:cursor-pointer"
                  onClick={showDrawer}
                >
                  <h2
                    className="text-xl font-semibold mr-3"
                    style={{
                      background: "linear-gradient(135deg, #B7F8DB, #50A7C2)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Ghi chú
                  </h2>
                  <FaRegStickyNote
                    style={{
                      fontSize: "24px",
                      cursor: "pointer",
                      color: "#50A7C2",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                </div>

                <Drawer
                  title="Danh sách ghi chú"
                  placement="right"
                  onClose={onClose}
                  open={open}
                >
                  <ul className="">
                    {noteList.map((note: any, index: any) => (
                      <li
                        key={index}
                        className="mx-1 my-6 border-b-2 border-gray-300 pb-4"
                      >
                        <div className="">
                          <div className="flex mb-2">
                            <p className="font-medium">IIFE, Scope, Closure</p>
                            <h3 className="ml-3 text-teal-500 font-medium">
                              {note.title}
                            </h3>
                          </div>
                          <div className="float-right">
                            <button
                              onClick={() => handleEditNote(index)}
                              className="text-lg"
                            >
                              <AiFillEdit />
                            </button>
                            <Context.Provider value={contextValue}>
                              {contextHolder}
                              <Space>
                                <button
                                  onClick={() => handleDeleteNote(index)}
                                  className="ml-2 text-lg"
                                >
                                  <FiDelete />
                                </button>
                              </Space>
                            </Context.Provider>
                          </div>
                        </div>
                        <strong>Ghi chú:</strong>
                        <div className="mt-2 mb-6">
                          <i>{note.content}</i>
                        </div>
                        <div
                          className="text-xl flex text-center"
                          onClick={() => showModal(note.videoId)}
                          style={{ cursor: "pointer", color: "#ff758c" }}
                        >
                          <MdSlowMotionVideo />
                          <span className="ml-2 text-sm">Xem lại bài học</span>
                        </div>
                        <Modal
                          title="Video Bài học"
                          open={isModalVisible}
                          onCancel={handleCancel}
                          footer={null}
                          style={{ background: "rgba(0, 0, 0, 0.5)" }}
                        >
                          <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${selectedVideoId}`}
                            title="Video"
                            allowFullScreen
                          ></iframe>
                        </Modal>
                      </li>
                    ))}
                  </ul>
                </Drawer>

                <div
                  className="flex items-center px-5 py-2 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #96deda, #50A7C2)",
                  }}
                  onClick={startEditingNote}
                >
                  <AiOutlinePlus className="text-white cursor-pointer" />
                  <button className="ml-1 text-white text-lg">
                    Thêm ghi chú
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
      <h1 className="text-3xl font-semibold">Kiểm tra</h1>
      {shuffledQuizzData.map((quiz: Quiz) => (
        <div key={quiz._id} id={`quiz-${quiz._id}`}>
          {/* Tiêu đề của câu hỏi */}
          <h3 className="font-bold text-xl mt-4">
            Câu hỏi:{" "}
            <samp className="font-medium text-lg">{quiz.name}</samp>
          </h3>

          {/* Danh sách các lựa chọn câu trả lời */}
          <ul className="bg-white px-2 py-8 rounded-lg shadow-lg w-full mt-2 flex gap-4">
            {quiz.options.map((option: any, optionIndex: number) => {
              // Kiểm tra xem lựa chọn này đã được chọn chưa
              const isSelected = selectedAnswers.some(
                (answer: any) =>
                  answer?.quizId === quiz._id &&
                  answer.selectedOption === option
              );

              // Thiết lập class cho mỗi lựa chọn dựa trên trạng thái và câu trả lời
              let answerClassName =
                "cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 mt-2 ";
              if (submitted) {
                if (isSelected && quiz.isCorrect) {
                  answerClassName += " bg-green-500"; // Câu trả lời đúng
                } else if (isSelected && !quiz.isCorrect) {
                  answerClassName += " bg-red-500"; // Câu trả lời sai
                }
              } else if (isSelected) {
                answerClassName += "bg-blue-700"; // Câu trả lời đã chọn nhưng chưa gửi
              }

              return (
                <li
                  key={optionIndex}
                  className={answerClassName}
                  onClick={() => !submitted && selectAnswer(quiz, option)}
                >
                  {String.fromCharCode(65 + optionIndex)}. {option}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Nút "Nộp bài" */}
      {!submitted && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
          onClick={handleSubmit}
        >
          Nộp bài
        </button>
      )}
      {/* Thông báo thời gian chờ trước khi có thể thử lại */}
      {submitted && countdown > 0 && (
        <p className="mt-4 text-lg">
          Bạn sẽ có thể làm lại sau {countdown} giây
        </p>
      )}
      {/* Nút "Làm lại" */}
      {showRetryButton && (
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md mt-4"
          onClick={handleRetry}
        >
          Làm lại
        </button>
      )}
    </div>

    {/* Phần hiển thị và gửi bình luận */}
    <div className="border-2 mt-20 p-8">
      <div className="mt-4 w-full">
        <div className="bg-white p-4 w-full">
          <h1 className="text-2xl font-semibold">Bình luận</h1>
          {/* Phần nhập và gửi bình luận mới */}
          <div className="mt-4">
            <div className="flex items-start space-x-2">
              <img
                src="user-avatar.jpg"
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Tên người dùng</p>
                <p className="text-gray-600">27 Tháng 9, 2023</p>
              </div>
            </div>
            <input
              className="mt-2 w-full h-10 rounded-lg border-2 border-gray-300 "
              placeholder="Viết bình luận của bạn..."
            ></input>
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-md">
                Gửi bình luận
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách bình luận */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Bình luận đã gửi:</h2>
        <div className="mt-4">
          <div className="flex items-start space-x-2">
            <img
              src="user-avatar.jpg"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Tên người dùng 1</p>
              <p className="text-gray-600">27 Tháng 9, 2023</p>
              <p>Nội dung bình luận 1...</p>
            </div>
          </div>
          {/* ... (và các bình luận khác) */}
        </div>
      </div>
    </div>
  </>
  );
}

export default Videodetail;