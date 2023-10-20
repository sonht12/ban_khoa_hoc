import { useEffect, useState } from "react";
import { useGetLessonByIdQuery } from "@/Api/lesson";
import { useParams } from "react-router-dom";
import { Quiz } from "@/interface/quizzs";

// Định nghĩa kiểu cho một đối tượng trả lời
type Answer = {
  quizId: any;
  selectedOption: any; 
};

function Videodetail() {
  const { idLesson } = useParams<{ idLesson: string }>();
  const { data: lessonData, isLoading } = useGetLessonByIdQuery(idLesson || "");

  const [shuffledQuizzData, setShuffledQuizzData] = useState<Quiz[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [countdownInterval, setCountdownInterval] = useState<number | null>(null);

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

  // Hàm xử lý khi người dùng nhấn nút "Nộp bài"
  const handleSubmit = () => {
    // Kiểm tra xem tất cả câu hỏi đã được chọn hay chưa
    const allQuestionsAnswered = shuffledQuizzData.every((quiz: Quiz) => {
      const selectedAnswer = selectedAnswers.find((answer: Answer) => answer.quizId === quiz._id);
      return selectedAnswer !== undefined;
    });

    if (allQuestionsAnswered) {
      // Tất cả câu hỏi đã được chọn, tiếp tục xử lý nộp bài
      setSubmitted(true);
      shuffledQuizzData.forEach((quiz: Quiz) => {
        const correctIndex = quiz.options.indexOf(quiz.correctAnswer);
        const selectedAnswer: Answer | undefined = selectedAnswers.find((answer: Answer) => answer.quizId === quiz._id);

        if (selectedAnswer) {
          const selectedOptionIndex = quiz.options.indexOf(selectedAnswer.selectedOption);
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
    const correctAnswers = shuffledQuizzData.filter((quiz: Quiz) => quiz.isCorrect).length;
    return (correctAnswers / totalQuestions) * 100;
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (!lessonData) {
    return <div>Không tìm thấy dữ liệu cho sản phẩm này.</div>;
  }
  const videoSourceUrl = lessonData?.data.video || '';
  console.log(videoSourceUrl);
  
  return (
    <>
    {/* Phần hiển thị video */}
    <div className="h-[40%] " >
    <video key={videoSourceUrl} controls width="100%" height="auto">
    <source src={videoSourceUrl} type="video/mp4" />
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
