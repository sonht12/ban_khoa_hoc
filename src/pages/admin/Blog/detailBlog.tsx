import React from "react";
import { useGetProductByIdQuery } from "@/Api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiFillCode,
  AiFillDatabase,
  AiFillClockCircle,
  AiOutlineAntCloud,
  AiOutlineCheck,
  AiOutlinePlus,
  AiFillRobot
} from "react-icons/ai";
import { useGetOneBlogQuery } from "@/Api/Blog";

const BlogDetail = () => {
  const { idBlog } = useParams<{ idBlog: string }>();
  const {
    data: BlogData,
    isLoading,
    isError,
  } = useGetOneBlogQuery(idBlog || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading product data.</div>;
  }

  if (!BlogData) {
    return <div>No product data available.</div>;
  }

  const { name, description, img } = BlogData;

  return (
    <div className=" pt-[88px] bg-[#D2E6E4] ">
      <div className=" ">
        <div className="flex justify-center  gap-14  pt-10    bg-gray-200 ">
          <div className=" bg-white p-8 w-[850px] mb-20 rounded">
            <div className="flex gap-6   items-center mb-4">
            <h1 className="text-4xl font-bold ">{BlogData?.name}</h1>
            <div className="  text-6xl text-red-500">
            <AiFillRobot />
            </div>
            </div>        
            <p className=" text-base">{BlogData?.description}</p>
            <div className="pt-8 flex justify-center   ">
              <div >
                <img
                  src={BlogData.img}
                  alt={name}
                  className="w-[670px] rounded-lg "
                />
              </div>
            </div>
            <div className="flex justify-between mt-4 items-center">
      

              <div className="">
              <h1 className="text-4xl font-bold text-red-400 mb-16 mt-14 pl-4">
                Bạn sẽ học được gì?
              </h1>
              <div className="">
                <div>
                  <ul className="mb-4 mt-1">
                    <li className="flex items-center space-x-2">
                      <AiOutlineCheck className="text-[#FD661F]" />
                      <span className="text-lg">Các kiến thức cơ bản, nền móng của ngành IT.</span>
                    </li>
                    <li className="flex items-center space-x-2 mt-6">
                      <AiOutlineCheck className="text-[#FD661F]" />
                      <span className="text-lg">
                        Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng.
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className=" mb-4 mt-6">
                    <li className="flex items-center space-x-2">
                      <AiOutlineCheck className="text-[#FD661F]" />
                      <span className="text-lg">
                        Hiểu hơn về cách internet và máy vi tính hoạt động.
                      </span>
                    </li>
                    <li className="flex items-center space-x-2 mt-6">
                      <AiOutlineCheck className="text-[#FD661F]" />
                      <span className="text-lg">
                        Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              </div>
             
          
              <img className="w-[250px] pt-14" src="https://media.istockphoto.com/id/838511998/vi/anh/ch%C3%A2n-dung-n%E1%BB%AF-sinh-vi%C3%AAn-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-vui-v%E1%BA%BB-c%E1%BA%A7m-s%C3%A1ch.jpg?s=612x612&w=0&k=20&c=hQWiRxBJi7OjZRCMwSKYTq0BJ06uDo0anQzkw2zgu9g=" alt="" />
            </div>
            {/* Thông tin khóa học */}

            {/* 
            <h1 className="text-2xl font-bold mb-4 mt-8">Nội dung khóa học</h1>

            <div className="flex justify-between">
              <ul className="flex space-x-2">
                <li className="font-bold">4 chương</li>
                <li className="CurriculumOfCourse_dot__lIoF-">•</li>
                <li className="font-bold">11 bài học</li>
                <li className="CurriculumOfCourse_dot__lIoF-">•</li>
                <li>
                  <span>
                    Thời lượng <strong>03 giờ 25 phút</strong>
                  </span>
                </li>
              </ul>
              <div className="text-[#FD661F] font-medium">Mở rộng tất cả</div>
            </div> */}
            {/* ================================================ */}

            {/* <div className="p-2">
              <div className="flex justify-between items-center bg-gray-100 p-4 border border-gray-200 rounded">
                <span className=" flex items-center gap-3">
                  <AiOutlinePlus className="text-[#FD661F]"  />
                  <p className="font-medium">1. Khái niệm kỹ thuật cần biết</p>
                </span>
                <span className="text-sm">2 bài học</span>
              </div>
            </div>

            <div className="p-2">
              <div className="flex justify-between items-center bg-gray-100 p-4 border border-gray-200 rounded">
                <span className=" flex items-center gap-3">
                  <AiOutlinePlus className="text-[#FD661F]"  />
                  <p className="font-medium">1. Khái niệm kỹ thuật cần biết</p>
                </span>
                <span className="text-sm">2 bài học</span>
              </div>
            </div>

            <div className="p-2">
              <div className="flex justify-between items-center bg-gray-100 p-4 border border-gray-200 rounded">
                <span className=" flex items-center gap-3">
                  <AiOutlinePlus className="text-[#FD661F]"  />
                  <p className="font-medium">1. Khái niệm kỹ thuật cần biết</p>
                </span>
                <span className="text-sm">2 bài học</span>
              </div>
            </div> */}
            {/* ============================================= */}
          </div>
            
          
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
