import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/Api/productApi';
import { Table, Skeleton, Button, Alert } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { IoTrashOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { useRemoveCommentMutation } from '@/Api/CommentApi';
import { IComment } from '@/interface/comment';

const CommentProduct = () => {
    const { idProduct }: any = useParams<{ idProduct: string }>();
    const { data: productData, isLoading, refetch }: any = useGetProductByIdQuery(idProduct);
    console.log("vãi shit:", productData)
    const [removeComment, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveCommentMutation();

    // State để lưu trạng thái ẩn/hiện của bình luận
    const [hiddenComments, setHiddenComments]: any = useState({});
    const toggleHidden = (commetId: any) => {
        setHiddenComments((prevHiddenComments: any) => {
            const updatedHiddenComments = {
                ...prevHiddenComments,
                [commetId]: !prevHiddenComments[commetId], // Đảo trạng thái ẩn/hiện
            };
    
            // Lưu trạng thái ẩn/hiện vào localStorage
            localStorage.setItem('hiddenComments', JSON.stringify(updatedHiddenComments));
    
            return updatedHiddenComments;
        });
    };
    useEffect(() => {
        // Kiểm tra xem đã có trạng thái ẩn/hiện trong localStorage hay chưa
        const storedHiddenRatings = localStorage.getItem('hiddenComments');
        if (storedHiddenRatings) {
            setHiddenComments(JSON.parse(storedHiddenRatings));
        }
    }, []);
    // Xử lý khi người dùng nhấp vào nút xóa
    const handleRemoveComment = (commentId: number) => {
        console.log('_id of rating to be removed:', commentId);
        Swal.fire({
            title: 'Bạn Chắc Chắn Muốn Xóa chứ?',
            text: "Bạn sẽ không thể hủy nếu đồng ý '!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: ' Oke Luôn!',
            customClass: {
                popup: 'swal2-popup swal2-modal swal2-icon-warning swal2-show',
            },
        }).then((result) => {
            if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
                // Gọi mutation để xóa đánh giá và cập nhật trạng thái
                removeComment({ commentId: commentId, hidden: false }).then(() => {
                    // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm bằng cách fetch lại dữ liệu
                    refetch();
                });
            }
        });
    };

    // Define columns for the ratings table
    const columns = [
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <span className={`${hiddenComments[record._id] ? 'opacity-50' : ''}`}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: any, record: any) => (
                <span className={`${hiddenComments[record._id] ? 'opacity-50' : ''}`}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Bình luận',
            dataIndex: 'comment', // Điểm dữ liệu bình luận, bạn có thể thay đổi tùy theo dữ liệu thực tế của bạn
            key: 'comment',
            render: (comment: string) => (
              <div>
                {comment}
              </div>
            ),
          },
        {
            title: 'Action',
            dataIndex: '_id',
            key: 'action',
            render: (commentId: number) => (
                <div>
                    <Button onClick={() => toggleHidden(commentId)} className='mr-3'>
                        {hiddenComments[commentId] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </Button>
                    <Button className='w-6 h-6 pl-1' type='primary' danger onClick={() => handleRemoveComment(commentId)}>
                        <IoTrashOutline className="text-l " />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý Bình Luận</h2>
            </header>
            {isRemoveSuccess && <Alert message="Xóa Thành Công!" type="success" />}
            {isLoading ? (
                <Skeleton />
            ) : (
                <Table
                    dataSource={productData?.data?.comment || []}
                    columns={columns}
                    rowKey={(record) => record._id}
                />
            )}
        </div>
    );
};

export default CommentProduct;