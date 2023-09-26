import { useGetCategorysQuery } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { IProduct } from "@/interface/products";
import { Form, Button, Input} from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAddBlogMutation } from "@/Api/Blog";
type FieldType = {
    name: string;
    price: number | string;
    img: string;
    description:string;
    categoryId: string;
    paymentDetails: string | null
};
const AddBlog = () => {
    const [addProduct, { isLoading }] = useAddBlogMutation();
    const navigate = useNavigate();
    const onFinish = (values: IProduct) => {
        addProduct(values)
            .unwrap()
            .then(() => navigate("/admin/blog"));
    };

    const { data:  categoryData } = useGetCategorysQuery();
    console.log(categoryData?.data);
     const dataSource = categoryData?.data.map(({ _id, name }: Category) => ({
            key: _id,
            _id,
            name,
        }))

   

    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm Blog</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                    <Form.Item<FieldType>
                    label="Tên Blog"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên Blog!" },
                        { min: 5, message: "khóa học ít nhất 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item<FieldType> label="ảnh"  name="img"
                rules={[
                    { required: true, message: "Vui lòng nhập img khóa học!" },  
                ]}
                >
                    <Input />
                </Form.Item>

              
            
                <Form.Item<FieldType>
                    label="mô tả"
                    name="description"
                    rules={[
                        { required: true, message: "Vui lòng nhập mô tả!" },
                        { min: 10, message: "khóa học ít nhất 10 ký tự" },
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
                        onClick={() => navigate("/admin/products")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddBlog;