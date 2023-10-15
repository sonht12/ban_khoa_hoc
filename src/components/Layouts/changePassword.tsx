import { Link } from "react-router-dom"
import userApi, { useChangePasswordMutation, useLoginMutation } from '@/Api/userApi';
import { IUsers } from "@/interface/user";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import {BiLogoGmail} from "react-icons/bi";
import {RiLockPasswordFill} from "react-icons/ri";
import "./signin_signup.css"
type FieldType = {
    email?: string;
    confirmPassword?: string;
    newPassword?:string;
  };
const ChangePassword = () => {
    const userInfoString = localStorage.getItem('userInfo');
    const storedUserInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const initialEmail = storedUserInfo?.userData.email || "";
    
    const [changePassword, {isLoading}]= useChangePasswordMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const SET_USER = 'SET_USER';

    function setUser(user:IUsers) {
      return {
        type: SET_USER,
        payload: user
      };
    }
  
    const onFinish = (values: IUsers) => {
        changePassword(values)
        .unwrap()
        .then((user) => {
            // Lưu dữ liệu người dùng vào localStorage
            localStorage.setItem('userInfo', JSON.stringify(user));
            localStorage.clear();
            navigate("/signin");
        });
}; return (
    <div className=" flex justify-center">
            <div  className="contaiiiner   ">
      <div className="login-content ">
            <div className="login-formmm">
    <Form
    name="basic"
    className='container mx-auto h-full'
    initialValues={{ remember: true, email: initialEmail }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <h2 className="form-title ml-4">Đổi mật khẩu</h2>
    <Form.Item<FieldType>
      name="email"
      rules={[{ required: true, message: 'Bắt buộc phải nhập Email!' }]}
    >
      <Input  className="input no-border-radius  input-prefix-spacing input-password w-[300px]   ml-[30px]" prefix={<BiLogoGmail />} placeholder="Nhập email của bạn"/>
    </Form.Item>

    <Form.Item<FieldType>
      name="newPassword"
      rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
    >
      <Input.Password  className="input no-border-radius  input-prefix-spacing input-password w-[300px]  ml-[30px]" prefix={<RiLockPasswordFill />} placeholder="Nhập mật khẩu của bạn"/>
    </Form.Item>

    
    
    <Form.Item<FieldType>
            name="confirmPassword"
            rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu mới mà bạn đã nhập không khớp!'));
                  },
                }),
              ]}
          >
            <Input.Password  className="input no-border-radius  input-prefix-spacing input-password w-[300px] ml-[30px]" prefix={<RiLockPasswordFill />} placeholder="Nhập mật khẩu mới của bạn"/>
          </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button  className="mr-[150px]  mt-6 text-[20px] w-[150px] h-[50px]"  type="primary" danger htmlType="submit">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Đổi mật khẩu"
                        )}
                    </Button>
    </Form.Item>
  </Form>
  
  <div className="login-image mr-24">
               <img className="w-[500px] h-[300px] " src="../../../public/img/doimk.jpg" alt="" />
                
                </div>
  </div>
  </div>
  </div>
  </div>
        )
}

export default ChangePassword