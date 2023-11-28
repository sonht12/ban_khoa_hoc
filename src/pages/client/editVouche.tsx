import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditVouche = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
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
        discount: dataVVouche?.data?.discount,
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
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    code?: string;
    discount?: string;
    sale?: string;
  };
  return (
    <div>
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
      >
        <Form.Item<FieldType>
          label="code"
          name="code"
          rules={[{ required: true, message: "Please input your code!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="discount"
          name="discount"
          rules={[{ required: true, message: "Please input your discount!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="sale"
          name="sale"
          rules={[{ required: true, message: "Please input your sale!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" className="bg-red-500" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditVouche;
