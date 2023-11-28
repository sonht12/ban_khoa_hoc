import { useGetOrderByIdQuery } from "@/Api/order";
import { exportToExcel } from "@/pages/client/Dashboard";
import { Button, Table } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const OderId = () => {
  const { id } = useParams();
  const { data: orderDataId } = useGetOrderByIdQuery(id as string);
  console.log(orderDataId);
  return (
    <div>
        <Button onClick={()=> exportToExcel([orderDataId], "details")}> Xuất Excel </Button>
      <div className="flex gap-5">
        <p>trạng thái</p> <p>{orderDataId?.data.orderStatus}</p>
      B</div>

      <div className="flex gap-5">
        <p>ảnh</p>{" "}
        <img className="w-[100px]" src={`${orderDataId?.data?.course.img}`} />
      </div>

      <div className="flex gap-5">
        <p>tên khóa</p>{" "}
        <p className="w-[100px]"> {orderDataId?.data?.course.name}</p>
      </div>

      <div className="flex gap-5">
        <p>description</p> <p> {orderDataId?.data?.course.description}</p>
      </div>
      <div className="flex gap-5">
        <p>giá</p> <p> {orderDataId?.data?.payment.paymentAmount}</p>
      </div>
      <div className="flex gap-5">
        <p>paymentMethod</p> <p> {orderDataId?.data?.payment.paymentMethod}</p>
      </div>

      <div className="flex gap-5">
        <p>user</p> <p> {orderDataId?.data?.user.name}</p>
      </div>
    </div>
  );
};

export default OderId;
