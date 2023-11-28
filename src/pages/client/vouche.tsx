import { Button, Drawer, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Vouche = ({ check }: any) => {
  console.log(check);
  const [queryParameters] = useSearchParams();
  const iduser: string | null = queryParameters.get("userId");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [dataVouche, setDataVouche] = useState<any[]>([]);
  useEffect(() => {
    const handelFetchVouche = async () => {
      const { data } = await axios.get("http://localhost:8088/api/vouchers");
      setDataVouche(data);
      console.log(dataVouche);
    };
    handelFetchVouche();
  }, []);
  const handelDelete = async (id: string) => {
    await axios.delete(`http://localhost:8088/api/voucher/${id}`);
    window.location.reload();
  };
  const dataSource = dataVouche?.data?.docs.map((items) => ({
    key: items._id,
    code: items.code,
    sale: items.sale,
    start: items.startDate,
    isActive: items.isActive,
    end: items.endDate,
  }));
 const handelSendVouche = async (id: string) => {
    await axios.get(`http://localhost:8088/api/voucher/${iduser}/${id}`)
    alert("send success");
 }
  const columns = [
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      key: "isActive",
      render: (b) => {
        return (
          <p className={`${b == true ? "text-green-500" : "text-red-500"}`}>
            {b ? "Hoạt động" : "đã dùng"}
          </p>
        );
      },
    },
    {
      title: "sale",
      dataIndex: "sale",
      key: "sale",
    },
    {
      title: "start",
      dataIndex: "start",
      key: "start",
      render: (data) => {
        return <p>{data.split("T")[0]}</p>;
      },
    },
    {
      title: "end",
      dataIndex: "end",
      key: "end",
      render: (data) => {
        return <p>{data.split("T")[0]}</p>;
      },
    },
    {
      title: "action",
      render: ({ key: id }: { key: string }) => {
        return (
          <>
            {check ? (
              <div>
                <Button onClick={()=> handelSendVouche(id)}>Send</Button>
              </div>
            ) : (
              <div className="space-x-2">
                <Button onClick={() => handelDelete(id)}> delete </Button>
                <Link to={`/admin/vouche/${id}`}> edit </Link>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Link
        className="mb-10 border p-5 bg-green-300"
        to={"/admin/create-vouche"}
      >
        Create vouche now
      </Link>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Vouche;
