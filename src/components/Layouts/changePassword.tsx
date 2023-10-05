import { Link } from "react-router-dom"
import userApi, { useChangePasswordMutation, useLoginMutation } from '@/Api/userApi';
import { IUsers } from "@/interface/user";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from 'react-redux';
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
    <div className="h-screen font-sans bg-cover bg-no-repeat bg-[url('https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-binh-minh.jpg')]">
           <header className="mb-4">
                <h2 className="font-bold text-2xl text-center">Đổi mật khẩu</h2>
            </header>
    <Form
    name="basic"
    className='container mx-auto h-full'
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true, email: initialEmail }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Bắt buộc phải nhập Email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Mật khẩu Mới"
      name="newPassword"
      rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
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
                    if (!value || getFieldValue('newPassword') === value) {
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
                            "Đổi mật khẩu"
                        )}
                    </Button>
    </Form.Item>
  </Form>
  </div>

        )
}

export default ChangePassword