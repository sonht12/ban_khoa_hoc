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
import { Empty } from 'antd';
import { RaceBy } from '@uiball/loaders'
const ProfileUser = () => {
  type UserType = {
    id: number;
    name: string;
    img: string | number;
    email: string;
    // ... other properties if any
  } | null;
  const { idBlog } = useParams<{ idBlog: string }>();
  // const {
  //   data: BlogData,
  //   isLoading,
  //   isError,
  // } = useGetOneBlogQuery(idBlog || "");
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [infoCur, setInfoCur] = useState<boolean>(false);

  const { idUser  } = useParams<{ idUser: string }>();
  const { data: DataUser ,  isLoading:productIsLoading, isError, } = useGetOneUserQuery(idUser || "");
  const [isLoading, setIsLoading] = useState(true);
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
    return  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
    <div className="mt-2 text-black font-medium" style={{ color: '#70dbdb' }}>Loading</div>
  </div>
  }

  if (isError) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <>

    <div className=" flex justify-center">
      <div className=" pt-[88px] w-4/5    ">
        <div className="profile  ">
          <div className="w-full bg-[#D2E6E4] rounded rounded-tl-lg rounded-tr-lg ">
            <div>
              <h1 className="text-5xl font-bold text-[#0B7077]  pt-14  pl-40 ">
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
          <div className="flex justify-center  gap-14  pt-10   ">
            <div className=" bg-white p-8 w-[850px] mb-20 rounded mt-6">
              <div className="flex gap-2 justify-center  items-center mb-4 -mt-24 -ml-60">
                <h1 className="text-3xl font-bold ">
                  Học Viên: {DataUser?.name}
                </h1>
                <div className=" w-24">
                  <img
                    src="https://simbacourse.com/images/online-training_Institute.gif"
                    alt="Hình ảnh"
                    className=" text-red-500"
                  />
                </div>
              </div>
              <div >
                <div className="ml-28">
                  <div className=" grid grid-cols-2 gap-5  -ml-64 mt-8">
                    <div className="custom-card gap-9 h-16 rounded-full w-full bg-green-100 flex items-center justify-center font-bold">
                      <div>Khóa Học Đang Học</div>
                      <FaSpinner />
                    </div>
                    <div className="custom-card gap-4 h-16 rounded-full w-full bg-green-100 flex items-center justify-center font-bold">
                      <div>Khóa Học Đã Học Xong</div>
                      <FaCheck />
                      </div>
                        {infoCur && <div>
                        {DataUser?.product?.map((item: any) => (
                          <div key={item?.id}>
                            <Link to={`/video/${item._id}`}>{ item.name}Xem Ngay</Link>
                          </div>
                        ))}

      </div>}
                    <div className="custom-card gap-3 h-16 rounded-full w-full bg-green-100 flex items-center justify-center font-bold">
                      <div onClick={()=> setInfoCur(!infoCur)}>Khóa Học Đã Thanh Toán</div>
                      <FaMoneyBillAlt />
                    </div>
                    <div className="">
                      <Link
                        className="custom-card gap-4 h-16 rounded-full w-full bg-green-100 flex items-center justify-center font-bold edit-profile-button"
                        to={`/profile/edit/${DataUser?._id}`}
                      >
                        <div>Edit Profile</div>
                        <FiEdit />
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
    </>

  );
};

export default ProfileUser;
