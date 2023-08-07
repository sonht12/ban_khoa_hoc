// import { useGetProductsQuery,useRemoveProductMutation } from "@/Api/productApi";
import { useGetCategorysQuery,useRemoveCategoryMutation } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { Table,  Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";

type Props = {};
const Listcategory = (props: Props) => {
    const { data:  categoryData, isLoading , error } = useGetCategorysQuery();
  
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
    useRemoveCategoryMutation();

    const confirm = (_id: number) => {
        removeProduct(_id);
    };
    console.log(categoryData?.data);
    
    
        const dataSource = categoryData?.data.map(({ _id, name }: Category) => ({
            key: _id,
            _id,
            name,
        }))

    const columns = [
        {
            title: "Tên ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "id",
            dataIndex: "_id",
            key: "_id",
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
                                <Link to={`/admin/category/edit/${_id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý danh mục</h2>
                <button className="bg-green-700 hover:bg-green-600 hover:text-white text-white font-bold py-1 px-4 border border-green-600 rounded " >
                    <Link to="/admin/category/add" className="flex items-center space-x-2  hover:text-white">
                        Thêm danh mục
                    </Link>
                </button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default Listcategory ;

