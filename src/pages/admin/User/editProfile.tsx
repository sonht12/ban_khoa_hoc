import { useGetOneUserQuery, useUpdateUserMutation } from "@/Api/userApi";
import { IUsers } from "@/interface/user";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input,  Select } from "antd";
const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  type FieldType = {
    name: string;
    email: number | string;
    img: string | number;
    phoneNumber: number
  };
  // Định nghĩa giá trị ban đầu cho các trường thông tin người dùng

  const { idUser } = useParams<{ idUser: string }>();
  const { data: productData, isLoading } = useGetOneUserQuery(idUser || "");
  const [updateUser] = useUpdateUserMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      const userInfo = JSON.parse(savedUser);
      setName(userInfo?.userData.name || "");
      setEmail(userInfo?.userData.email || "");
      setImg(userInfo?.userData.img || "");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Xử lý sự kiện thay đổi giá trị của các trường input
  const handleNameChange = (e :any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };
  const handleImgChange = (e:any) => {
    setImg(e.target.value);
  };
  // Xử lý sự kiện khi lưu thay đổi
  const handleSaveChanges = () => {
    // Thực hiện lưu các thay đổi, ví dụ: gửi lên máy chủ
    // Sau đó chuyển hướng hoặc thực hiện các xử lý khác
    const userInfo = { userData: { name, email, img } };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    navigate("/profile"); // Chuyển hướng đến trang thông tin cá nhân sau khi lưu
    window.location.reload();
   
  };

  return (
<div className="pt-[88px] bg-[#D2E6E4]">
  <div className="">
    <div className="flex justify-center gap-14 pt-10 bg-gray-200">
      <div className="flex flex-col bg-white p-8 w-[850px] mb-20 rounded">
        <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
        <form>
          <div className="mb-4">
            <label className="block font-semibold">Name:</label>
            <input
              className="w-full p-2 bg-blue-100 rounded"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Email:</label>
            <input
              className="w-full p-2 bg-blue-100 rounded"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Img:</label>
            <input
              className="w-full p-2 bg-blue-100 rounded"
              type="img"
              value={img}
              onChange={handleImgChange}
            />
          </div>
          <div>
            <button
              className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              type="button"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


  );
};

export default EditProfile;