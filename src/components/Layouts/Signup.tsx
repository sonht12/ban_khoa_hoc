import userApi, { useSignUpMutation } from '@/Api/userApi';
import { useNavigate } from "react-router-dom";
import { IUsers } from '@/interface/user';
import React from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
type FieldType = {
    name?: string;
    email?: string;
    phoneNumber: number;
    password?: string;
    confirmPassword?: string;
  };
//   const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//       <Select style={{ width: 70 }}>
//         <Option value="86">+86</Option>
//         <Option value="87">+87</Option>
//       </Select>
//     </Form.Item>
//   );
const Signup = () => {
   const [addsignup, {isLoading}] = useSignUpMutation();
   const navigate = useNavigate();
   const onFinish = (values: IUsers) => {
    addsignup(values)
        .unwrap()
        .then(() => navigate("/signin"));
}; return (
    // andt
    <div className="h-screen font-sans bg-cover bg-no-repeat bg-[url('https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-binh-minh.jpg')]">
       <header className="mb-4">
                <h2 className="font-bold text-2xl text-center">Đăng Ký</h2>
            </header>
        <Form
          className='container mx-auto h-full'
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >   
          <Form.Item<FieldType>
            label="Tên Người Dùng"
            name="name"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[{ required: true, message: 'Không được để trống số điện thoại!' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu mới mà bạn đã nhập không khớp!'));
                  },
                }),
              ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Đăng ký"
                        )}
                    </Button>

                </Form.Item>
        </Form>
        </div>
)
}

export default Signup