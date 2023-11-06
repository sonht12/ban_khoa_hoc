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
import { useGetCourseprogressByIdQuery } from "@/Api/CourseProgress";
import { useGetLessonByIdQuery } from "@/Api/lesson";

const Lesson_video = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const { idLesson } = useParams<{ idLesson: string }>();
  const { data: lessonData } = useGetLessonByIdQuery(idLesson || "");
  const { data: productData, isLoading } = useGetProductByIdQuery(idProduct || "");
  const { idUser } = useParams<{ idUser: string }>();
  const { data: Courseprogress } = useGetCourseprogressByIdQuery({
    productId: idProduct,
    userId: idUser,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!productData) {
    return <div>No data found for this product.</div>;
  }
  
  // Tính toán số lượng bài học đã hoàn thành
  const completedLessonCount = Courseprogress?.progress || 0;

  // Tính toán số lượng bài học chưa được chiếu
  const lessons = productData.data.lessons || [];
  const unwatchedLessonCount = lessons.length - completedLessonCount;

  // Tính toán phần trăm số lượng bài học đã hoàn thành
  const percentageCompleted = Math.round((completedLessonCount / lessons.length) * 100);

    
  const lessonIdToFind = idLesson; 

  // Hàm để tìm trạng thái hoàn thành theo lessonId
  const findStatusByLessonId = (lessonId, scores) => {
    const scoreObj = scores.find(score => score.lessonId === lessonId);
    return scoreObj ? scoreObj.status : null;
  }
  
  // Lấy trạng thái cho lessonId cụ thể
  const status = Courseprogress ? findStatusByLessonId(lessonIdToFind, Courseprogress.data.scores) : null;
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
                <div className="learn-item-1 bg-white p-4 rounded-md shadow-md border-2 mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">1. Đã học xong</h3>
                    <p className="flex items-center space-x-1 text-gray-600">
                      <BsAlarm />
                      <span>01:48</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <BsFillCheckCircleFill className="text-green-500 mr-2" />
                    <span className="text-green-500">2. Đang học</span>
                  </div>
                </div>
                {lessons.map((lesson: Lesson, index: any) => (
                  <div
                    key={index}
                    className="learn-item-1 bg-white p-4 rounded-md shadow-md border-2 mt-4"
                  >
                    <Link to={`lesson/${lesson._id}/${idUser}`} className="w-60">
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
  {status === 'hoàn thành' ? (
    <>
      <BsFillCheckCircleFill className="text-green-500 mr-2" />
      <span className="text-green-500">Hoàn thành</span>
    </>
  ) : (
    <>
      <BsFillExclamationSquareFill className="text-orange-500 mr-2" />
      <span className="text-orange-500">Chưa hoàn thành</span>
    </>
  )}
</div>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson_video;