import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import { useGetOneBlogQuery } from "@/Api/Blog";
import { FiEdit } from "react-icons/fi"; // Import biểu tượng "Edit" từ Feather Icons
import { Button } from "antd";
import { useGetAllUserQuery, useGetOneUserQuery } from "@/Api/userApi";
import { IUsers } from "@/interface/user";
import "./index.css";
import { FaCheck } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaUserTie } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { FaRunning } from 'react-icons/fa';
import { FaUserEdit } from 'react-icons/fa';
import { RaceBy } from "@uiball/loaders";
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
    isLoading: blogIsLoading,
    isError,
  } = useGetOneBlogQuery(idBlog || "");
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const { idUser } = useParams<{ idUser: string }>();
  const { data: DataUser } = useGetOneUserQuery(idUser || "");
  console.log("get on 1", DataUser);
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    // Lấy thông tin người dùng từ Local Storage khi trang tải
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
        <div
          className="mt-2 text-black font-medium"
          style={{ color: "#70dbdb" }}
        >
          Loading
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading product data.</div>;
  }

  if (!BlogData) {
    return <div>No product data available.</div>;
  }

  return (
    <div className=" lg:flex lg:justify-center ">
    <div className=" pt-[88px] px-4 lg:px-0 lg:w-[1000px]    ">
        <div className="profile  ">
          <div className="w-full bg-[#D2E6E4] rounded rounded-tl-lg rounded-tr-lg ">
            <div>
              <h1 className="text-5xl font-bold text-[#0B7077]  pt-14  lg:pl-40 p-2 ">
                Welcome To Profile Of {DataUser?.name}{" "}
              </h1>
              <div className="avatar avatar-left ">
                <img
                  src={DataUser?.img}
                  alt="Avatar"
                  className="avatar-image"
                />
              </div>
            </div>
            <img
              className=" w-64 -mt-10  h-auto"
              src="../../../public/img/sinhvien.png"
              alt=""
            />
          </div>
        </div>
        <div className=" ">
          <div className="lg:flex lg:justify-center  lg:gap-14  pt-10   ">
            <div className=" bg-white p-8  mb-20 rounded ">
              {/* <div className="flex gap-2 justify-center  items-center mb-4 -mt-20 ml-[-500px]">
                <h1 className="text-3xl font-bold ">{DataUser?.name}</h1>
              </div> */}
               <div className="lg:w-[826px]  mt-3 ">
                <div className="">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5  mt-[70px]">
                    <div className="pl-5 lg:custom-card gap-2 h-20 w-full
                     bg-white rounded-lg border shadow-md overflow-hidden
                      hover:shadow-lg hover:shadow-blue-300 hover:scale-105 
                      transition ease-out duration-500 flex flex-col items-start justify-start">
                      <div className="font-semibold text-lg ">Giới Thiệu</div>
                      <div className="flex gap-1 text-sm items-center"> 
                      <div className="text-xl mr-1">
                      <FaUserTie  />
                      </div>
                      
                        <div>Thành viên của</div>
                      <div className="font-bold"> Strong Code - Học lập trình để đi làm </div>
                      </div>
                     
                    </div>
                    <div className="lg:custom-card pl-5 gap-2 h-20 w-full bg-white rounded-lg border shadow-md overflow-hidden hover:shadow-lg hover:shadow-blue-300 hover:scale-105 transition ease-out duration-500 flex flex-col items-start justify-start">
                    <div className="font-semibold text-lg ">Các khóa học đã tham gia</div>
                      <div className="flex gap-1 text-sm items-center"> 
                      <div className="text-xl mr-2">
                      <FaBookOpen />
                      </div>
                      
                        <div>Chưa có khóa học nào đã đăng ký</div>
                     
                      </div>
                    </div>
                    <div className="lg:custom-card mt-[-13px] pl-5 gap-2 h-20 w-full bg-white rounded-lg border shadow-md overflow-hidden hover:shadow-lg hover:shadow-blue-300 hover:scale-105 transition ease-out duration-500 flex flex-col items-start justify-start">
                    <div className="font-semibold text-lg ">Các hoạt động gần đây</div>
                      <div className="flex gap-1 text-sm items-center"> 
                      <div className="text-2xl mr-1">
                      <FaRunning />
                      </div>
                      
                        <div>Chưa có hoạt động nào gần đây</div>
                     
                      </div>
                    </div>
                    {/* <div className="lg:custom-card gap-3 h-16  w-full bg-white rounded-lg border shadow-md overflow-hidden hover:shadow-lg hover:shadow-blue-300 hover:scale-105 transition ease-out duration-500 flex items-center justify-center font-bold">
                      <div>Khóa Học Đã Thanh Toán</div>
                      <FaMoneyBillAlt />
                    </div> */}
                    <div className="">
                      <Link
                        className="lg:custom-card mt-[-13px] pl-5 gap-4 h-20 w-full bg-white rounded-lg border shadow-md overflow-hidden hover:shadow-lg hover:shadow-blue-300 hover:scale-105 transition ease-out duration-500 flex justify-start items-center"
                        to={`/profile/edit/${DataUser?._id}`}
                      >
                        <div className=" font-semibold text-lg">Edit Profile</div>
                        <div className="text-3xl"> <FaUserEdit /></div>
                       
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;