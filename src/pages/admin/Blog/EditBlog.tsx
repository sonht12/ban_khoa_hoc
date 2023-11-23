import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/Api/productApi";
import { useGetCategorysQuery } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { IProduct } from "@/interface/products";
import { Button, Form, Input, Skeleton, Select } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneUserQuery, useUpdateUserMutation } from "@/Api/userApi";
import { IUsers } from "@/interface/user";
import { useGetOneBlogQuery, useUpdateBlogMutation } from "@/Api/Blog";
type FieldType = {
  name: string;
  img:  string | number;
  description: string | number;
  language: string
};
const EditBlog = () => {
  const { idBlog } = useParams<{ idBlog: string }>();
  const { data: productData, isLoading } = useGetOneBlogQuery(idBlog || "");
  const [updateBlog] = useUpdateBlogMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  console.log(productData);

  useEffect(() => {
    form.setFieldsValue({
      name: productData?.name,
      img: productData?.img,
      description: productData?.description,
      language: productData?.language
    });
  }, [productData]);

  // const dataSource = categoryData?.map(({ _id, name,email }: IUsers) => ({
  //     key: _id,
  //     name,
  //     email,
  // }))

  const onFinish = (values: IUsers) => {
    updateBlog({ ...values, _id: idBlog })
      .unwrap()
      .then(() => navigate("/admin/blog"));
  };

  const numberPattern = /^[0-9]*$/;
  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">
          Sửa Lại Blog : {productData?.name}
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
            label="Img"
            name="img"
            rules={[
              { required: true, message: "Vui lòng nhập ảnh!" },
            
      
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả!" },
              { min: 10, message: "khóa học ít nhất 10 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Language"
            name="language"
            rules={[
              { required: true, message: "Vui lòng nhập ngôn ngữ!" },
              { min: 4, message: "khóa học ít nhất 4 ký tự" },
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
              onClick={() => navigate("/admin/blog")}
            >
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditBlog;
