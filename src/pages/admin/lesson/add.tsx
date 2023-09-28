
import { useParams } from "react-router-dom";
import { useAddLessonMutation } from "@/Api/lesson";
import { Form, Button, Input,  } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type FieldType = {
  name: string;
  video: string;
  productId: string;
};

const Addlesson = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const [addlesson, { isLoading }] = useAddLessonMutation();
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    addlesson(values)
      .unwrap()
      .then(() => navigate(`/admin/product/detail/${idProduct}`));

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
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên bài học"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên bài học!" },
            { min: 5, message: "Khóa học ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Video"
          name="video"
          rules={[
            { required: true, message: "Vui lòng nhập video khóa học!" },
          ]}
        >
          <Input />
        </Form.Item>

     

        <Form.Item
          label="ProductId"
          name="productId"
          initialValue={idProduct} // Đặt giá trị mặc định bằng idProduct
          className="pointer-events-none"// Vô hiệu hóa trường nhập
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
