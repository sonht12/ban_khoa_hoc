import { Link } from "react-router-dom"
import userApi, { useLoginMutation } from '@/Api/userApi';
import { IUsers } from "@/interface/user";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons'; // Import icons
import {BiLogoGmail} from "react-icons/bi";
import {RiLockPasswordFill} from "react-icons/ri";
import "./signin.css"
type FieldType = {
    email?: string;
    password?: string;
  };
const Signin = () => {
    const [signin, {isLoading}]= useLoginMutation();
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
        signin(values)
        .unwrap()
        .then((user) => {
            // Lưu dữ liệu người dùng vào localStorage
            localStorage.setItem('userInfo', JSON.stringify(user));
            // Lưu dữ liệu người dùng vào Redux
            dispatch(setUser(user));
            navigate("/");
        });
}; return (
    <div className="  flex justify-center">
      <div  className="contaiiiner   ">
      <div className="login-content ">
            <div className="login-formmm">
    <Form
    name="basic"
    className="register-formmm " id="register-form"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 700 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
   <h2 className="form-title ">Login</h2>
    <Form.Item<FieldType>
      className="form-group"
      name="email"
      rules={[{ required: true, message: 'Bắt buộc phải nhập Email!' }]}
    >
      <Input  className="input no-border-radius  input-prefix-spacing input-password" placeholder="Nhập email của bạn" prefix={<BiLogoGmail />}/>
      
    </Form.Item>

    <Form.Item<FieldType>
      className="form-group"
      name="password"
      rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
    >
      <Input.Password className="input no-border-radius input-prefix-spacing" placeholder="Nhập mật khẩu của bạn" prefix={<RiLockPasswordFill />}/>
    </Form.Item>
    
    <Form.Item >
    <Button type="primary" danger htmlType="submit">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Đăng nhập"
                        )}
                    </Button>
    </Form.Item>

  </Form>

                <div className="login-image">
               <img className="w-[400px] h-[300px] " src="../../../public/img/signin.jpg" alt="" />
                <a href="/signup" className="login-image-link">Tạo tài khoản</a>
                </div>
      </div>
      </div>
      </div>
  </div>

        )
}

export default Signin