import React from "react";
import {
  BsFillCheckCircleFill,
  BsAlarm,
  BsFillExclamationSquareFill,
  BsFillLockFill,
} from "react-icons/bs";
const Lesson_video = () => {
  return (
    <>
      <div className=" bg-[#D2E6E4] ">
        <div className=" pt-[88px]">
          <div className=" flex bg-white px-10  p-10 gap-8">
            {/* <!-- Phần video bài học --> */}
            <div className="w-3/5  p-8">
              <div>
                <iframe
                  className="w-full h-[430px]"
                  src="https://www.youtube.com/embed/VIDEO_ID"
                ></iframe>
              </div>

              <div className="justify-center w-full mt-10">
                <h1 className="text-3xl font-semibold ">Kiểm tra </h1>
                {/* ======================================= */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
                  <h1 className="text-2xl font-semibold">Câu hỏi 1</h1>
                  <p className="text-lg mt-2">
                    JavaScript là ngôn ngữ lập trình dựa trên?
                  </p>
                  <div className="mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 mt-2">
                      a. HTML
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 mt-2">
                      b. Python
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 mt-2">
                      c. C++
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-2">
                      d. Java
                    </button>
                  </div>
                </div>
                {/*======================================================== */}

                     {/* ======================================= */}
                     <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
                  <h1 className="text-2xl font-semibold">Câu hỏi 1</h1>
                  <p className="text-lg mt-2">
                    JavaScript là ngôn ngữ lập trình dựa trên?
                  </p>
                  <div className="mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 mt-2">
                      a. HTML
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 mt-2">
                      b. Python
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2 mt-2">
                      c. C++
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-2">
                      d. Java
                    </button>
                  </div>
                </div>
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
                    <input className="mt-2 w-full h-10 rounded-lg border-2 border-gray-300 ">
                      
                    </input>
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
                    <img src="user-avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full"/>
                    <div>
                        <p className="font-semibold">Tên người dùng 1</p>
                        <p className="text-gray-600">27 Tháng 9, 2023</p>
                        <p>Nội dung bình luận 1...</p>
                    </div>
                </div>
                <div className="flex items-start space-x-2 mt-4">
                    <img src="user-avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full"/>
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
                <div className="learn-item-1 bg-white p-4 rounded-md shadow-md border-2 mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">3 .Chưa mở</h3>
                    <p className="flex items-center space-x-1 text-gray-600">
                      <BsAlarm />
                      <span>01:48</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <BsFillExclamationSquareFill className="text-orange-500 mr-2" />
                    <span className="text-orange-500"> Chưa hoàn thành</span>
                  </div>
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
