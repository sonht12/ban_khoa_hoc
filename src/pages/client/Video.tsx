import { useEffect, useState } from "react";
import { useGetLessonByIdQuery } from "@/Api/lesson";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz } from "@/interface/quizzs";
import { useGetProductByIdQuery } from "@/Api/productApi";
import { useGetOneUserQuery } from "@/Api/userApi";
import { IUsers } from "@/interface/user";
import {
  useAddCommentMutation,
  useGetCommentByIdQuery,
} from "@/Api/CommentApi";
import "./index.css";
import { IComment } from "@/interface/comment";
// Định nghĩa kiểu cho một đối tượng trả lời
type Answer = {
  quizId: any;
  selectedOption: any;
};

function Videodetail() {
  const { idLesson } = useParams<{ idLesson: string }>();
  const { data: lessonData, isLoading } = useGetCommentByIdQuery(
    idLesson || ""
  );
  console.log("lesson:", lessonData);
  const [shuffledQuizzData, setShuffledQuizzData] = useState<Quiz[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [countdownInterval, setCountdownInterval] = useState<number | null>(
    null
  );

  // Hàm xáo trộn một mảng
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  type UserType = {
    id: number;
    name: string;
    img: string | number;
    email: string;
    description: string | number;
    // ... other properties if any
  } | null;

  const [commentContent, setCommentContent] = useState("");
  const [addComment] = useAddCommentMutation();

  

  const { idProduct }: any = useParams<{ idProduct: string }>();
  const { data: UserData }: any = useGetProductByIdQuery(idProduct);
  const { idUser } = useParams<{ idUser: string }>();
  const { data: productData }: any = useGetProductByIdQuery(idProduct);

  const [userInfo, setUserInfo] = useState<UserType>(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

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

  // Hàm xử lý khi người dùng nhấn nút "Nộp bài"
  const handleSubmit = () => {
    // Kiểm tra xem tất cả câu hỏi đã được chọn hay chưa
    const allQuestionsAnswered = shuffledQuizzData.every((quiz: Quiz) => {
      const selectedAnswer = selectedAnswers.find(
        (answer: Answer) => answer.quizId === quiz._id
      );
      return selectedAnswer !== undefined;
    });

    if (allQuestionsAnswered) {
      // Tất cả câu hỏi đã được chọn, tiếp tục xử lý nộp bài
      setSubmitted(true);
      shuffledQuizzData.forEach((quiz: Quiz) => {
        const correctIndex = quiz.options.indexOf(quiz.correctAnswer);
        const selectedAnswer: Answer | undefined = selectedAnswers.find(
          (answer: Answer) => answer.quizId === quiz._id
        );

        if (selectedAnswer) {
          const selectedOptionIndex = quiz.options.indexOf(
            selectedAnswer.selectedOption
          );
          quiz.isCorrect = selectedOptionIndex === correctIndex;
        }
      });

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
  const calculateScore = () => {
    const totalQuestions = shuffledQuizzData.length;
    const correctAnswers = shuffledQuizzData.filter(
      (quiz: Quiz) => quiz.isCorrect
    ).length;
    return (correctAnswers / totalQuestions) * 100;
  };
  // hàm xử lý bình luận
  
  const handleSubmitComment = (e: any) => {
    e.preventDefault();
    console.log('Dữ liệu từ trường input:', commentContent);
  
    if (commentContent) {
      const datacomment = {
        productId: idProduct,
        comment: commentContent,
        lessonId: idLesson,
      };
      // Gọi addComment chỉ khi commentContent có giá trị
      addComment(datacomment)
      .unwrap()
      .then((response) => {
        // Xử lý kết quả nếu cần
        console.log("Kết quả sau khi thêm bình luận:", response);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi thêm bình luận:", error);
      });
    } else {
      console.log('Không có dữ liệu commentContent để gửi.');
    }
  
    // Đây, bạn có thể thực hiện các thao tác khác với dữ liệu commentContent
  };
  
  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (!lessonData) {
    return <div>Không tìm thấy dữ liệu cho sản phẩm này.</div>;
  }

  return (
    <>
      {/* Phần hiển thị video */}
      <div className="h-[40%] ">
        <video controls width="100%" height="auto">
          <source src={lessonData.data.video} type="video/mp4" />
        </video>
      </div>
      {/* Phần hiển thị danh sách câu hỏi và câu trả lời */}
      <div className="justify-center w-full mt-10">
        <h1 className="text-3xl font-semibold">Kiểm tra</h1>
        <p className="mt-2 text-lg">Điểm của bạn: {calculateScore()} điểm</p>
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
                {userInfo && userInfo.data && (
                  <img
                    src={
                      (userInfo.data && userInfo.data.img) || "ảnh_mặc_định.jpg"
                    }
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                {userInfo && userInfo.userData && (
                  <img
                    src={userInfo.userData.img || "ảnh_mặc_định.jpg"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  {userInfo && userInfo.data && userInfo.data.name && (
                    <p className="font-semibold">{userInfo.data.name}</p>
                  )}
                </div>
                <div>
                  {userInfo && userInfo.userData && userInfo.userData.name && (
                    <p className="font-semibold">{userInfo.userData.name}</p>
                  )}
                </div>
              </div>
              <form onSubmit={handleSubmitComment}>
                <input
                  className="mt-2 w-full h-10 rounded-lg border-2 border-gray-300"
                  placeholder="Viết bình luận của bạn..."
                  onChange={(e) => setCommentContent(e.target.value)}
                  value={commentContent} // Đảm bảo trạng thái của trường input được cập nhật
                />
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-md"
                  >
                    Gửi bình luận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Danh sách bình luận */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Bình luận đã gửi:</h2>
          <ul className="comment-list">
            {lessonData.data.map((comment) => (
              <li key={comment._id} className="comment-item">
                <img src={comment.Userimg} alt="" />
                <div className="comment-content">
                  <p className="comment-name">{comment.Username}</p>
                  <p>Comment: {comment.comment}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Videodetail;
