import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/Api/order";
import { IOrder } from "@/interface/order";
import {
  Table,
  Skeleton,
  Button,
  Dropdown,
  Menu,
} from "antd";
import {AiFillCheckCircle} from "react-icons/ai"
import {BsCheck} from "react-icons/bs"
import React, { useState } from "react";

const ListOrder = () => {
  const { data: orderData, isLoading } = useGetOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);
  const [statusText, setStatusText] = useState("");

  const getSatusColor = (orderStatus:string) => {
    switch (orderStatus) {
      case "Done":
        return "green";
      case "Đã xác nhận":
        return "yellow"; // Thay đổi màu thành yellow cho 'Đã xác nhận'
      default:
        return "blue"; // Thay đổi màu thành blue cho trạng thái khác
    }
  };

  // const handleMenuItemClick = (item:any) => {
  //   const newStatus = item.label;
  //   setSelectedStatus(newStatus);
  
  //   if (selectedRowKey !== null) {
  //     const newData = dataSource.map((data:any) => {
  //       if (data.key === selectedRowKey) {
  //         return { ...data, orderStatus: newStatus };
  //       }
  //       return data;
  //     });
  
  //     setDataSource(newData);
  
  //     updateOrderStatus({
  //       order: { id: selectedRowKey, orderStatus: newStatus }, // Correct format for the mutation
  //     })
  //       .unwrap()
  //       .then((data) => {
  //         // API gọi thành công, data chứa kết quả từ API nếu có
  //         console.log("API call succeeded:", data);
  //         setStatusText(newStatus);
  //       })
  //       .catch((error) => {
  //         console.error("Error updating order status", error);
  //       });
  //   }
  // };
  

  // const items = [
  //   {
  //     key: "1",
  //     label: "Đã thanh toán",
  //   },
  //   {
  //     key: "2",
  //     label: "Đã xác nhận",
  //   },
  // ];

  const [dataSource, setDataSource] = useState(
    orderData?.data?.map(
      ({
        _id,
        course,
        user,
        orderStatus,
        orderDate,
        payment,
      }: IOrder) => ({
        key: _id,
        courseName: course.name,
        userName: user.name,
        userEmail: user.email,
        userPhoneNumber: user.phoneNumber,
        orderStatus,
        paymentMethod: payment?.paymentMethod,
        paymentAmount: payment?.paymentAmount,
        orderDate,
        orderId: _id,
      })
    ) || []
  );


  const columns = [
    {
      title: "Tên khóa học",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Tên người đăt hàng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email người mua",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Số điện thoại",
      dataIndex: "userPhoneNumber",
      key: "userPhoneNumber",
    },
    {
      title: "Đơn giá",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Trạng thái đặt hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text, record) => {
        const color = getSatusColor(text);
        const displayText = text === selectedStatus ? statusText : text; // Hiển thị nội dung mới nếu trạng thái được chọn
        return (
          <span style={{ color }} className="font-bold flex items-center space-y-2">{displayText}
          <BsCheck className="text-lg ml-1"/>
          </span>
          
        );
      },
    },
    // {
    //   title: "Actions",
    //   render: ({ key: _id }) => (
    //     <Dropdown
    //       overlay={
    //         <Menu onClick={handleMenuItemClick}>
    //           {items.map((item) => (
    //             <Menu.Item key={item.key}>{item.label}</Menu.Item>
    //           ))}
    //         </Menu>
    //       }
    //     >
    //       <Button>...</Button>
    //     </Dropdown>
    //   ),
    // },
  ];

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};

export default ListOrder;
