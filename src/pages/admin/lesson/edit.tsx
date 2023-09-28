import { Button, Form, Input, Skeleton, Select } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLessonByIdQuery, useUpdateLessonMutation } from "@/Api/lesson";
import { Lesson } from "@/interface/lessons";
type FieldType = {
    name: string;
    video: string;
    productId: string;
  };
const EditLesson = () => {
    const { idLesson } = useParams<{ idLesson: string }>();
    const { data: lessontData, isLoading } =useGetLessonByIdQuery(idLesson || "");
    const [updateLesson] = useUpdateLessonMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    console.log(idLesson);
    
    console.log(lessontData);


    useEffect(() => {
        form.setFieldsValue({
            name: lessontData?.data.name,
            video:lessontData?.data.video,
            productId: lessontData?.data.productId._id,
           
        });
    }, [lessontData]);
    console.log(lessontData?.data._id);


    const onFinish = (values: Lesson) => {
        updateLesson({ ...values, _id: idLesson })
            .unwrap()
            .then(() =>  navigate(`/admin/product/detail/${lessontData?.data.productId._id}`));
    };

    const numberPattern = /^[0-9]*$/; 
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Sửa khóa học : {lessontData?.name}</h2>
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

                    <Form.Item<FieldType> label="video" name="video"
                     rules={[
                        { required: true, message: "Vui lòng nhập video khóa học!" },  
                    ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="productId" name="productId"
                      className="pointer-events-none"// Vô hiệu hóa trường nhập
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
                            className="ml-2 bg-yellow-500 text-white "
                            onClick={() => navigate(`/admin/product/detail/${lessontData?.data.productId._id}`)}
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