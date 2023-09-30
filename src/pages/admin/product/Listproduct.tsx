import { useGetProductsQuery, useRemoveProductMutation } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Table, Skeleton,  Alert, Image, Button } from "antd";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';

import { FaPlus } from 'react-icons/fa';
import { useState } from "react";
import './index.css'
import { useGetAllBlogQuery } from "@/Api/Blog";
const Listproduct = () => {
    const handleBulkDelete = () => {
      // Kiểm tra xem có ô trống nào được chọn không
      if (checkedIds.length === 0) {
        return;
      }
  
      // Hiển thị xác nhận xóa hàng loạt
      Swal.fire({
        title: "Bạn Chắc Chắn Muốn Xóa Những Mục Đã Chọn?",
        text: "Bạn sẽ không thể hủy nếu đồng ý!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng Ý!",
        customClass: {
          popup: "swal2-popup swal2-modal swal2-icon-warning swal2-show",
        },
      }).then((result) => {
        if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
          // Lặp qua các ID đã chọn và xóa chúng
          checkedIds.forEach((id) => {
            removeProduct(id);
          });
  
          // Sau khi xóa xong, cập nhật lại danh sách checkedIds
          setCheckedIds([]);
        }
      });
    };

    const [checkedIds, setCheckedIds] = useState<number[]>([]);
  
    const handleCheckboxChange = (id: number) => {
      if (checkedIds.includes(id)) {
        // Nếu ID đã tồn tại trong mảng, loại bỏ nó
        setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
      } else {
        // Nếu ID không tồn tại trong mảng, thêm nó vào
        setCheckedIds([...checkedIds, id]);
      }
      console.log("đã lấy được id:", id);
    };
  
    const { data: productData, isLoading } = useGetProductsQuery();
    console.log("productdata:", productData);
  
    const [
      removeProduct,
      { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
    ] = useRemoveProductMutation();
  
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


    const dataSource = productData?.data?.map(({ _id, name, price, img, description }: IProduct) => ({
        key: _id,
        name,
        price,
        img,
        description,
    })) || [];
    console.log("datasoure :", dataSource)
    const columns = [
        {
            title: "Tên khóa học",
            dataIndex: "name",
            key: "name",
            render:(text : any)=>(
                <div className="name-style">
                    {text}
                </div>
            )
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
            render: (text :any) => (
                <div
                  className="columnss-cell"
                >
                  {text}
                </div>)
        },
        {
            title: "Image",
            dataIndex: "img",
            key: "img",
            render: (img: string) => <Image src={img} alt="Ảnh" width={95} height={70} />,
        },

        {
            title: "",
            render: ({ key: _id }: any) => {
                return (
                    <>

                        <div className="flex items-center justify-center mr-auto">

                            <Button className=' w-6 h-6 pl-1 mr-2' type='primary' danger onClick={() => confirm(_id)}>
                                <IoTrashOutline className="text-l " />
                            </Button>
                            <Button className=' w-6 h-6 pl-1 ' type='primary' danger>
                                <Link to={`/admin/product/edit/${_id}`} >
                                    <AiOutlineEdit className="text-l " />
                                </Link>
                            </Button>
                            <label className="">
                                <input
                                    type="checkbox"
                                    style={{
                                        
                                    }}
                                    
                                    onChange={() => handleCheckboxChange(_id)} 
                                    className="w-6 h-6 pl-1 mt-2 ml-2 checkbox-style"

                                />

                            </label>
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
                <button className="bg-green-700 hover:bg-green-600 hover:text-white  text-white font-bold py-1 px-4 border border-green-600 rounded w-48 h-10 flex items-center" >
                    <Link to="/admin/product/add" className="flex items-center space-x-1  hover:text-white justify-center text-sm">
                        <FaPlus></FaPlus>
                        <span>Thêm Khóa Học Mới</span>
                    </Link>
                </button>
                <Button
                    className=' w-32 h-10'
                    type='primary'
                    danger
                    onClick={handleBulkDelete}
                    disabled={checkedIds.length === 0}
                >
                    Delete Choses
                </Button>

            </header>
            {isRemoveSuccess && <Alert message="Xóa Thành Công Bạn Nhóe" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
  };
  
  export default Listproduct;
  