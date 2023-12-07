import React, { useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineWechat,
  AiOutlineCheckCircle,
  AiFillFileText,
} from "react-icons/ai";
import { GiTeacher } from "react-icons/gi";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { CiRepeat } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useGetProductByIdQuery } from "@/Api/productApi";
import { Link } from "react-router-dom";
import { useAddOrderMutation, useUpdateOrderStatusMutation } from "@/Api/order";
import { Button, Drawer } from "antd";
import { useGetOneUserQuery } from "@/Api/userApi";
import useQueryParams from "../customHook";
import axios from "axios";
const Thong_tin_thanhtoan = () => {
  const backgroundStyle = {
    backgroundImage: "url(../../../public/img/bg.png)",
    backgroundSize: "cover", // Đảm bảo hình nền phủ đầy phần tử
    backgroundRepeat: "no-repeat", // Ngăn chặn hình nền lặp lại
    backgroundPosition: "center", // Đặt hình nền ở giữa
  };
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData }: any = useGetProductByIdQuery(idProduct || "");
  const [upadateStatusCode] = useUpdateOrderStatusMutation();
  const [disCount, setDisCount] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);
  const [queryParameters] = useSearchParams();
  const [open, setOpen] = useState(false);
  const vouche: string | null = queryParameters.get("vouche");
  const voucheId: string | null = queryParameters.get("voucheId");
  const done: string | null = queryParameters.get("vnp_ResponseCode");
  console.log(done, "ttt");
  const showDrawer = () => {
    setOpen(true);
  };
  const queryConfig = useQueryParams();
  const onClose = () => {
    setOpen(false);
  };
  const data: any = localStorage.getItem("userInfo");
  const orderId: any = localStorage.getItem("orderId");
  const navigate = useNavigate();
  const checkUser = JSON.parse(data).userData;
  console.log(checkUser);
  const dataPageQuery: string | null = queryParameters.get(
    "vnp_ResponseCode=00"
  );
  const handelCheckVouche = async () => {
    await axios.get(
      `http://localhost:8088/api/voucher/user/${checkUser?._id}/${voucheId}`
    );
  };
  const handelUpdateVouche = async () => {
    await axios.put(`http://localhost:8088/api/voucher/${voucheId}`, {
      isActive: false,
    });
  };
  const [addOrder] = useAddOrderMutation();
  useEffect(() => {
    if (done) {
      axios.put(`http://localhost:8088/api/order/${orderId}`, {
        orderStatus: "Done",
      });
    }
  }, [done, orderId]);
  const { data: dataUSer } = useGetOneUserQuery(checkUser._id);
  const handelPayMentVNPay = async () => {
    await axios
      .post(`http://localhost:8088/api/create-payment-vnpay`, {
        user: checkUser?._id as string,
        name: checkUser?.name,
        od: "done",
        total: vouche
          ? String(productData?.data.price - disCount)
          : productData?.data.price,
        paymentMethodId: "Ví điện tử",
        inforOrderShipping: {
          course: idProduct,
        },
      })
      .then((data) => {
        window.location.href = data.data.url
      });
  };

  const checkPaymen = async () => {


    const data = await addOrder({
      paymentMethod: "Ví điện tử",
      course: idProduct,
      user: checkUser._id,
      orderStatus: !done ? "Chờ xử lý" : "Done",
      payment: {},
      vouche: vouche || "",
      paymentAmount: vouche
        ? String(productData?.data.price - disCount)
        : productData?.data.price,
      bankName: "NCB",
    });
    localStorage.setItem("orderId", data.data.data._id);
    handelCheckVouche();
    handelUpdateVouche();
    return handelPayMentVNPay();
  };
  return (
    <div
      className="h-screen bg-cover bg-no-repeat bg-fixed bg-center"
      style={backgroundStyle}
    >
      <div className=" px-6 py-6 lg:p-24 mx-auto lg:w-[1200px] h-full">
        <Drawer
          width={400}
          title="Áp dụng mã giảm giá"
          placement="right"
          onClose={onClose}
          open={open}
        >
          {dataUSer?.voucher?.map((items: any) => (
            <div key={items?._id}>
              <div className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-md mb-2">
                <p className="p-3 bg-black text-white rounded-md m-3">{items.code}</p>
                <Button
                  onClick={() => {
                    setDisCount(items?.sale);
                    return navigate({
                      search: createSearchParams({
                        vouche: items?.sale,
                        voucheId: items?._id,
                      }).toString(),
                    });
                  }}
                  className="mr-3"
                >
                  <span className="font-bold">Sử dụng</span>
                </Button>
              </div>
            </div>
          ))}
        </Drawer>
        <div className="text-center text-[30px] font-bold mb-10">
          <h1 className="text-white ">Mở khóa toàn bộ khóa học</h1>
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="col-span-8">
            <p className="text-white mb-4">
              Sở hữu khóa học HTML CSS đầy đủ và chi tiết nhất bạn có thể tìm
              thấy trên Internet 🙌
            </p>
            <p className="text-white">
              Có tới{" "}
              <span className="text-[#5ebbff]">
                hàng trăm bài tập thực hành{" "}
              </span>
              sau mỗi bài học và bạn sẽ được{" "}
              <span className="text-[#5ebbff]">làm 8 dự án thực tế</span>
              trong khóa học này. Với{" "}
              <span className="text-[#5ebbff]">1000+ bài học</span>
              (bao gồm video, bài tập, thử thách, flashcards, v.v) sẽ giúp bạn
              nắm kiến thức nền tảng vô cùng chắc chắn.
            </p>
            <div className="bg-[#202425] p-4 rounded-lg mt-6 space-y-4 ">
              <p className="ml-2 text-white ">
                Giá bán:{" "}
                <span className="text-[#52eeee] text-[18px] font-bold ml-10">
                  {vouche ? (
                    Number(productData?.data.price - disCount)
                  ) : (
                    <p>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(productData?.data.price)}
                    </p>
                  )}
                </span>
              </p>
              <p className="ml-2 border-[1px] text-white border-[#333c6d] border-b-0 border-r-0 border-l-0">
                Tổng tiền:{" "}
                <span className="text-[#52eeee] text-[18px] font-bold ml-10">
                  {vouche ? (
                    Number(productData?.data.price - disCount)
                  ) : (
                    <p>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(productData?.data.price)}
                    </p>
                  )}
                </span>
              </p>
            </div>

            <div className="mt-10 space-x-2 flex text-center  ">
              {/* <Link to={`/thanhtoan/${idProduct}`} style={{ width: "100%" }}>
                <button className="bg-gradient-to-b from-[#8951ff] to-[#21a2ff] text-white py-2 px-8 rounded-md font-bold">
                  Thanh toán QR
                </button>
              </Link> */}
              <p
                onClick={() => !isRequesting && checkPaymen()}
                style={{ width: "100%" }}
              >
                <button className="bg-gradient-to-b from-[#8951ff] to-[#21a2ff] text-white py-2 px-6 rounded-md font-bold">
                  Thanh toán Vnpay
                </button>
              </p>
              <p style={{ width: "100%" }}>
                <button
                  onClick={showDrawer}
                  className="bg-gradient-to-b from-[#8951ff] to-[#21a2ff] text-white py-2 px-6 rounded-md font-bold"
                >
                  Sử dụng mã giảm giá
                </button>
              </p>
            </div>
          </div>
          <div className="col-span-4 mt-10 md:mt-0  text-white p-0.5  rounded-lg bg-gradient-to-l from-[#8951ff] to-[#21a2ff]">
            <div className="bg-[#323c4a] p-4 rounded-lg">
              <div className="text-center font-bold text-[20px] ">
                <p className="mb-4">Bạn sẽ nhận được gì?</p>
              </div>
              <div className="space-y-4">
                <p className="flex items-center">
                  <AiOutlineCheck className="mr-1" />
                  Truy cập toàn bộ khóa
                </p>
                <div className="flex items-center">
                  <GiTeacher className="mr-2" />
                  Hơn 604 bài học
                </div>
                <div className="flex items-center">
                  <PiChalkboardTeacherBold className="mr-2" />
                  Hơn 493 bài tập và thử thách
                </div>
                <div className="flex items-center">
                  <AiFillFileText className="mr-2" />
                  Thực hành 8 dự án thực tế
                </div>
                <div className="flex items-center">
                  <AiOutlineWechat className="mr-2" />
                  Kênh hỏi đáp riêng tư
                </div>
                <div className="flex items-center">
                  <AiOutlineCheckCircle className="mr-2" />
                  Đáp án cho mọi thử thách
                </div>
                <div className="flex items-center">
                  <BsStars className="mr-2" />
                  Cập nhật khóa học trong tương lai
                </div>
                <div className="flex items-center">
                  <CiRepeat className="mr-2" />
                  Mua một lần, học mãi mãi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Thong_tin_thanhtoan;