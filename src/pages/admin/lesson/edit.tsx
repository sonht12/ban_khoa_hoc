import { Button, Form, Input, Skeleton, Select } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLessonByIdQuery, useUpdateLessonMutation } from "@/Api/lesson";
import { Lesson } from "@/interface/lessons";
type FieldType = {
  name: string;
  video: File | null; // Sử dụng kiểu File cho trường video
  productId: string;
};
const EditLesson = () => {
  const { idLesson } = useParams<{ idLesson: string }>();
  const { data: lessonData, isLoading } = useGetLessonByIdQuery(idLesson || "");
  const [updateLesson] = useUpdateLessonMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);

  useEffect(() => {
    form.setFieldsValue({
      name: lessonData?.data.name,
      productId: lessonData?.data.productId._id,
    });
  }, [lessonData]);

  const onFinish = (values: Lesson) => {
    const formData: any = new FormData();
    formData.append('name', values.name);

    // Thêm tệp video vào formData nếu nó tồn tại
    if (selectedVideoFile) {
      formData.append('video', selectedVideoFile);
    }

    formData.append('productId', values.productId);

    const LessonData = { ...values, _id: idLesson };
    updateLesson({ lesson: LessonData, formData: formData })
      .unwrap()
      .then(() =>
        navigate(`/admin/product/detail/${lessonData?.data.productId._id}`)
      );
  };
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0] as File;

    setSelectedVideoFile(file);
  };

  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">
          Sửa khóa học : {lessonData?.data.name}
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
            label="Tên bài học"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên bài học!" },
              { min: 3, message: "khóa học ít nhất 3 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Video" name="video">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="productId"
            name="productId"
            className="pointer-events-none"
            rules={[]}
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
              className="ml-2 bg-yellow-500 text-white"
              onClick={() =>
                navigate(
                  `/admin/product/detail/${lessonData?.data.productId._id}`
                )
              }
            >
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditLesson;
