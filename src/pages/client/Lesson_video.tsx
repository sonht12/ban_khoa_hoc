import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  BsFillCheckCircleFill,
  BsAlarm,
  BsFillExclamationSquareFill,
  BsFillLockFill,
} from "react-icons/bs";
import { useGetProductByIdQuery } from "@/Api/productApi";
import { Lesson } from "@/interface/lessons";
import { useGetLessonByIdQuery } from "@/Api/lesson";
import { RaceBy } from '@uiball/loaders'
import {IoCloseOutline} from 'react-icons/io5'
import confetti from "canvas-confetti";
import { Modal, Button, Rate ,Input} from "antd";
import { useAddRatingMutation } from "@/Api/ratingApi";
import { useGetCourseprogressByIdQuery, useUpdateCourseprogressMutation } from "@/Api/CourseProgress";
import { IRating } from "@/interface/rating";
import { useAddScoreMutation, useGetScoreForprogressQuery } from "@/Api/score";
const Lesson_video = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const { idLesson } = useParams<{ idLesson: string }>();
  const { data: lessonData } = useGetLessonByIdQuery(idLesson || "");
  const { data: productData, isLoading: productIsLoading } = useGetProductByIdQuery(idProduct || "");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { idUser } = useParams<{ idUser: string }>();
  const { data: Courseprogress, refetch: refetchCourseProgress } =
    useGetCourseprogressByIdQuery({
      productId: idProduct,
      userId: idUser,
    });
  console.log(idUser)
  const [updateScore] = useUpdateCourseprogressMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0); // Đánh giá ban đầu là 0
  const [feedback, setFeedback] = useState('');
  const [addScore] = useAddScoreMutation();
  // if (!productData) {
  //   return <div>No data found for this product.</div>;
  // }
  // Tính toán số lượng bài học đã hoàn thành
  const completedLessonCount = Courseprogress?.data.progress || 0;
  // Sử dụng hook để lấy giá trị ScoreForprogress
  const { data: ScoreForprogress } = useGetScoreForprogressQuery(
    Courseprogress?.data?.scores[0]?.progressId
  );
  const id = Courseprogress?.data._id;
  const progress = ScoreForprogress?.length;
  useEffect(() => {
    // Kiểm tra và cập nhật điểm số nếu cần
    if (progress > completedLessonCount) {
      console.log("Da den luc cap nhat");
      updateScore({ id, progress });
      refetchCourseProgress()
    }
  }, [progress, completedLessonCount, updateScore]);
  // cập nhật trạng thái hoàn thành trong bài học
  // Tính toán số lượng bài học chưa được chiếu
  const lessons = productData?.data.lessons || [];
  const unwatchedLessonCount = lessons.length - completedLessonCount;
  // Tính toán phần trăm số lượng bài học đã hoàn thành
  const percentageCompleted = Math.round((completedLessonCount / lessons.length) * 100);
  const lessonIdToFind = idLesson;
  // Hàm để tìm trạng thái hoàn thành theo lessonId
  const findScoreByLessonId = (lessonId, scores) => {
    const scoreObj = scores.find((score) => score.lessonId === lessonId);
    return scoreObj ? scoreObj : null;
  };

  // Lấy trạng thái cho lessonId cụ thể
  const scoreData = Courseprogress?.data
  ? findScoreByLessonId(lessonIdToFind, Courseprogress.data.scores)
  : null;
  const addRatingMutation = useAddRatingMutation();
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  const { TextArea } = Input;
  const handleSendRating = async () => {
    try {
      // Tạo một đối tượng gửi đánh giá
      const ratingData = {
        productId: idProduct,
        rating: rating,
        userId: idUser,
        feedback: feedback,
      };
      console.log("Dữ liệu gửi từ máy khách khi gửi đánh giá:", ratingData);
      const response = await fetch("http://localhost:8088/api/rating/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });
      if (response.ok) {
        // Xử lý khi gửi đánh giá thành công
        console.log("Gửi đánh giá thành công!");
        setModalVisible(false);
      } else {
        // Xử lý khi có lỗi
        console.error("Lỗi khi gửi đánh giá.");
      }
    } catch (error) {
      // Xử lý khi có lỗi
      console.error("Lỗi khi gửi đánh giá: ", error);
    }
  };
  function startConfettiAnimation() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval:any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }
  useEffect(() => {
    if (percentageCompleted === 100 ) {
      setModalVisible(true);
      startConfettiAnimation(); // Bắt đầu hiệu ứng confetti
    } else {
      setModalVisible(false);
    }
  }, [percentageCompleted]);
  // if (isLoading) {
  //   return  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
  //   <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
  //   <div className="mt-2 text-black font-medium" style={{ color: '#70dbdb' }}>Loading</div>
  // </div>
  // }
  if (!productData) {
    return <div>No data found for this product.</div>;
  }
  const handleLessonLinkClick = async (lesson) => {
    const lessonId = lesson._id;
    const lessonName = lesson.name;
    const progressId = Courseprogress?.data?._id;
    const scoreData = {
      score: 0,
      lessonId,
      lessonName,
      progressId,
    };

    try {
      // Gọi hàm addScore và đợi kết quả
      const result = await addScore(scoreData);

      if (result.error) {
        // Xử lý trường hợp thêm dữ liệu không thành công, ví dụ, hiển thị thông báo lỗi.
        console.error("Lỗi khi thêm dữ liệu ");
      } else {
        // Nếu việc thêm dữ liệu thành công, làm mới dữ liệu Courseprogress để cập nhật giao diện
        refetchCourseProgress();
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };


  return (
    <>
      <div className="bg-[#D2E6E4]">
        <div className="pt-[88px]">
        <div className="lg:flex lg:flex-row-reverse bg-white lg:px-10 px-2 pt-10 lg:p-10 gap-8 h-[1500px] mb-[800px] ">
            

            {/* Danh sách video chưa được chiếu */}
            <div className="lg:w-2/5 p-8">
              <h2 className="text-2xl font-semibold mb-4">
                Danh sách video chưa được chiếu
              </h2>
              <ul className="overflow-y-auto max-h-screen">
                <div>
                  <h3 className="text-xl font-semibold">
                    1. IIFE, Scope, Closure
                  </h3>
                  <span className="text-gray-500">
                    {completedLessonCount}/{lessons.length} | 01:46:21
                    <span className="text-green-500">
                      {" "}
                      ({percentageCompleted}% hoàn thành)
                    </span>
                  </span>
                </div>
                {lessons.map((lesson: Lesson, index: any) => {
                  const lessonIdToFind = lesson._id;
                  const lessonScores = Courseprogress?.data?.scores || [];
                  const scoreData = findScoreByLessonId(
                    lessonIdToFind,
                    lessonScores
                  );

                  const isCompleted =
                    scoreData?.lessonId === lesson._id &&
                    scoreData?.score &&
                    scoreData?.statusVideo == "hoàn thành video" &&
                    scoreData?.score > 80;

                  const isInProgress =
                    !isCompleted &&
                    scoreData?.lessonId === lesson._id &&
                    ((scoreData?.score &&
                      scoreData?.statusVideo !== "hoàn thành video" &&
                      scoreData?.score > 80) ||
                      !scoreData?.score ||
                      scoreData?.score <= 80 ||
                      scoreData?.statusVideo === "hoàn thành video");
                  return (
                    <div
                      key={index}
                      className={`learn-item-1 bg-white p-4 rounded-md shadow-md border-2 mt-4 ${
                        isCompleted ? "completed" : ""
                      } ${isInProgress ? "in-progress" : ""}`}
                    >
                      <Link
                        to={`lesson/${lesson._id}/${idUser}`}
                        className="w-60"
                        onClick={() => handleLessonLinkClick(lesson)}
                      >
                        {/* Nội dung của bạn */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {index + 1}.{lesson.name}
                          </h3>
                          <p className="flex items-center space-x-1 text-gray-600">
                            <BsAlarm />
                            <span>01:48</span>
                          </p>
                        </div>
                        <div className="flex justify-between items-center ">
                        <div className="mt-2 flex items-center">
                          {isCompleted ? (
                            <>
                              <BsFillCheckCircleFill className="text-green-500 mr-2" />
                              <span className="text-green-500">Hoàn thành</span>
                            </>
                          ) : isInProgress ? (
                            <>
                              <BsFillExclamationSquareFill className="text-orange-500 mr-2" />
                              <span className="text-orange-500">Đang học</span>
                            </>
                          ) : (
                            <>
                              <BsFillExclamationSquareFill className="text-orange-500 mr-2" />
                              <span className="text-orange-500">
                                Chưa hoàn thành
                              </span>
                            </>
                          )}
                        </div>
                        
                        </div>
                        
                      </Link>
                    </div>
                  );
                })}
              </ul>
            </div>
            {/* Phần video bài học */}
            <div className="lg:w-3/5 p-8 h-full mb-20px">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal
        title=""
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
        maskClosable={false}
        // closable={false}
      >
        <div className="">
          <div className="w-14 flex justify-center">
          </div>
          <h4 className="text-2xl flex items-center justify-center mb-3 font-medium mt-3">
            Chúc mừng bạn đã hoàn thành khóa học

          </h4>
          <h4 className="text-xl flex items-center justify-center">
            Hãy đánh giá cho khóa học này
          </h4>
          <Rate
            className="text-3xl flex items-center justify-center"
            onChange={(value) => setRating(value)}
            value={rating}
          />
          <div className="">
            <h4 className="my-2 text-sm">Góp ý và nhận xét</h4>
            <TextArea rows={6} value={feedback} onChange={handleFeedbackChange}/>
          </div>
          <div className="flex justify-between mt-3">
          <span className="text-xs flex">Bấm vào icon <IoCloseOutline className='text-base bg-gradient-to-r from-purple-500 to-pink-500 mr-1 ml-1 '/> nếu đã đánh giá</span>
          <button
            onClick={handleSendRating}
            className="px-5 py-2 text-white rounded-md transition duration-300
          bg-gradient-to-r from-[#96deda] to-[#50c9c3] hover:bg-gradient-to-r
          hover:from-[#B7F8DB] hover:to-[#50A7C2] hover:rounded-full font-medium"
            style={{
              backgroundColor: "transparent" /* Đặt màu nền trong suốt */,
              color: "#f6f7f9" /* Mã màu phông */,
              borderRadius: "18px" /* Góc bo tròn ban đầu */,
              fontSize:"16px"
            }}
          >
            Send
          </button>
          </div>

        </div>
      </Modal>
    </>
  );
};

export default Lesson_video;