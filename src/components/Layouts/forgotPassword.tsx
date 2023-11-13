import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { BiLogoGmail, BiLockAlt } from 'react-icons/bi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForgotPasswordMutation, useResetPasswordMutation } from '@/Api/userApi';

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [forgotPassword, { isLoading: isSendingOtp }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    if (!otpSent) {
      try {
        // Use the forgotPassword mutation here
        await forgotPassword({ email: values.email }).unwrap();
        notification.success({
          message: 'Thành công',
          description: 'Gửi mã OTP thành công. Vui lòng kiểm tra email của bạn.',
        });
        setOtpSent(true);
      } catch (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Gửi mã OTP thất bại. Vui lòng kiểm tra lại email.',
        });
      }
    } else {
      try {
        // Use the resetPassword mutation here
        await resetPassword({
          email: values.email,
          otp: values.otp,
          newPassword: values.newPassword,
        }).unwrap();
        notification.success({
          message: 'Thành công',
          description: 'Mật khẩu của bạn đã được đặt lại.',
        });
        navigate('/signin');
      } catch (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Có lỗi xảy ra. Vui lòng thử lại.',
        });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="  flex justify-center">
      <div  className="contaiiiner   ">
      <div className="login-content ">
            <div className="login-formmm">
           
    <Form
      form={form}
      name="forgot_password_form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
       <h2 className="form-title mr-10">Quên Mật khẩu</h2>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Bắt buộc phải nhập Email!' }]}
      >
        <Input
          placeholder="Nhập email của bạn"
          prefix={<BiLogoGmail />}
          disabled={isSubmitting || otpSent}
        />
      </Form.Item>
      {otpSent && (
        <>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
          >
            <Input placeholder="Nhập mã OTP" disabled={isSubmitting} />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              prefix={<BiLockAlt />}
              disabled={isSubmitting}
            />
          </Form.Item>
        </>
      )}
      <Form.Item>
        <Button danger type="primary" htmlType="submit" loading={isSubmitting}>
          {otpSent ? 'Đổi mật khẩu' : 'Lấy mã'}
        </Button>
      </Form.Item>
    </Form>
    <div className="login-image">
               <img className="w-[400px] h-[300px] " src="../../../public/img/signin.jpg" alt="" />
                <a href="/signup" className="login-image-link text-[18px]">Tạo tài khoản</a>
                </div>
      </div>
      </div>
      </div>
  </div>
  );
};

export default ForgotPassword;