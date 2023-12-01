import { useGetOrderByIdQuery, useGetOrdersQuery } from "@/Api/order";
import { IOrder } from "@/interface/order";
import { Table, Skeleton, Button, Drawer } from "antd";
import { BsCheck } from "react-icons/bs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { exportToExcel } from "@/pages/admin/Dashboard/Dashboard";

const ListOrder = () => {
  const { data: orderData, isLoading } = useGetOrdersQuery();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusText, setStatusText] = useState("");
  console.log(orderData?.data);
  const getSatusColor = (orderStatus: string) => {
    switch (orderStatus) {
      case "Done":
        return "green";
      case "Đã xác nhận":
        return "yellow"; // Thay đổi màu thành yellow cho 'Đã xác nhận'
      default:
        return "blue"; // Thay đổi màu thành blue cho trạng thái khác
    }
  };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [dataSource, setDataSource] = useState(
    orderData?.data.map(
      ({ _id, course, user, orderStatus, orderDate, payment }: IOrder) => ({
        key: _id,
        courseName: course?.name,
        userName: user?.name,
        userEmail: user?.email,
        userPhoneNumber: user?.phoneNumber,
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
      render: (text: any, record: any) => {
        const color = getSatusColor(text);
        const displayText = text === selectedStatus ? statusText : text; // Hiển thị nội dung mới nếu trạng thái được chọn
        return (
          <span
            style={{ color }}
            className="font-bold flex items-center space-y-2"
          >
            {displayText}
            <BsCheck className="text-lg ml-1" />
          </span>
        );
      },
    },
    {
      title: "Actions",
      render: ({ key: id }: { key: string }) => (
        <Link to={`/admin/orders/${id}`} onClick={showDrawer}>
          {" "}
          view{" "}
        </Link>
      ),
    },
  ];
  return (
    <div>
      <Button onClick={() => exportToExcel(orderData.data, "allOrder")}>
        Xuất Excel
      </Button>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};

export default ListOrder;
