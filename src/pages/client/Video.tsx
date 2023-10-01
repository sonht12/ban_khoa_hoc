import React, { useEffect, useState } from "react";
import { useGetLessonByIdQuery } from "@/Api/lesson";
import { useNavigate, useParams } from "react-router-dom";

function Videodetail() {
  const { idLesson } = useParams<{ idLesson: string }>();
  const { data: lessonData, isLoading } = useGetLessonByIdQuery(idLesson || "");
  const [shuffledQuizzData, setShuffledQuizzData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [countdown, setCountdown] = useState(10);



  // Hàm xáo trộn mảng ngẫu nhiên
  function shuffleArray(array:any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Hàm xử lý khi người dùng chọn đáp án
  const selectAnswer = (quiz, selectedOption) => {
    // Tạo một bản sao của mảng selectedAnswers
    const updatedAnswers = [...selectedAnswers];

    // Xác định xem người dùng đã chọn đáp án hay chưa
    const answerIndex = updatedAnswers.findIndex(
      (answer) => answer.quizId === quiz._id
    );

    if (answerIndex !== -1) {
      // Nếu đáp án đã được chọn, cập nhật lại đáp án đã chọn
      updatedAnswers[answerIndex].selectedOption = selectedOption;
    } else {
      // Nếu đáp án chưa được chọn, thêm đáp án vào danh sách
      updatedAnswers.push({
        quizId: quiz._id,
        selectedOption: selectedOption ,
      });
    }

    // Cập nhật mảng selectedAnswers
    setSelectedAnswers(updatedAnswers);
  };

  // Hàm xử lý khi người dùng nhấn nút "Nộp"
  const handleSubmit = () => {
    setSubmitted(true);

    // Xác định xem đáp án đã chọn có phải là đáp án đúng không
    shuffledQuizzData.forEach((quiz) => {
      const correctIndex = quiz.options.indexOf(quiz.correctAnswer);
      const selectedAnswer = selectedAnswers.find(
        (answer) => answer.quizId === quiz._id
      );

      if (selectedAnswer) {
        const selectedOptionIndex = quiz.options.indexOf(
          selectedAnswer.selectedOption
        );

        if (selectedOptionIndex === correctIndex) {
          // Nếu đáp án đã chọn là đúng
          quiz.isCorrect = true;
        } else {
          // Nếu đáp án đã chọn là sai
          quiz.isCorrect = false;
        }
      }
    });

    // Đặt thời gian đếm ngược 10 giây trước khi hiển thị nút "Làm lại"
    setTimeout(() => {
      setShowRetryButton(true);
    }, 10000);

    // Đặt thời gian đếm ngược từ 10 giây về 0
    let countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Khi đếm ngược đạt 0, hủy interval và ẩn nút "Làm lại"
    setTimeout(() => {
      clearInterval(countdownInterval);
    }, 10000);
  };

  // Hàm xử lý khi người dùng nhấn nút "Làm lại"
  const handleRetry = () => {
    setSubmitted(false);
    setSelectedAnswers([]);
    setShowRetryButton(false);
  };

  useEffect(() => {
    if (lessonData?.data.quizzs) {
      // Lấy dữ liệu câu hỏi từ API hoặc nguồn dữ liệu khác
      const quizDataFromAPI = lessonData.data.quizzs;

      // Xáo trộn các đáp án của từng câu hỏi
      const shuffledData = quizDataFromAPI.map((quiz) => ({
        ...quiz,
        options: shuffleArray([
          quiz.correctAnswer,
          quiz.Wronganswer1,
          quiz.Wronganswer2,
          quiz.Wronganswer3,
        ]),
      }));

      // Lưu trữ dữ liệu đã xáo trộn
      setShuffledQuizzData(shuffledData);
    }
  }, [lessonData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!lessonData) {
    return <div>No data found for this product.</div>;
  }

  return (
    <>
      <div className="h-[40%]">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/VIDEO_ID"
        ></iframe>
      </div>

      <div className="justify-center w-full mt-10">
        <h1 className="text-3xl font-semibold">Kiểm tra</h1>
        {/* ======================================= */}
        {shuffledQuizzData.map((quiz, index) => (
          <div key={index} id={`quiz-${quiz._id}`}>
            <h3 className="font-bold text-xl mt-4">Câu hỏi: <samp className="font-medium text-lg">{quiz.name}</samp></h3>
            <ul className="bg-white px-2 py-8 rounded-lg shadow-lg w-full mt-2 flex gap-4">
              {quiz.options.map((option, optionIndex) => {
                const isSelected = selectedAnswers.some(
                  (answer) =>
                    answer.quizId === quiz._id &&
                    answer.selectedOption === option
                );

                let answerClassName =
                  "cursor-pointerc bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 mt-2 ";

                if (submitted) {
                  if (isSelected && quiz.isCorrect) {
                    answerClassName += " bg-green-500";
                  } else if (isSelected && !quiz.isCorrect) {
                    answerClassName += " bg-red-500";
                  }
                } else if (isSelected) {
                  answerClassName += "bg-blue-700";
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
        {/* Nút nộp */}
        {!submitted && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
          onClick={handleSubmit}
        >
          Nộp bài
        </button>
      )}
      {submitted && countdown > 0 && (
        <p className="mt-4 text-lg">Bạn sẽ có thể làm lại sau {countdown} giây</p>
      )}
      {showRetryButton && (
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md mt-4"
          onClick={handleRetry}
        >
          Làm lại
        </button>
      )}
        {/*======================================================== */}
      </div>
      <div className="border-2 mt-20 p-8">
        <div className="mt-4 w-full">
          <div className="bg-white p-4  w-full">
            <h1 className="text-2xl font-semibold">Bình luận</h1>
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
            <div className="flex items-start space-x-2 mt-4">
              <img
                src="user-avatar.jpg"
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Tên người dùng 2</p>
                <p className="text-gray-600">28 Tháng 9, 2023</p>
                <p>Nội dung bình luận 2...</p>
              </div>
            </div>
            {/* <!-- Thêm các bình luận khác ở đây nếu cần --> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Videodetail;
