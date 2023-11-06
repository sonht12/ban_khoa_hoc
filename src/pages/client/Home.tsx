import { useGetProductsQuery } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Link } from "react-router-dom";
import { useState, useEffect , useRef} from "react";
import { useGetAllBlogQuery } from "@/Api/Blog";
import { IBlog } from "@/interface/Blog";
import { useNavigate } from 'react-router-dom';
import { RaceBy } from '@uiball/loaders'
import { Empty } from 'antd';
import SLider1 from '../../../public/img/htmlcss.jpg'
import SLider2 from '../../../public/img/js.jpg'
import SLider3 from '../../../public/img/nodejs.png'
import SLider4 from '../../../public/img/reactjs.jpg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {MdNavigateNext ,MdNavigateBefore} from 'react-icons/md'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const List_khoa_hoc = () => {
  const { data: productData, error, isLoading: productIsLoading } = useGetProductsQuery();
  const [showFullDescription, setShowFullDescription] = useState(false); // Đặt showFullDescription ở đây
  const { data: BlogData } = useGetAllBlogQuery();
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
  };
  const customNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const customPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const dataSource = BlogData?.map((Blog: IBlog) => ({
    key: Blog._id,
    name: Blog.name,
    img: Blog.img,
    description: Blog.description,
  }));
  console.log("BlogData:", BlogData);
  const renderCourseList = () => {
    if (isLoading) {
      return <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
      <div className="mt-2 text-black font-medium" style={{ color: '#70dbdb' }}>Loading</div>
    </div>
    }

    if (error) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    if (!productData || !productData.data || productData.data.length === 0) {
      return <p>No courses available</p>;
    }
    const isLoggedIn = !!localStorage.getItem('userInfo');
    const handlePurchase = () => {
      const isLoggedIn = !!localStorage.getItem('userInfo');

      if (!isLoggedIn) {
        // Show a message that user needs to login
        alert('Bạn cần đăng nhập để tiếp tục mua hàng!');
        window.location.href = '/signin';
        return;
      }

      // ... your purchase logic here (if the user is logged in)
    }
    const handleClick = (product: any) => {
      if (product.price === "0" || product.price.toLowerCase() === "Miễn phí") {
        // Use your routing method to navigate to the lesson page
        navigate(`/detail/${product._id}`);
      } else {
        handlePurchase();
        navigate(`/pay/${product._id}`);
      }
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-auto mb-8 max-w-7xl ">
        {productData.data.map((product: IProduct) => (
          <div
            key={product._id}
            className="group bg-white rounded-lg shadow-lg  max-w-[296px]  transition-transform transform hover:scale-95 hover:shadow-xl w-[296px] h-[428px] border border-gray-200"
          >
            <Link to={`/detail/${product._id}`} className=" ">
              <img
                src={product.img}
                alt={product.name}
                className="object-cover object-center  w-full h-[230px] rounded-t-lg"
              />
              <div className="p-2">
                <h2 className="text-xl font-bold mt-4 text-center text-[#0B7077]">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mt-4 ml-2 overflow-hidden whitespace-nowrap">
                  {showFullDescription
                    ? product.description
                    : `${product.description.slice(0, 25)} ...`}
                  {!showFullDescription && (
                    <button
                      className="text-blue-500 text-xs hover:text-sm ml-1 underline"
                      onClick={() => setShowFullDescription(true)}
                    >
                      Xem thêm
                    </button>
                  )}
                </p>
                <div className="flex mt-2 justify-center max-w-[278px]">
                  <div className="flex gap-2 text-base pl-2 font-bold mt-1">
                    <p className="text-[#F05123] text-[15px]">
                      {product.price === "0" ? 'Miễn phí' : `${parseFloat(product.price).toLocaleString('vi-VN',)}đ`}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <button onClick={() => handleClick(product)} className=" bg-[#0B7077] text-white px-4 py-2 rounded-[10px] hover:bg-[#FD661F] hover:text-white w-[102px] mt-2 ml-[34%]">
              Học Ngay
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-[#D2E6E4] h-[560px] border border-gray-300 rounded-b-[50px]">
        <div
          className={`mx-auto flex justify-between items-center py-6 px-20 mb-4 mt-0 bg-transparent transition-all w-[100%] z-50 `}
        ></div>
        <img
          className="mx-auto mt-[-100px]"
          src="../../../public/img/anh1.svg"
          alt=""
        />
        <div className=" space-x-4 max-w-5xl flex justify-between mx-auto  ">
          <div className="">
            <div className="bg-white text-[#0B7077] px-4 w-48 py-1 rounded-[14px] hover:bg-[#FD661F] hover:text-white text-center">
              Never stop learning
            </div>
            <h1 className="text-5xl font-bold text-[#0B7077] max-w-[588px] leading-tight lfilter drop-shadow-2xl mt-2">
              Grow up your skills by online courses with Onlearning
            </h1>

            <div className="bg-[#FD661F] text-white px-4 w-40 py-2  mt-4 rounded-[10px] text-center  ">
              explore path
            </div>
          </div>
          {/* <!-- ================= --> */}
          <div className="">
            <img
              className="absolute top-[142px] left-[50%] "
              src="../../../public/img/image-uM5ZOTW7R-transformed 1.png"
              alt=""
            />
            <img
              className="w-28 left-[73%]"
              src="../../../public/img/ic1.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <main className="container mx-auto p-2">
        <div>
          <h1 className="mt-8 text-center text-[#FD661F] font-extrabold text-[42px] mb-8">
            Popular Courses
          </h1>
        </div>
        {renderCourseList()}

        <h1 className="mt-8 text-center text-[#0B7077] font-extrabold text-[42px] mb-8 ">
          Featured courses
        </h1>
        <div className="relative">
      <Slider {...settings} ref={sliderRef}>
        <div className="slide">
          <img src={SLider1} alt="Image 1" className="w-screen max-h-96" />
        </div>
        <div className="slide">
          <img src={SLider2} alt="Image 2" className="w-screen max-h-96" />
        </div>
        <div className="slide">
          <img src={SLider3} alt="Image 3" className="w-screen max-h-96" />
        </div>
        <div className="slide">
          <img src={SLider4} alt="Image 4" className="w-screen max-h-96" />
        </div>
      </Slider>
      <button onClick={customPrev} className="prev-button"><MdNavigateBefore/></button>
      <button onClick={customNext} className="next-button"><MdNavigateNext/></button>
    </div>
        
        
        <h1 className="mt-8 text-center text-[#252641] font-extrabold text-[46px] mb-8 ">
          Tin tức mới nhất
        </h1>

        <div className="flex items-center justify-between p-4 max-w-7xl m-auto mb-20">
          {/* <!-- Cột hình ảnh --> */}
          <div className="w-1/3">
            <img
              src="../../../public/img/anh3.svg"
              alt="Hình ảnh"
              className="w-full h-auto"
            />
            <button className="bg-[#FD661F] text-white px-4 w-48  py-2 rounded-[4px] hover:bg-[#FD740F] hover:text-white text-center mt-20 ml-24">
              Xem thêm tin tức{" "}
            </button>
          </div>

          {/* <!-- Cột nội dung tin tức --> */}
          <div className="w-1/2 px-3">
            <div className="container mx-auto ">
              {/* <!-- Một danh sách các tin tức --> */}
              <div className="flex flex-col space-y-4 ">
                <div>
                  {isLoading ? (
                    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
                    <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
                    <div className="mt-2 text-black font-medium" style={{ color: '#70dbdb' }}>Loading</div>
                  </div>
                  ) : error ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  ) : (
                    <ul className=" grid grid-cols-1  gap-7 ">
                      {dataSource?.map((item: any) => (
                        <li
                          key={item.key}
                          className="bg-white rounded-lg border shadow-md overflow-hidden hover:shadow-lg hover:shadow-blue-300 hover:scale-105 transition ease-out duration-500 "
                        >
                          <div className="flex items-center bg-green-50 ">
                            <div className=" ">
                              <img
                                className="object-cover rounded object-center  w-72 h-[150px]"
                                src={item.img}
                              />
                            </div>
                            <div className="py-5 w-80 h-36">
                              <h3 className="font-semibold text-xl text-center leading-6 text-gray-700 my-2">

                                {item.name.length > 25 ? `${item.name.slice(0, 25)} ...` : item.name}



                              </h3>


                              <div className="text-center my-10 hover:scale-110 transition">
                                <Link
                                  to={`/blogDetail/${item.key}`}
                                  className="bg-[#FD661F] hover:to-sky-400 hover:bg-[#4E4FEB] font-semibold rounded-full text-white px-8 py-3 text-sm uppercase "
                                >
                                  Xem Chi Tiết
                                </Link>
                              </div>
                              {/* <div className="text-center my-10 hover:scale-110 transition">
                              <Link
                                to={`/pay/${item.key}`}
                                className="bg-[#241468] hover:to-sky-400 hover:bg-[#4E4FEB] font-semibold rounded-full text-white px-8 py-3 text-xl uppercase "
                              >
                                Mua Ngay
                              </Link>
</div> */}
                            </div>
                          </div>

                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* <!-- Tin tức 1 --> */}
                {/* <div className="bg-white shadow-lg rounded-lg p-4 flex border border-gray-300">
                  
                  <img
                    src="../../../public/img/anh4.svg"
                    alt="Hình ảnh tin tức 1"
                    className="w-1/2 h-auto rounded-md mr-4"
                  />
                  <div className="w-1/2">
             
                    <h2 className="text-lg font-bold">Tiêu đề tin tức 1</h2>
                    <p className="text-gray-600">Mô tả ngắn về tin tức 1.</p>
                    <a href="#" className="text-[#0B7077] hover:underline">
                      Đọc thêm
                    </a>
                  </div>
                </div> */}

                {/* <!-- Tin tức 2 --> */}
                {/* <div className="bg-white shadow-lg rounded-lg p-4 flex border border-gray-300">
                  <img
                    src="../../../public/img/anh4.svg"
                    alt="Hình ảnh tin tức 1"
                    className="w-1/2 h-auto rounded-md mr-4"
                  />
                  <div className="w-1/2">
                    <h2 className="text-lg font-bold">Tiêu đề tin tức 2</h2>
                    <p className="text-gray-600">Mô tả ngắn về tin tức 2.</p>
                    <a href="#" className="text-[#0B7077] hover:underline">
                      Đọc thêm
                    </a>
                  </div>
                </div> */}

                {/* <div className="bg-white shadow-lg rounded-lg p-4 flex border border-gray-300">
                  <img
                    src="../../../public/img/anh4.svg"
                    alt="Hình ảnh tin tức 1"
                    className="w-1/2 h-auto rounded-md mr-4"
                  />
                  <div className="w-1/2">
                    <h2 className="text-lg font-bold">Tiêu đề tin tức 3</h2>
                    <p className="text-gray-600">Mô tả ngắn về tin tức 3.</p>
                    <a href="#" className="text-[#0B7077] hover:underline">
                      Đọc thêm
                    </a>
                  </div>
                </div> */}

                {/* <!-- Thêm tin tức khác nếu cần --> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default List_khoa_hoc;