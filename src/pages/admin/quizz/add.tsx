
import { useParams } from "react-router-dom";
import { Form, Button, Input,  } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAddQuizzMutation } from "@/Api/quizz";

type FieldType = {
    _id?:number|string,
    name: string,
    correctAnswer:string,
    Wronganswer1:string,
    Wronganswer2:string,
    Wronganswer3:string,
    lessonId:string|number,
};

const Addquizz = () => {
  const { idLesson } = useParams<{ idLesson: string }>();
  const [addquizz, { isLoading }] = useAddQuizzMutation();
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    addquizz(values)
      .unwrap()
      .then(() => navigate(`/admin/lesson/detail/${idLesson}`));
      
  };

  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm câu hỏi </h2>
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
          label="Câu hỏi"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên khóa học!" },
            { min: 5, message: "Khóa học ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="câu trả lời đúng"
          name="correctAnswer"
          rules={[
            { required: true, message: "Vui lòng nhập tên khóa học!" },
            { min: 5, message: "Khóa học ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="câu trả lời 1"
          name="Wronganswer1"
          rules={[
            { required: true, message: "Vui lòng nhập tên khóa học!" },
            { min: 5, message: "Khóa học ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="câu trả lời 2"
          name="Wronganswer2"
          rules={[
            { required: true, message: "Vui lòng nhập tên khóa học!" },
            { min: 5, message: "Khóa học ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="câu trả lời 3"
          name="Wronganswer3"
          rules={[
            { required: true, message: "Vui lòng nhập tên khóa học!" },
            { min: 5, message: "Khóa học ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

       
        <Form.Item
          label="lessonId"
          name="lessonId"
          initialValue={idLesson} // Đặt giá trị mặc định bằng lessonId
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
            onClick={() => navigate(`/admin/lesson/detail/${idLesson}`)}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Addquizz;
