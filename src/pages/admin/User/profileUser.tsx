import React, { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "@/Api/productApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineCheck, AiFillRobot } from "react-icons/ai";
import { useGetOneBlogQuery } from "@/Api/Blog";
import { FiEdit } from "react-icons/fi"; // Import biểu tượng "Edit" từ Feather Icons
import { Button } from "antd";
import { useGetAllUserQuery } from "@/Api/userApi";
import { IUsers } from "@/interface/user";
import "./index.css"
import { FaCheck } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { FaMoneyBillAlt } from 'react-icons/fa';
const ProfileUser = () => {
  type UserType = {
    id: number;
    name: string;
    img: string | number;
    email: string;
    // ... other properties if any
  } | null;
  const { idBlog } = useParams<{ idBlog: string }>();
  const {
    data: BlogData,
    isLoading,
    isError,
  } = useGetOneBlogQuery(idBlog || "");
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ Local Storage khi trang tải
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);
  const { data: productUser,  error } = useGetAllUserQuery<any>();
  const dataSource = productUser?.map(
    ({ _id, name, email,img, phoneNumber }: IUsers) => ({
      key: _id,
      _id,
      name,
      img,
      email,
      phoneNumber,
    })
  );
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
            <div className="flex gap-2 justify-center  items-center mb-4">
              <h1 className="text-4xl font-bold ">
                Học Viên: {userInfo?.userData.name}
              </h1>
              <div className=" w-36">
                <img
                  src="https://simbacourse.com/images/online-training_Institute.gif"
                  alt="Hình ảnh"
                  className="text-6xl text-red-500"
                />
              </div>
            </div>
            <div className="flex gap-24 items-center mt-12">
              <div className="flex  flex-col items-center  w-2/5">
                <div className="flex justify-between items-center">
                  <div className="flex  flex-col items-center">
                    <img
                      className="w-60  rounded-full bg-red-500 p-1 mr-4 "
                      src={userInfo?.userData.img}
                      alt=""
                    />
                    <div className="mt-2 font-bold">
                      {userInfo?.userData.email}
                    </div>
                  </div>

         
                      <Button
                        type="default" // Đặt loại nút (primary, default, danger, v.v.)
                      >
                        <Link to={`/profile/edit`}>
                          <FiEdit style={{ fontSize: "20px" }} />
                        </Link>
                      </Button>
              
                </div>
              </div>
              <div className="w-3/5 pr-4 flex flex-col gap-7">
                <div className="custom-card gap-9 h-14 rounded-full w-full bg-green-100 flex items-center justify-center font-bold ">
                 
                 <div className="">Khóa Học Đang Học</div> 
                  <FaSpinner />
                </div>
                <div className="custom-card gap-4  h-14 rounded-full w-full bg-green-100 flex items-center justify-center font-bold ">
                <div>
                Khóa Học Đã Học Xong
                </div>
                <FaCheck />
                </div>
                <div className="custom-card gap-3 h-14 rounded-full w-full bg-green-100 flex items-center justify-center font-bold ">
                <div>
                Khóa Học Đã Thanh Toán
                </div>
                  <FaMoneyBillAlt />
                </div>
              </div>
            </div>

            <div className="pt-8 flex justify-center   ">
              <div>
                <img
                  src={userInfo?.name}
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
                        <span className="text-lg">
                          Các kiến thức cơ bản, nền móng của ngành IT.
                        </span>
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
                          Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng
                          dụng.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <img
                className="w-[250px] pt-14"
                src="https://media.istockphoto.com/id/838511998/vi/anh/ch%C3%A2n-dung-n%E1%BB%AF-sinh-vi%C3%AAn-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-vui-v%E1%BA%BB-c%E1%BA%A7m-s%C3%A1ch.jpg?s=612x612&w=0&k=20&c=hQWiRxBJi7OjZRCMwSKYTq0BJ06uDo0anQzkw2zgu9g="
                alt=""
              />
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

export default ProfileUser;
