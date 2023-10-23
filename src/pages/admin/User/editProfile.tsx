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
    form.setFieldsValue({
      name: productData?.name,
      email: productData?.email,
      img: productData?.img,
      phoneNumber: productData?.phoneNumber,
    });
  }, [productData]);
  const onFinish = (values: IUsers) => {
    updateUser({ ...values, _id: idUser })
      .unwrap()
      .then(() => {
        localStorage.setItem('userData', JSON.stringify(values));
        // Load lại trang "Profile"
        navigate("/profile", { replace: true });
      });
  };

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  }, []);


  return (
    <div>
    <header className="mb-4">
      <h2 className="font-bold text-2xl">
        Sửa Lại Người Dùng : {productData?.name}
      </h2>
    </header>
    {isLoading ? (
      <Skeleton />
    ) : (
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên khóa học!" },
            { min: 3, message: "khóa học ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập giá khóa học!" },
           
           
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item<FieldType>
          label="Image"
          name="img"
          rules={[
            { required: true, message: "Vui lòng nhập !" },
           
           
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Vui lòng nhập phone Number!" },
       
          ]}
        >
          <Input />
        </Form.Item>
        {/* 
                  <Form.Item label="category" name="categoryId"
                  rules={[
                      { required: true, message: "Vui lòng nhập category!" },                   
                  ]}
                  >
                      <Select>
                          {categoryData?.data.map(({ _id, name }: Category) => (
                              console.log(name),
                              <Select.Option key={_id} value={_id}>
                                  {name}
                              </Select.Option>
                          ))}
                      </Select>

                  </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Thêm"
            )}
          </Button>
          <Button
            className="ml-2 bg-yellow-500 text-white "
            onClick={() => navigate("/profile")}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    )}
  </div>
  );
};

export default EditProfile;