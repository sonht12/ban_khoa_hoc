import { useGetProductByIdQuery, useUpdateProductMutation } from "@/Api/productApi";
import { useGetCategorysQuery } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { IProduct } from "@/interface/products";
import { Button, Form, Input, Skeleton, Select } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
type FieldType = {
    name: string;
    price: number;
    img: string;
    description: string;
    categoryId: string;

};
const EditProduct = () => {
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData, isLoading }:any = useGetProductByIdQuery(idProduct || "");
    const [updateProduct] = useUpdateProductMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    console.log(productData);


    useEffect(() => {
        form.setFieldsValue({
            name: productData?.data.name,
            price: productData?.data.price,
            img: productData?.data.img,
            description: productData?.data.description,
            categoryId: productData?.data.categoryId._id,
        });
    }, [productData]);
    console.log(productData?.data.categoryId._id);

    const { data: categoryData } = useGetCategorysQuery();
    console.log(categoryData?.data);
    const dataSource = categoryData?.data.map(({ _id, name }: Category) => ({
        key: _id,
        _id,
        name,
    }))



    const onFinish = (values: IProduct) => {
        updateProduct({ ...values, _id: idProduct })
            .unwrap()
            .then(() => navigate("/admin/products"));
    };

    const numberPattern = /^[0-9]*$/; 
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Sửa khóa học : {productData?.data.name}</h2>
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
                        label="Tên khóa học"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên khóa học!" },
                            { min: 3, message: "khóa học ít nhất 3 ký tự" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="ảnh" name="img"
                     rules={[
                        { required: true, message: "Vui lòng nhập img khóa học!" },  
                    ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Giá khóa học" name="price"
                    rules={[
                        { required: true, message: "Vui lòng nhập giá khóa học!" },
                        { min: 5, message: "khóa học ít nhất 5 chữ số" },
                        { pattern: numberPattern, message: 'Chỉ được nhập số!' },  
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
                            onClick={() => navigate("/admin/products")}
                        >
                            Quay lại
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default EditProduct;