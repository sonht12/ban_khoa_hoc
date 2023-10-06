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
const Lesson_video = () => {

  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData, isLoading } = useGetProductByIdQuery(idProduct || "");
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>No data found for this product.</div>;
  }

  const lessons = productData.data.lessons || [];

  return (
    <>
      <div className=" bg-[#D2E6E4] ">
        <div className=" pt-[88px]">
          <div className=" flex bg-white px-10  p-10 gap-8 h-[1500px] mb-[800px]">
            {/* <!-- Phần video bài học --> */}
            <div className="w-3/5  p-8 h-full mb-20px ">
            <Outlet />
            </div>

            {/* =========================================================================== */}
            {/* <!-- Danh sách video chưa được chiếu --> */}
            <div className="w-2/5 p-8">
              <h2 className="text-2xl font-semibold mb-4">
                Danh sách video chưa được chiếu
              </h2>
              <ul className="overflow-y-auto max-h-screen">
                <div>
                  <h3 className="text-xl font-semibold">
                    1. IIFE, Scope, Closure
                  </h3>
                  <span className="text-gray-500">1/9 | 01:46:21</span>
                </div>
                {/* ======================= */}
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
                    <span className="text-green-500">2.Đang học</span>
                  </div>
                </div>
                {/* ============================= */}
                <div>
                {lessons.map((lesson:Lesson, index: any) => (
                  
                <div key={index} className="learn-item-1 bg-white p-4 rounded-md shadow-md border-2 mt-4">
                    <Link to={`lesson/${lesson._id}`} className= "w-60">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{index+1}.{lesson.name}</h3>
                    <p className="flex items-center space-x-1 text-gray-600">
                      <BsAlarm />
                      <span>01:48</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <BsFillExclamationSquareFill className="text-orange-500 mr-2" />
                    <span className="text-orange-500"> Chưa hoàn thành</span>
                  </div>
                  </Link>
                </div>
                 ))}   
                  </div>  
                {/* ============================= */}
                <div className="learn-item-1 p-4 rounded-md shadow-md border-2 mt-4 bg-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">1. Giới thiệu</h3>
                    <p className="flex items-center space-x-1 text-gray-600">
                      <BsAlarm />
                      <span>01:48</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <BsFillLockFill className="text-gray-500 mr-2" />
                    <span className="text-gray-500"> Chưa mở khóa</span>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson_video;
