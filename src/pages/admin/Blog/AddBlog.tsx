import { useGetCategorysQuery } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { IProduct } from "@/interface/products";
import { Form, Button, Input } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAddBlogMutation } from "@/Api/Blog";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
type FieldType = {
  nameUser: string;
  imgUser: string;
  name: string;
  img: string | null;
  description: string;
  language: string | null;
};
type UserType = {
  id: number;
  name: string;
  img: string | number;
  email: string;
  // ... other properties if any
} | null;
const AddBlog = () => {
  const [userInfo, setUserInfo] = useState<UserType>(null);
  const [form] = useForm();

  console.log("1:", userInfo);
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);
  console.log("userInfor:", userInfo);
  const nameUser = userInfo?.userData.name;
  const imgUser = userInfo?.userData.img;
  form.setFieldsValue({ nameUser });
  form.setFieldsValue({ imgUser });
  console.log("userd:", nameUser);
  console.log("img:", imgUser);
  const [addProduct, { isLoading }] = useAddBlogMutation();
  const navigate = useNavigate();
  const onFinish = (values: IProduct) => {
    addProduct(values)
      .unwrap()
      .then(() => navigate("/admin/blog"));
      console.log("values:", values)
  };

  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm Blog</h2>
      </header>
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
          label="Tên Bài Viết"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên Blog!" },
            {
              validator: (_, value) => {
                const wordLength = value.trim().split(/\s+/).join('').length;
                if (wordLength < 3) {
                  return Promise.reject("Tên phải chứa ít nhất 4 ký tự!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Ảnh"
          name="img"
          rules={[{ required: true, message: "Vui lòng nhập img khóa học!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô Tả"
          name="description"
          rules={[
            { required: true, message: "Vui lòng nhập mô tả!" },
            {
              validator: (_, value) => {
                const wordLength = value.trim().split(/\s+/).join('').length;
                if (wordLength < 10) {
                  return Promise.reject("Mô tả phải chứa ít nhất 10 ký tự!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Ngôn Ngữ Lập Trình"
          name="language"
          rules={[
            { required: true, message: "Vui lòng nhập ngôn ngữ!" },
            {
              validator: (_, value) => {
                const wordLength = value.trim().split(/\s+/).join('').length;
                if (wordLength < 3) {
                  return Promise.reject("Ngôn ngữ lập trình phải chứa ít nhất 4 ký tự!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Thêm"
            )}
          </Button>
          <Button
            className="ml-2  bg-yellow-500 text-white"
            onClick={() => navigate("/admin/blog")}
          >
            Quay lại
          </Button>
        </Form.Item>
        <Form.Item<FieldType>
          name="nameUser"
          rules={[{ required: true, message: "Vui lòng nhập tên id!" }]}
        >
           <Input style={{ display: 'none' }} />
        </Form.Item>
        <Form.Item<FieldType>
          name="imgUser"
          rules={[{ required: true, message: "Vui lòng nhập tên id!" }]}
        >
           <Input style={{ display: 'none' }} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBlog;