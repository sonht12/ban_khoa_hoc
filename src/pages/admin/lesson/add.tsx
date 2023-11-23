import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddLessonMutation } from '@/Api/lesson';
import { Form, Button, Input } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  name: string;
  video: File | null; // Sử dụng kiểu File cho trường video
  productId: string;
};

const Addlesson = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const [addlesson, { isLoading }] = useAddLessonMutation();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  // Sử dụng state để lưu trữ file video được chọn
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);

  const onFinish = async (values: FieldType) => {
    const formData:any = new FormData();
    formData.append('name', values.name);

    // Thêm tệp video vào formData nếu nó tồn tại
    if (selectedVideoFile) {
      formData.append('video', selectedVideoFile);
    }

    formData.append('productId', values.productId);

    try {
      await addlesson(formData).unwrap();
      navigate(`/admin/product/detail/${idProduct}`);
    } catch (error) {
     console.log(error);
     
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file:any = event.target.files[0];
    setSelectedVideoFile(file);
  };

  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm bài học</h2>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên bài học"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên bài học!' },
            { min: 5, message: 'Bài học ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Video" name="video">
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </Form.Item>

        <Form.Item
          label="ProductId"
          name="productId"
          initialValue={idProduct}
          className="pointer-events-none"
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit" >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              'Thêm'
            )}
          </Button>
          <Button
            className="ml-2 bg-yellow-500 text-white"
            onClick={() => navigate(`/admin/product/detail/${idProduct}`)}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Addlesson;
