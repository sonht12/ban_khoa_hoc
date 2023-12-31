import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
const EditVouche = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [dataVVouche, setDataVouche] = useState();
  useEffect(() => {
    const handelFetchDataId = async () => {
      const { data } = await axios.get(
        `http://localhost:8088/api/voucher/${id}`
      );
      setDataVouche(data);
      console.log(dataVVouche);
    };
    handelFetchDataId();
  }, []);
  const handelPostVouche = async (data) => {
    await axios.post(`http://localhost:8088/api/voucher`, data);
    console.log(data);
  };
  const handelupdateVouche = async (data) => {
    await axios.put(`http://localhost:8088/api/voucher/${id}`, data);
    console.log(data);
  };
  useEffect(() => {
    if (dataVVouche) {
      form.setFieldsValue({
        code: dataVVouche?.data?.code,
        // discount: dataVVouche?.data?.discount,
        sale: dataVVouche?.data?.sale,
      });
    }
  }, [dataVVouche, form, id]);
  const onFinish = (values: any) => {
    if (id) {
      handelupdateVouche(values);
    } else {
      handelPostVouche(values);
    }
    // Wait for 1 second before navigating to "/admin/vouche"
    setTimeout(() => {
      navigate("/admin/vouche");
    }, 1000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    code?: string;
    // discount?: string;
    sale?: string;
  };
  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Sửa Mã Giảm Giá</h2>
            </header>
      <div className="flex justify-center bg-white w-1/2">
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full mt-10 mr-40"
      >
        <Form.Item<FieldType>
          label="Mã giảm giá"
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã giảm giá!" }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item<FieldType>
          label="discount"
          name="discount"
          rules={[{ required: true, message: "Please input your discount!" }]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item<FieldType>
          label="Số tiền giảm"
          name="sale"
          rules={[
            { required: true, message: "Vui lòng nhập số tiền giảm!" },
            {
              pattern: /^[0-9]*$/,
              message: "Chỉ được nhập số!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" className="bg-red-500" htmlType="submit">
            Sửa
          </Button>
        </Form.Item>
      </Form>
      </div>
      
    </div>
  );
};

export default EditVouche;
