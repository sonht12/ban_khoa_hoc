import userApi, { useSignUpMutation } from '@/Api/userApi';
import { useNavigate } from "react-router-dom";
import { IUsers } from '@/interface/user';
import React from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import "./signin_signup.css"
import {BiLogoGmail,BiSolidUser} from "react-icons/bi";
import {RiLockPasswordFill} from "react-icons/ri";
import {BsPhoneFill} from "react-icons/bs";
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
    <div className=" flex justify-center">
      <div  className="contaiiiner   ">
      <div className="login-content ">
            <div className="login-formmm">
            
        <Form
         className="register-formmm " id="register-form"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >   
        <h2 className="form-title mr-3">Đăng ký</h2>
        <Form.Item<FieldType>
      className="form-group"
      name="name"
      rules={[{ required: true, message: 'Bắt buộc phải nhập tên' }]}
    >
      <Input  className="input no-border-radius  input-prefix-spacing input-password w-[300px] mr-4" placeholder="Nhập tên của bạn" prefix={<BiSolidUser />}/>
      
    </Form.Item>

    <Form.Item<FieldType>
      className="form-group"
      name="email"
      rules={[{ required: true, message: 'Bắt buộc phải nhập Email!' }]}
    >
      <Input  className="input no-border-radius  input-prefix-spacing input-password w-[300px] mr-4" placeholder="Nhập email của bạn" prefix={<BiLogoGmail />}/>
      
    </Form.Item>

    <Form.Item<FieldType>
      className="form-group"
      name="phoneNumber"
      rules={[{ required: true, message: 'Bắt buộc phải nhập số điện thoại!' }]}
    >
      <Input  className="input no-border-radius  input-prefix-spacing input-password w-[300px] mr-4" placeholder="Nhập số điện thoại của bạn" prefix={<BsPhoneFill />}/>
      
    </Form.Item>

    <Form.Item<FieldType>
      className="form-group"
      name="password"
      rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
    >
      <Input.Password className="input no-border-radius input-prefix-spacing w-[300px] mr-4" placeholder="Nhập mật khẩu của bạn" prefix={<RiLockPasswordFill />}/>
    </Form.Item>
    <Form.Item<FieldType>
      className="form-group"
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
      <Input.Password className="input no-border-radius input-prefix-spacing w-[300px] mr-4" placeholder="Nhập mật khẩu của bạn" prefix={<RiLockPasswordFill />}/>
    </Form.Item>

       
          <Form.Item className='mr-4'>
                    <Button className=' mt-4 text-[20px] w-[140px] h-[50px]' type="primary" danger htmlType="submit">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Đăng ký"
                        )}
                    </Button>

                </Form.Item>
        </Form>
    
        <div className="login-image ml-4">
               <img className="w-[400px] h-[300px] " src="../../../public/img/signup.jpg" alt="" />
                </div>
        </div>
        </div>
        </div>
        </div>
)
}

export default Signup