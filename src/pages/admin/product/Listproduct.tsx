import { useGetProductsQuery,useRemoveProductMutation } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Table,  Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";

type Props = {};
const Listproduct = (props: Props) => {
    const { data:  productData, isLoading , error } = useGetProductsQuery();
  
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveProductMutation();

    const confirm = (_id: number) => {
        removeProduct(_id);
    };
    console.log(productData);
    
        const dataSource = productData?.data.map(({ _id, name, price, categoryId }: IProduct) => ({
            key: _id,
            name,
            price,
            categoryId,
        }))


    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "categoryId",
            dataIndex: "categoryId",
            key: "categoryId",
        },
        {
            title: "",
            render: ({ key: _id }: any) => {
                return (
                    <>
                        <div className="flex space-x-2">
                            <Popconfirm
                                title="MÀy có muốn xóa ?"                                                                                                       
                                onConfirm={() => confirm(_id)}
                                okText="Yes"
                                cancelText="No"                                                                                                                                                                                                                                                                                                                                                                                                                                          
                            >
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 border border-red-500 rounded ">
                                    Xóa
                                </button>
                            </Popconfirm>

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 border border-blue-500 rounded">
                                <Link to={`/admin/product/edit/${_id}`}>Sửa</Link>
                            </button>
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý sản phẩm</h2>
                <button className="bg-green-700 hover:bg-green-600 hover:text-white text-white font-bold py-1 px-4 border border-green-600 rounded " >
                    <Link to="/admin/product/add" className="flex items-center space-x-2  hover:text-white">
                        Thêm sản phẩm
                    </Link>
                </button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default Listproduct ;