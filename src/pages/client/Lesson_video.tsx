import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  BsFillCheckCircleFill,
  BsAlarm,
  BsFillExclamationSquareFill,
} from "react-icons/bs";
import { useGetProductByIdQuery } from "@/Api/productApi";
import { Lesson } from "@/interface/lessons";
import {
  useGetCourseprogressByIdQuery,
  useUpdateCourseprogressMutation,
} from "@/Api/CourseProgress";
import { useAddScoreMutation, useGetScoreForprogressQuery } from "@/Api/score";

const Lesson_video = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const { idLesson } = useParams<{ idLesson: string }>();
  const { idUser } = useParams<{ idUser: string }>();
  const [addScore] = useAddScoreMutation();
  const [updateScore] = useUpdateCourseprogressMutation();
  const { data: productData, isLoading } = useGetProductByIdQuery(
    idProduct || ""
  );
  const { data: Courseprogress, refetch: refetchCourseProgress } =
    useGetCourseprogressByIdQuery({
      productId: idProduct,
      userId: idUser,
    });

  // Tính toán số lượng bài học đã hoàn thành
  const completedLessonCount = Courseprogress?.data.progress || 0;

  // Sử dụng hook để lấy giá trị ScoreForprogress
  const { data: ScoreForprogress } = useGetScoreForprogressQuery(
    Courseprogress?.data?.scores[0]?.progressId
  );
  const id = Courseprogress?.data._id;
  const progress = ScoreForprogress?.length;
  // console.log("id", id,"so luong bai hoc dat yeu cau", progress,'so luong tien do',completedLessonCount);

  useEffect(() => {
    // Kiểm tra và cập nhật điểm số nếu cần
    if (progress > completedLessonCount) {
      console.log("Da den luc cap nhat");
      updateScore({ id, progress });
      refetchCourseProgress()
    }
  }, [progress, completedLessonCount, updateScore]);
  // cập nhật trạng thái hoàn thành trong bài học
  console.log(Courseprogress);
  console.log("sdasdhaskljdhl", Courseprogress?.data?.scores);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }
  if (!productData) {
    return <div>Không tìm thấy dữ liệu cho sản phẩm này.</div>;
  }

  // Tính toán số lượng bài học chưa được chiếu
  const lessons = productData.data.lessons || [];

  // Tính toán phần trăm số lượng bài học đã hoàn thành
  const percentageCompleted = Math.round(
    (completedLessonCount / lessons.length) * 100
  );

  const lessonIdToFind = idLesson;

  // Hàm để tìm điểm số theo lessonId
  const findScoreByLessonId = (lessonId, scores) => {
    const scoreObj = scores.find((score) => score.lessonId === lessonId);
    return scoreObj ? scoreObj : null;
  };

  const scoreData = Courseprogress?.data
    ? findScoreByLessonId(lessonIdToFind, Courseprogress.data.scores)
    : null;

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
          <div className="flex bg-white px-10 p-10 gap-8 h-[1500px] mb-[800px]">
            {/* Phần video bài học */}
            <div className="w-3/5 p-8 h-full mb-20px">
              <Outlet />
            </div>
            {/* Danh sách video chưa được chiếu */}
            <div className="w-2/5 p-8">
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
                      </Link>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson_video;
