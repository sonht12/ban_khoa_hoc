import React, { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "@/Api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillCode, AiFillDatabase, AiFillClockCircle, AiOutlineAntCloud, AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { useAddCourseprogressMutation, useCheckCourseAndReturnMessageQuery } from "@/Api/CourseProgress";
import { useGetOneUserQuery } from "@/Api/userApi";

const ProductDetail = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const idUser = userInfo.userData?._id||"" ;
 
  
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData, isLoading, isError } = useGetProductByIdQuery(idProduct || "");
  const navigate = useNavigate();
  const [addCourseProgress] = useAddCourseprogressMutation();
  
  const { data: check } = useCheckCourseAndReturnMessageQuery({
    productId: idProduct,
    userId: idUser,
  });

  const [courseStatusData, setCourseStatusData] = useState("");

  useEffect(() => {
    setCourseStatusData(check?.message);
  }, [check?.message]);

  // Sử dụng useEffect để gọi lại kiểm tra khi trang được tải lại
  useEffect(() => {
  }, []);
  const handleStartCourse = () => {
    const idOfLesson0 = productData?.data?.lessons[0]?._id;
    navigate(`/video/${productData?.data._id}/lesson/${idOfLesson0}/${idUser}`);
  };

  const onFinish = async () => {
    if (!idUser) {
      alert('Bạn phải đăng nhập tài khoản để đăng ký khóa học');
      navigate('/signin');
    } else {
      const courseData = {
        productId: idProduct,
        userId: idUser,
      };
      if (courseStatusData === 'Khóa học đã được đăng ký') {
        handleStartCourse();
      } else {
        try {
          await addCourseProgress(courseData);
          handleStartCourse();
        } catch (error) {
          console.error('Đăng ký khóa học thất bại:', error);
        }
      }
    }
  };

  const renderActionButton = () => {
    if (courseStatusData === 'Khóa học đã được đăng ký') {
      return (
        <button
          className="bg-[#FD661F] text-white ml-16 mt-4 px-4 w-48 py-2 rounded-full hover:bg-white border-2 border-[#FD661F] hover:border-solid hover:border-2 hover:border-[#FD661F] hover:text-[#FD661F] text-center font-bold"
          onClick={handleStartCourse}
        >
          HỌC NGAY
        </button>
      );
    } else {
      return (
        <button
          className="bg-[#FD661F] text-white ml-16 mt-4 px-4 w-48 py-2 rounded-full hover:bg-white border-2 border-[#FD661F] hover:border-solid hover:border-2 hover:border-[#FD661F] hover:text-[#FD661F] text-center font-bold"
          onClick={onFinish}
        >
          ĐĂNG KÝ HỌC
        </button>
      );
    }
  };
  console.log("ow day");
  
  console.log(productData?.data.paymentContent);

  return (
    <div className="flex justify-center pt-[88px] bg-white relative">
      <div className="bg-[#D2E6E4] h-[106px] w-full absolute top-0 "></div>
      <div className=" bg-white mb-20 pl-10">
        <div className="flex gap-4 w-full max-w-[1000] pt-20  ">
          <div className=" bg-white p-8 w-[1000px]">
            <h1 className="text-3xl font-bold mb-4">{productData?.data.name}</h1>
            <p>{productData?.data.description}</p>
            <div className="">
              <h1 className="text-xl font-bold mb-4 mt-8">
                Bạn sẽ học được gì?
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="my-4">
                    <li className="flex items-center space-x-2">
                      <AiOutlineCheck className="text-[#FD661F]" />
                      <span>Các kiến thức cơ bản, nền móng của ngành IT</span>
                    </li>
                    <li className="flex items-center space-x-2 mt-4">
                      <AiOutlineCheck className="text-[#FD661F]" />
                      <span>
                        Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="my-4">
                    <li className="flex items-center space-x-2">
                      <AiOutlineCheck className="text-[#FD661F]" />
                      <span>
                        Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng
                      </span>
                    </li>
                    <li className="flex items-center space-x-2 mt-4">
                      <AiOutlineCheck className="text-[#FD661F]" />
                      <span>
                        Hiểu hơn về cách internet và máy vi tính hoạt động
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4 mt-8">Nội dung khóa học</h1>

            <div className="flex justify-between">
              <ul className="flex space-x-2">
                <li className="font-bold">4 chương</li>
                <li className="CurriculumOfCourse_dot__lIoF-">•</li>
                <li className="font-bold">11 bài học</li>
                <li className="CurriculumOfCourse_dot__lIoF-">•</li>
                <li>
                  <span>
                    Thời lượng <strong>03 giờ 25 phút</strong>
                  </span>
                </li>
              </ul>
              <div className="text-[#FD661F] font-medium">Mở rộng tất cả</div>
            </div>

            <div className="p-2">
              <div className="flex justify-between items-center bg-gray-100 p-4 border border-gray-200 rounded">
                <span className="flex items-center gap-3">
                  <AiOutlinePlus className="text-[#FD661F]" />
                  <p className="font-medium">1. Khái niệm kỹ thuật cần biết</p>
                </span>
                <span className="text-sm">2 bài học</span>
              </div>
            </div>

            <div className="p-2">
              <div className="flex justify-between items-center bg-gray-100 p-4 border border-gray-200 rounded">
                <span className="flex items-center gap-3">
                  <AiOutlinePlus className="text-[#FD661F]" />
                  <p className="font-medium">1. Khái niệm kỹ thuật cần biết</p>
                </span>
                <span className="text-sm">2 bài học</span>
              </div>
            </div>

            <div className="p-2">
              <div className="flex justify-between items-center bg-gray-100 p-4 border border-gray-200 rounded">
                <span className="flex items-center gap-3">
                  <AiOutlinePlus className="text-[#FD661F]" />
                  <p className="font-medium">1. Khái niệm kỹ thuật cần biết</p>
                </span>
                <span className="text-sm">2 bài học</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="bg-white shadow-lg rounded-lg relative group overflow-hidden w-80">
              <div className="block relative">
                <div className="rounded-t-lg overflow-hidden">
                  <img
                    src={productData?.data.img}
                    alt={productData?.data.name}
                    className="w-full h-[200px] object-cover rounded-t-lg transform group-hover:opacity-80 transition-opacity rounded-lg"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 transition-opacity rounded-lg"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <button className="w-40 h-10 bg-white  opacity-0 group-hover:opacity-100 transition-opacity rounded-full ">
                  Tìm hiểu khóa học
                </button>

                </div>
              </div>
              {renderActionButton()}
              <h1 className="text-center mt-4 text-2xl font-medium text-[#FD661F] ">
                Miễn phí
              </h1>

              <ul className="flex flex-col space-y-4 mt-4 ml-14">
                <li className="flex items-center space-x-2">
                  <AiFillCode />
                  <span>Trình độ cơ bản</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AiFillDatabase />
                  <span>
                    Tổng số <strong>11</strong> bài học
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <AiFillClockCircle />
                  <span>
                    Thời lượng <strong>03 giờ 25 phút</strong>
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <AiOutlineAntCloud />
                  <span>Học mọi lúc, mọi nơi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
