import { useGetProductsQuery, useRemoveProductMutation } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Table, Skeleton, Popconfirm, Alert, Image, Button } from "antd";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaPlus, FaRegAddressCard } from 'react-icons/fa';

type Props = {};
const Listproduct = (props: Props) => {
    const { data: productData, isLoading, error } = useGetProductsQuery();

    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveProductMutation();
    // yes sir 
        const confirm=(id: number)=>{
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
            }).then((result)=>{
                if(result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel){
                    removeProduct(id);
                }
            })
                
          
           
        }
    console.log(productData);

    const dataSource = productData?.data.map(({ _id, name, price, img, description }: IProduct) => ({
        key: _id,
        name,
        price,
        img,
        description,
    }))
    const columns = [
        {
            title: "Tên khóa học",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Image",
            dataIndex: "img",
            key: "img",
            render: (img: string) => <Image src={img} alt="Ảnh" width={80} height={65} />,
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
                            <Link to={`/admin/product/edit/${_id}`} >
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
                <h2 className="font-bold text-2xl">Quản lý khóa học</h2>
                <button className="bg-green-700 hover:bg-green-600 hover:text-white  text-white font-bold py-1 px-4 border border-green-600 rounded w-80 h-14 flex items-center" >
                    <Link to="/admin/product/add" className="flex items-center space-x-2  hover:text-white justify-center text-2xl">
                    <FaPlus></FaPlus>
                       <span>Thêm Khóa Học Mới</span>
                    </Link>
                </button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default Listproduct;