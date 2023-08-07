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
        .then(() => navigate("/"));
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
            label="Tên đăng nhập"
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
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
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
                  message: 'Please confirm your password!',
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
    // return (
    //     <>
    //         <div
    //             className="h-screen font-sans bg-cover bg-no-repeat bg-[url('https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-binh-minh.jpg')]">
    //             <div className="container mx-auto h-full flex flex-1 justify-center items-center">
    //                 <div className="w-full max-w-lg">
    //                     <div className="leading-loose">
    //                         <form className="max-w-sm m-4 p-10 bg-white bg-opacity-10 rounded shadow-xl">
    //                             <p className="text-black text-center text-lg font-bold">SIGN UP</p>
    //                             <div className="">
    //                                 <label className="block text-lg font-semibold text-black" htmlFor="email">E-mail</label>
    //                                 <input
    //                                     className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
    //                                     type="email" placeholder="Nhập email của bạn" />
    //                             </div>
    //                             <div className="mt-2">
    //                                 <label className="block  text-lg font-semibold text-black">Tên tài khoản</label>
    //                                 <input
    //                                     className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
    //                                     type="name" placeholder="Tên tài khoản" />
    //                             </div>
    //                             <div className="mt-2">
    //                                 <label className="block  text-lg font-semibold text-black">Số điện thoại</label>
    //                                 <input
    //                                     className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
    //                                     type="phoneNumber" placeholder="Số điện thoại" />
    //                             </div>
    //                             <div className="mt-2">
    //                                 <label className="block  text-lg font-semibold text-black">Mật khẩu</label>
    //                                 <input
    //                                     className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
    //                                     type="password" placeholder="Nhập mật khẩu của bạn" />
    //                             </div>
    //                             <div className="mt-2">
    //                                 <label className="block  text-lg font-semibold text-black">Nhập lại mật khẩu</label>
    //                                 <input
    //                                     className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
    //                                     type="confirmPassword" placeholder="Nhập mật khẩu của bạn" />
    //                             </div>

    //                             <a href="">
    //                                 <div className="mt-4 items-center flex justify-center">
    //                                     <button
    //                                         className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 hover:bg-blue-400 rounded"
    //                                         type="submit">Đăng ký
    //                                     </button>
    //                                 </div>
    //                             </a>
    //                         </form>

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )
}

export default Signup