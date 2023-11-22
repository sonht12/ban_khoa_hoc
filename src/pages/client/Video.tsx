import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { IComment } from "@/interface/comment";
import { useGetLessonByIdQuery } from "@/Api/lesson";
import {
  useNavigate,
  useParams,
  Link,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import isEqual from "lodash/isEqual";
import { Quiz } from "@/interface/quizzs";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegStickyNote } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { MdSlowMotionVideo } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Drawer,
  Input,
  List,
  Modal,
  Space,
  message,
  notification,
} from "antd";
import { BsArrowRight } from "react-icons/bs";
import { useGetProductByIdQuery } from "@/Api/productApi";
import { RaceBy } from "@uiball/loaders";
import {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useRemoveNoteMutation,
} from "@/Api/note";
import {
  useGetCourseprogressByIdQuery,
  useGetProgressByIdQuery,
} from "@/Api/CourseProgress";
import { useCreateCommentMutation } from "@/Api/comment";
import axios from "axios";
import { useAddScoreMutation, useUpdateStatusMutation } from "@/Api/score";
type Answer = {
  quizId: any;
  selectedOption: any;
};
const Comment = React.memo(({ comment }: any) => {
  const [checkComment, setCheckComment] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [queryParameters] = useSearchParams();
  const parentId = queryParameters.get("parentId");
  const navigate = useNavigate();
  const { idProduct } = useParams();
  const [createCommentI] = useCreateCommentMutation();
  const [commentReply, setComment] = useState("");
  const handleReplyComment = useCallback(
    (event: any) => {
      event.preventDefault();
      createCommentI({
        name: commentReply,
        idUser: userInfo.userData._id,
        idCourse: idProduct,
        parentId: parentId,
      })
        .unwrap()
        .then(() => {
          message.success("Comment created successfully");
          setComment("");
        });
    },
    [commentReply, userInfo.userData._id, idProduct, parentId, createCommentI]
  );
  return (
    <div className="comment">
      <div className="comment-content flex">
        <p>{comment?.name}</p>
        <p>{comment?.updatedAt}</p>
        <p>{comment?.user?.name}</p>
        <p className="w-[55px]">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fontSize: 32, marginLeft: 15 }}
          >
            <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
          </svg>
        </p>

        <Button
          onClick={() => {
            setCheckComment(!checkComment);
            navigate({
              search: createSearchParams({
                parentId: comment._id,
              }).toString(),
            });
          }}
        >
          Trả lời
        </Button>
        {checkComment && (
          <form onSubmit={handleReplyComment}>
            <input
              value={commentReply}
              onChange={(event) => setComment(event.target.value)}
              className="mt-2 w-full h-10 rounded-lg border-2 border-gray-300"
              placeholder="Viết bình luận của bạn..."
            />
            <Button htmlType="submit"> Bình Luận </Button>
          </form>
        )}
      </div>
      {comment.children.length > 0 && (
        <div className="comment-children">
          {comment.children.map((child: any) => {
            console.log(child, "children");
            return <Comment key={child._id} comment={child} />;
          })}
        </div>
      )}
    </div>
  );
});
function Videodetail() {
  const { idLesson } = useParams<{ idLesson: string }>();
  const { data: lessonData, isLoading: productIsLoading } =
    useGetLessonByIdQuery(idLesson || "");
  const [createCommentI] = useCreateCommentMutation();
  const [shuffledQuizzData, setShuffledQuizzData] = useState<Quiz[]>([]);
  const [demo, setDemo] = useState<any[]>([]);

  const [submitted, setSubmitted] = useState(false);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [countdownInterval, setCountdownInterval] = useState<number | null>(
    null
  );
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData, isError } = useGetProductByIdQuery(
    idProduct || ""
  );
  useEffect(() => {
    const handelFetchCOmment = async () => {
      const { data } = await axios.get(
        `http://localhost:8088/api/get-src/${idProduct}`
      );
      console.log(data?.data.comment2, "OO");
      setDemo(
        data?.data.comment2.filter((items: any) => items.status == "true")
      );
    };
    handelFetchCOmment();
  }, []);
  const { idUser } = useParams<{ idUser: string }>();
  const { data: Courseprogress } = useGetCourseprogressByIdQuery({
    productId: idProduct,
    userId: idUser,
  });
  console.log(2);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [noteContent, setNoteContent]: any = useState(""); // State for note content
  const [isEditingNote, setIsEditingNote]: any = useState(false); // State to check if editing note or not
  const [open, setOpen] = useState(false);
  const [noteList, setNoteList]: any = useState([]);
  const [currentLesson, setCurrentLesson]: any = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const idOfLesson0 = productData?.data?.lessons[0]?._id;
  // Khai báo mutation và query
  const [addNoteMutation] = useAddNoteMutation();
  const [updateNoteMutation] = useUpdateNoteMutation();
  const [removeNoteMutation] = useRemoveNoteMutation();
  const { data: notesData } = useGetNotesQuery();
  const [addScore] = useAddScoreMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const videoSourceUrl = lessonData?.data.video || "";
  useEffect(() => {
    if (!lessonData) {
    } else {
      setIsLoading(false);
    }
  }, [lessonData]);
  // Hàm xáo trộn một mảng
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  // Hàm xử lý khi người dùng chọn một câu trả lời
  const selectAnswer = (quiz: Quiz, selectedOption: any) => {
    const updatedAnswers = [...selectedAnswers];
    const answerIndex = updatedAnswers.findIndex(
      (answer: Answer) => answer.quizId === quiz._id
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
  const calculateScore = () => {
    const totalQuestions = shuffledQuizzData.length;
    const correctAnswers = shuffledQuizzData.filter(
      (quiz: Quiz) => quiz.isCorrect
    ).length;
    return (correctAnswers / totalQuestions) * 100;
  };
  const handleSubmit = () => {
    const allQuestionsAnswered = shuffledQuizzData.every((quiz: Quiz) => {
      const selectedAnswer = selectedAnswers.find(
        (answer: Answer) => answer.quizId === quiz._id
      );
      return selectedAnswer !== undefined;
    });

    if (allQuestionsAnswered) {
      setSubmitted(true);
      let totalCorrect = 0;
      shuffledQuizzData.forEach((quiz: Quiz) => {
        // Các logic để kiểm tra câu trả lời đúng
        const correctIndex = quiz.options.indexOf(quiz.correctAnswer);
        const selectedAnswer: Answer | undefined = selectedAnswers.find(
          (answer: Answer) => answer.quizId === quiz._id
        );

        if (selectedAnswer) {
          const selectedOptionIndex = quiz.options.indexOf(
            selectedAnswer.selectedOption
          );
          quiz.isCorrect = selectedOptionIndex === correctIndex;
          if (quiz.isCorrect) totalCorrect += 1;
        }
      });

      // Tính điểm và lưu vào cơ sở dữ liệu
      const score = (totalCorrect / shuffledQuizzData.length) * 100;
      const lessonName = lessonData?.data.name || "";
      const lessonId = idLesson;
      const progressId = Courseprogress?.data?._id;
      const scoreData = {
        score,
        lessonName,
        lessonId,
        progressId,
      };
      addScore(scoreData);

      // Đặt thời gian đếm ngược và xử lý nộp bài
      setTimeout(() => {
        setShowRetryButton(true);
      }, 10000);

      let countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setCountdownInterval(countdownInterval);

      setTimeout(() => {
        if (countdownInterval) {
          clearInterval(countdownInterval);
        }
      }, 10000);
    } else {
      // Hiển thị thông báo hoặc thông báo lỗi nếu có câu hỏi chưa được chọn
      alert("Vui lòng chọn đáp án cho tất cả câu hỏi trước khi nộp bài.");
    }
  };
  const lessonIdToFind = idLesson;
  // Hàm để tìm điểm số theo lessonId
  const findScoreByLessonId = (lessonId, scores) => {
    const scoreObj = scores.find((score) => score.lessonId === lessonId);
    return scoreObj ? scoreObj.score : null;
  };
  // Lấy điểm số cho lessonId cụ thể
  const scoreData = Courseprogress
    ? findScoreByLessonId(lessonIdToFind, Courseprogress?.data?.scores)
    : null;
  //sửa lý lấy thời gian video
  const [currentTime, setCurrentTime] = useState(0);
  const reached90PercentRef = useRef(false);
  const idScore = scoreData?._id;

  useEffect(() => {
    const video = document.querySelector("video");
    if (video) {
      video.addEventListener("timeupdate", () => {
        setCurrentTime(video.currentTime);
        const duration = video.duration;
        if (!reached90PercentRef.current && currentTime >= duration * 0.9) {
          reached90PercentRef.current = true;
          if (reached90PercentRef.current) {
            console.log("Đã đạt 90% thời lượng video");
            const statusVideo = "hoàn thành video";
            const score = 0;
            const lessonName = lessonData?.data.name || "";
            const lessonId = idLesson;
            const progressId = Courseprogress?.data?._id;
            const scoreDatacreate = {
              score,
              lessonName,
              lessonId,
              progressId,
              statusVideo,
            };

            // Gọi hàm addScore và xử lý kết quả
            if (!scoreData) {
              addScore(scoreDatacreate)
                .unwrap()
                .then((addedScore) => {
                  console.log("Đã thêm điểm số:", addedScore);
                })
                .catch((error) => {
                  console.error("Lỗi khi thêm điểm số:", error);
                });
            } else if (scoreData && !scoreData.statusVideo) {
              updateStatus({ id: idScore, statusVideo: statusVideo })
                .unwrap()
                .then((updatedStatus) => {
                  console.log("Đã cập nhật trạng thái video:", updatedStatus);
                })
                .catch((error) => {
                  console.error("Lỗi khi cập nhật trạng thái video:", error);
                });
            }
          }
        }
      });
    }
  });
  // Hàm xử lý khi người dùng nhấn nút "Thử lại"
  const handleRetry = () => {
    setSubmitted(false);
    setSelectedAnswers([]);
    setShowRetryButton(false);
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    setCountdown(10);
  };
  // Sử dụng useEffect để xử lý dữ liệu khi nó thay đổi
  useEffect(() => {
    if (lessonData?.data.quizzs) {
      const quizDataFromAPI = lessonData.data.quizzs;
      const shuffledData: Quiz[] = quizDataFromAPI.map((quiz: Quiz) => ({
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
  // Hàm tính điểm
  // NoteLesson
  useEffect(() => {
    // Nạp danh sách ghi chú khi nó thay đổi
    if (notesData) {
      setNoteList(notesData);
    }
  }, [notesData]);
  // Note Function
  const startEditingNote = () => {
    setIsEditingNote(true);
  };
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
  const toolbarOptions = [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["code-block", "blockquote"],
  ];
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
            lessonId: lessonData?.data._id || "", // Sử dụng _id từ lessonData
            title: lessonData?.data.name || "", // Sử dụng name từ lessonData
            content: plainText,
            video: lessonData?.data.video || "", // Lấy video từ lessonData
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
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleEditNote = (index: number) => {
    // Sử dụng ghi chú đã có để chỉnh sửa
    setNoteContent(noteList[index].content);
    setIsEditingNote(true);
    setEditingNoteIndex(index);
  };
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
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
        <div
          className="mt-2 text-black font-medium"
          style={{ color: "#70dbdb" }}
        >
          Loading
        </div>
      </div>
    );
  }
  if (!lessonData) {
    return <div>Không tìm thấy dữ liệu cho sản phẩm này.</div>;
  }

  console.log(videoSourceUrl);
  console.log(productData?.data._id);

  // Lấy điểm số cho lessonId cụ thể
  const score = Courseprogress
    ? findScoreByLessonId(lessonIdToFind, Courseprogress.data.scores)
    : null;
  const handelCreateComment = (event: any) => {
    event.preventDefault();
    createCommentI({
      name: comment,
      idUser: userInfo.userData._id,
      idCourse: idProduct,
    })
      .unwrap()
      .then(() => message.success("Comment created successfully"));
  };
  const uniqueComments = (comments) => {
    const unique = new Map(); 
    comments.forEach((comment) => {
      if (!unique.has(comment._id)) {
        unique.set(comment._id, comment);
      }
    });
    return Array.from(unique.values());
  };
  return (
    <>
      {/* Phần hiển thị video */}
      <div className="h-[40%] ">
        <video key={videoSourceUrl} controls width="100%" height="auto">
          <source src={videoSourceUrl} type="video/mp4" />
        </video>
        <p>Thời gian hiện tại của video: {currentTime} giây</p>
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
                          onClick={() => showModal(note.video)}
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
                          mask={false} // Đặt giá trị này thành false để không có nền mờ
                          width={800} // Đặt chiều rộng theo mong muốn
                          height={400} // Đặt chiều cao theo mong muốn
                        >
                          <iframe
                            width="100%"
                            height="400"
                            src={note.video}
                            title="Video"
                            allowFullScreen
                          ></iframe>
                          <Link
                            to={`/video/${productData?.data._id}/lesson/${idOfLesson0}`}
                          >
                            <div className="flex justify-end items-center font-bold uppercase mt-4 text-base py-2 px-3 ml-100 hover:cursor-pointer">
                              <style>
                                {`.gradient-text {
                                   background: -webkit-linear-gradient(45deg, #ff1b6b, #45caff);
                                  -webkit-background-clip: text;
                                  -webkit-text-fill-color: transparent;
                                  display: inline;
                                 }`}
                              </style>
                              <p className="mr-2 gradient-text hover:bg-gray-50">
                                Đi tới bài học
                              </p>
                              <BsArrowRight className="gradient-text bg-gradient-to-r from-purple-500 to-pink-500 " />
                            </div>
                          </Link>
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
        {/* Test */}
        <h1 className="text-3xl font-semibold">Kiểm tra</h1>
        <p className="mt-2 text-lg">Điểm của bạn: {calculateScore()} điểm</p>
        <p className="mt-2 text-lg">Điểm cao nhất cho bài học {score} điểm</p>
        {shuffledQuizzData.map((quiz: Quiz) => (
          <div key={quiz._id} id={`quiz-${quiz._id}`}>
            {/* Tiêu đề của câu hỏi */}
            <h3 className="font-bold text-xl mt-4">
              Câu hỏi: <samp className="font-medium text-lg">{quiz.name}</samp>
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
        {/* Nút "Làm lại" và điểm số */}
        {showRetryButton && (
          <div>
            <button
              className="bg-yellow-400 hover.bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md mt-4"
              onClick={handleRetry}
            >
              Làm lại
            </button>
          </div>
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
                <p className="w-[55px]">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ fontSize: 32, marginLeft: 15 }}
                  >
                    <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
                  </svg>
                </p>
                <div>
                  <p className="font-semibold">Tên người dùng</p>
                  <p className="text-gray-600">27 Tháng 9, 2023</p>
                </div>
              </div>

              <form onSubmit={handelCreateComment}>
                <input
                  onChange={(event: any) => setComment(event.target.value)}
                  className="mt-2 w-full h-10 rounded-lg border-2 border-gray-300 "
                  placeholder="Viết bình luận của bạn..."
                />
                <button
                  type="submit"
                  className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-md"
                >
                  Gửi bình luận
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Danh sách bình luận */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Bình luận đã gửi:</h2>
          <div className="mt-4">
            <div className="flex items-start space-x-2">
              <p className="w-[55px]">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ fontSize: 32, marginLeft: 15 }}
                >
                  <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
                </svg>
              </p>
              <div>
                {demo
                  ?.filter((items: any) => items.status == "true")
                  .map((comment: any) => {
                    console.log(comment, "true");
                    return <Comment key={comment.name} comment={comment} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Videodetail;
