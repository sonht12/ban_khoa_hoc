import React, { useEffect, useState } from "react";
import { useGetLessonByIdQuery } from "@/Api/lesson";
import { useNavigate, useParams } from "react-router-dom";

function Videodetail() {
  const { idLesson } = useParams<{ idLesson: string }>();
  const { data: lessonData, isLoading } = useGetLessonByIdQuery(idLesson || "");
  const [shuffledQuizzData, setShuffledQuizzData] = useState([]);

  // Hàm xáo trộn mảng ngẫu nhiên
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

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
      <div className="h-[55%]">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/VIDEO_ID"
        ></iframe>
      </div>

      <div className="justify-center w-full mt-10">
        <h1 className="text-3xl font-semibold ">Kiểm tra </h1>
        {/* ======================================= */}
        {shuffledQuizzData.map((quizz, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md w-full mt-8"
          >
            <div>
              <h1 className="text-xl font-semibold">Câu hỏi {index + 1}</h1>
              <p className="text-lg mt-2">{quizz.name}</p>
            </div>
            <div className="mt-4">
              {quizz.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 mt-2"
                >
                  {String.fromCharCode(97 + optionIndex)}. {option}
                </button>
              ))}
            </div>
          </div>
        ))}
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
              <input className="mt-2 w-full h-10 rounded-lg border-2 border-gray-300 "></input>
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
