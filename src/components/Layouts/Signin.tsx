import { Link } from "react-router-dom"
import { useLoginMutation } from '@/Api/userApi';
import { IUsers } from "@/interface/user";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {MailOutlined, LockOutlined} from "@ant-design/icons"
import "./index.css"
type FieldType = {
  email?: string;
  password?: string;
};
const Signin = () => {
  const [signin, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const onFinish = (values: IUsers) => {
    signin(values)
      .unwrap()
      .then(() => navigate("/"));
  }; return (
    <section className="bg-red-500 h-screen bg-cover bg-no-repeat bg-[url('https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-nen-bau-troi-dem-lap-lanh.jpg')]  flex items-center">
      <div className="mx-auto  h-[330px] w-[450px] font-sans rounded-lg bg-opacity-5  bg-cover bg-no-repeat bg-[#FFF0F5] ">

        <div className=" pt-2 pb-4 bg-gray-100 rounded-lg   ">
          <h2 className="font-bold text-4xl text-center text-black -mb-7">Đăng nhập</h2>
          <Form
            name="basic"
            className='container mx-auto h-full'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 17 }}
            style={{ maxWidth: 1000, marginTop:50 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            
          >
            <Form.Item<FieldType>
               style={{ paddingLeft:23, width:600 }}
              name="email"
              
              rules={[{ required: true, message: 'Bắt buộc phải nhập Email!' }]}
            >
              <span className="text-lg font-bold text-red-600">Email</span>
              <Input className="element.style"  style={{height:40}}  placeholder="Nhập Email"
               prefix={<MailOutlined />}
              >

              </Input>
            </Form.Item>

            <Form.Item<FieldType>
               style={{ paddingLeft:23,width:600  }}
              name="password"
              rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
              
            >
              <span className="text-lg font-bold text-red-600">  PassWord</span>
              <Input.Password style={{height:50 }} placeholder="Nhập Password"
                prefix={<LockOutlined />}              
              > 
              
              </Input.Password> 
            </Form.Item>
            <Form.Item  className="mx-auto flex justify-center m-1">
              <Button type="primary" danger  htmlType="submit" className="text-xl h-12">
                {isLoading ? (
                  <AiOutlineLoading3Quarters  className="animate-spin " />
                ) : (
                  "Login"
                )}
              </Button>
              {/* <Link to="/signup">

                <Button type="primary" danger htmlType="submit" className="mx-5">
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Đăng ký "
                  )}
                </Button>
              </Link> */}
            </Form.Item>
            <div className="flex justify-center mt-3 items-center gap-1">
            <Link to="/" className="underline  text-sm ">
              Forgot Password?
            </Link>
            
            <Link to="/signup" className="  text-lg text-pink-500">
              Sigup
            </Link>
            </div>
           

          </Form>
        </div>
      </div>
    </section>

  )
  
}

export default Signin