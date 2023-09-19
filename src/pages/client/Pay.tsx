import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/Api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Button, Form, Input, Rate , Select} from "antd";
import { IProduct } from "@/interface/products";
const Pay = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData }:any = useGetProductByIdQuery(idProduct || "");
  console.log(productData);
  const { Option } = Select;
  const vietnameseBanks = [
    "Vietcombank",
    "VietinBank",
    "Agribank",
    "LienVietPostBank",
    "Techcombank",
    "PVcomBank",
    "Sacombank",
    "Saigonbank",
    "HDBank",
    "MBBank",
    "BIDV",
    "SHB",
    "DongA Bank",
    "CB Bank",
    "OceanBank",
    "VIB",
    "Eximbank",
    "OCB",
    "SeABank",
    "NCB",
    "TienPhong Bank",
    "Military Bank",
    "VietABank",
    "VPBank",
    "Dai Tin Bank",
    "HD Bank",
    "SCB",
  ];
  return (
    <div className="  p-8 bg-[#EAFDFC] mt-7">
      <div className="flex">
        <div className="col-span-6 sm:col-span-4 flex justify-center ">
          <div className="bg-white flex justify-center mt-16 w-96 mb-36 rounded  border-4 border-gray-300">
            <div className="relative  -mt-6">
              <img
                src={productData?.data.img}
                alt=""
                className="object-cover object-center w-80 h-72  rounded border-1 border-gray-300 shadow-md mt-12"
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
            <h1 className=" text-2xl ml-7 font-bold text-red-400">
              Form Thanh Toán
            </h1>

            <Form.Item className="mt-5">
              <p className="font-bold">Tên Khóa Học</p>
              <Input
                style={{
                  width: 280,
                }}
                value={productData?.data.name}
                readOnly
              ></Input>
            </Form.Item>
            <Form.Item>
              <p className="font-bold">Giá Sản Phẩm</p>
              <Input
                style={{
                  width: 280,
                }}
                value={productData?.data.price}
                readOnly
              ></Input>
            </Form.Item>
            <Form.Item>
              <p className="font-bold">Nội Dung Thanh Toán</p>
              <Input
                style={{
                  width: 280,
                }}
                value={productData?.data.paymentContent}
                readOnly
              ></Input>
            </Form.Item>
            <Form.Item label="" name="bank">
            <p className="font-bold">Ngân Hàng</p>
        <Select
          style={{ width: 280 }}
          placeholder="Chọn ngân hàng">
          {vietnameseBanks.map((bank) => (
            <Option key={bank} value={bank}>
              {bank}
            </Option>
          ))}
        </Select>
      </Form.Item>
          </Form>

          {/* <div className="flex ml-20 grid-cols-3 gap-16 mt-36">
                    <div className="mt-4 text-4xl text-blue-800">
                        <FaFacebook />
                    </div>
                    <div className="mt-4 text-4xl text-purple-600">
                        <FaInstagram />
                    </div>
                    <div className="mt-4 text-4xl text-blue-500">
                        <FaTwitter />
                    </div>
                </div> */}
        </div>
        <div className="col-span-6 sm:col-span-2 mt-24 ml-20">
          <Form className="ml-10">
            <h1 className=" text-2xl ml-7 font-bold text-red-400">
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
          typeof="submit"
          className=" bg-sky-400 text-white font-bold h-14 w-36 text-lg -ml-3"
        >
          Thanh Toán
        </Button>
      </div>
    </div>
  );
};

export default Pay;
