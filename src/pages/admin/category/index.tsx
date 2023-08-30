// import { useGetProductsQuery,useRemoveProductMutation } from "@/Api/productApi";
import { useGetCategorysQuery, useRemoveCategoryMutation } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { Table, Skeleton, Popconfirm, Alert, Button } from "antd";
import { Link } from "react-router-dom";
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
type Props = {};
const Listcategory = (props: Props) => {
    const { data: categoryData, isLoading, error } = useGetCategorysQuery();

    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveCategoryMutation();

    const confirm = (id: number) => {
        Swal.fire({
            title: 'Bạn Chắc Chắn Muốn Xóa chứ?',
            text: "Bạn sẽ không thể hủy nếu đồng ý '!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: ' oke Luôn!',
            customClass: {
                popup: 'swal2-popup swal2-modal swal2-icon-warning swal2-show', // Áp dụng quy tắc CSS trực tiếp
            },
        }).then((result) => {
            if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
                removeProduct(id);
            }
        })



    }
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
                        <div className="flex items-center justify-center mr-auto">
                            <Button className='m-3 w-16 h-12' type='primary' danger onClick={() => confirm(_id)}>
                                <IoTrashOutline className="text-4xl mr-1" />
                            </Button>
                            <Button className='m-3 w-16 h-12' type='primary' danger>
                                <Link to={`/admin/category/edit/${_id}`} >
                                    <AiOutlineEdit className="text-4xl mr-1" />
                                </Link>
                            </Button>
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

export default Listcategory;

