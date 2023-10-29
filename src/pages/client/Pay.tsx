import {
  useGetProductByIdQuery,
} from "@/Api/productApi";
import { useCreatePaymentMutation } from "@/Api/payment";
import { useNavigate, useParams } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Button, Form, Input, Rate, Select } from "antd";
import { RaceBy } from "@uiball/loaders";
import { useDispatch } from "react-redux";
// Import your Redux action for creating a payment

const Pay = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData, isLoading: productIsLoading, isError }: any = useGetProductByIdQuery(idProduct || "");
  const [createPayment] = useCreatePaymentMutation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [orderDescription, setOrderDescription] = useState('');
  const [orderType, setOrderType] = useState('Cá nhân');

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handlePayment = async () => {
    try {
      const paymentData = {
        amount,
        orderDescription,
        orderType,
      };
  
      setIsLoading(true); // Hiển thị loading indicator
  
      // Gửi dữ liệu thanh toán lên server
      const response = await createPayment(paymentData);
  
      setIsLoading(false); // Ẩn loading indicator
  
      // Xử lý phản hồi từ server
      if (response && response.data && response.data.paymentUrl) {
        console.log('Dữ liệu trả về từ máy chủ:', response.data);
        // Chuyển hướng người dùng tới URL của VNPay
        window.location.href = response.data.paymentUrl;
      } else {
        console.error('Không có URL thanh toán trả về từ máy chủ.');
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
    }
};

  
  
  
  

  return (
    <div className="p-8 bg-[#EAFDFC]">
      <div className="flex">
        <div className="col-span-6 sm:col-span-4 flex justify-center">
          <div className="bg-white flex justify-center mt-16 w-96 mb-36 rounded border-4 border-gray-300">
            <div className="relative -mt-6">
              <img
                src={productData?.data.img}
                alt=""
                className="object-cover object-center w-80 h-72 rounded border-1 border-gray-300 shadow-md mt-12"
              />

              <div className="text-center mt-8">
                <Link
                  to={`/home`}
                  className="bg-gradient-to-r from-sky-400 via-red-500 to-yellow-500 hover:from-red-500 hover:to-sky-400 hover:bg-gradient-to-l hover:via-red-500 font-sans rounded-full text-white px-6 py-3 text-xl"
                >
                  Xem Video Giới Thiệu
                </Link>
              </div>
              <div className="flex justify-center mt-3">
                <Rate allowHalf defaultValue={4.5}></Rate>
              </div>

              <div className="mt-2 text-4xl text-red-600 flex justify-center mb-4">
                <FaHandHoldingHeart size={40} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 sm:col-span-2 mt-24 ml-20">
          <Form className="ml-10">
            <h1 className="text-2xl ml-7 font-bold text-red-400">
              Form Thanh Toán
            </h1>

            <Form.Item className="mt-5">
              <p className="font-bold">Amount</p>
              <Input
                style={{
                  width: 280,
                }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item>
              <p className="font-bold">Order Description</p>
              <Input
                style={{
                  width: 280,
                }}
                value={orderDescription}
                onChange={(e) => setOrderDescription(e.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item label="" name="orderType">
              <p className="font-bold">Order Type</p>
              <Select
                style={{ width: 280 }}
                value={orderType}
                onChange={(value) => setOrderType(value)}
              >
                <Select.Option value="Cá nhân">Cá nhân</Select.Option>
                <Select.Option value="Doanh nghiệp">Doanh nghiệp</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className="col-span-6 sm:col-span-2 mt-24 ml-20">
          <Form className="ml-10">
            <h1 className="text-2xl ml-7 font-bold text-red-400">
              Thông Tin Hóa Đơn Điện Tử
            </h1>

            <Form.Item className="mt-5">
              <p className="font-bold">Tên Khách Hàng</p>
              <Input
                style={{
                  width: 380,
                }}
                readOnly
              ></Input>
            </Form.Item>

            <Form.Item>
              <p className="font-bold">Số Điện Thoại</p>
              <Input
                style={{
                  width: 380,
                }}
                readOnly
              ></Input>
            </Form.Item>
            <Form.Item>
              <p className="font-bold">Email</p>
              <Input
                style={{
                  width: 380,
                }}
                readOnly
              ></Input>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="flex justify-center -mt-48 ml-80">
      <Button
  type="primary" // hoặc bất kỳ giá trị nào phù hợp với thiết kế giao diện của bạn
  className="bg-sky-400 text-white font-bold h-14 w-36 text-lg -ml-3"
  onClick={handlePayment}
>
  Thanh Toán
</Button>

      </div>
    </div>
  );
};

export default Pay;
