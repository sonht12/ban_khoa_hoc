import {
  useGetProductsQuery,
  useGetProductsByPriceQuery,
  useGetProductsFreeQuery,
} from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useGetAllBlogQuery } from "@/Api/Blog";
import { IBlog } from "@/interface/Blog";
import { RaceBy } from "@uiball/loaders";
import SLider1 from "../../../public/img/slide1.png";
import SLider2 from "../../../public/img/slide2.png";
import SLider3 from "../../../public/img/slide3.png";
import SLider4 from "../../../public/img/slide4.png";
import SLider5 from "../../../public/img/slide5.png";
import { Empty } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import "./index.css";
const List_khoa_hoc = () => {
  // gọi ảnh và name của blog

  const {
    data: productData,
    error,
    isLoading: productIsLoading,
  } = useGetProductsByPriceQuery(); //sản phẩm có giá lớn hơn 0
  const { data: productFree } = useGetProductsFreeQuery(); //sản phẩm có giá = 0

  const [showFullDescription, setShowFullDescription] = useState(false); // Đặt showFullDescription ở đây
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
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
  const customPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const customNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const { data: BlogData } = useGetAllBlogQuery();
  const navigate = useNavigate();
  //sản phẩm có giá lớn hơn 0 {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]); // Danh sách tất cả sản phẩm
  const [visibleProducts, setVisibleProducts] = useState<number>(4); // Số lượng sản phẩm hiển thị ban đầu
  const [visibleNewProducts, setVisibleNewProducts] = useState<IProduct[]>([]); // Danh sách sản phẩm mới
  const [firstLoad, setFirstLoad] = useState<boolean>(true); // Để kiểm soát lần hiển thị đầu tiên

  const handleLoadMore = () => {
    if (allProducts.length > visibleProducts) {
      const newProducts = allProducts.slice(
        visibleProducts,
        visibleProducts + 4
      );

      setVisibleNewProducts(newProducts);
      setVisibleProducts(visibleProducts + 4);
    }
  };
  const handleGoBack = () => {
    if (visibleProducts > 4) {
      const newProducts = allProducts.slice(
        visibleProducts - 8,
        visibleProducts - 4
      );
      setVisibleNewProducts(newProducts);
      setVisibleProducts(visibleProducts - 4);
    }
  };
  //}

  //sản phẩm có giá = 0 {
  const [allProducts1, setAllProducts1] = useState<IProduct[]>([]); // Danh sách tất cả sản phẩm
  const [visibleProducts1, setVisibleProducts1] = useState<number>(4); // Số lượng sản phẩm hiển thị ban đầu
  const [visibleNewProducts1, setVisibleNewProducts1] = useState<IProduct[]>(
    []
  ); // Danh sách sản phẩm mới
  const [firstLoad1, setFirstLoad1] = useState<boolean>(true); // Để kiểm soát lần hiển thị đầu tiên

  const handleLoadMoree = () => {
    if (allProducts1.length > visibleProducts1) {
      const newProducts1 = allProducts1.slice(
        visibleProducts1,
        visibleProducts1 + 4
      );

      setVisibleNewProducts1(newProducts1);
      setVisibleProducts1(visibleProducts1 + 4);
    }
  };
  const handleGoBackk = () => {
    if (visibleProducts1 > 4) {
      const newProducts1 = allProducts1.slice(
        visibleProducts1 - 8,
        visibleProducts1 - 4
      );
      setVisibleNewProducts1(newProducts1);
      setVisibleProducts1(visibleProducts1 - 4);
    }
  };
  //}

  useEffect(() => {
    //lớn hơn 0
    if (productData && productData.data) {
      setAllProducts(productData.data);
      if (firstLoad) {
        const newProducts = productData.data.slice(0, visibleProducts);
        setVisibleNewProducts(newProducts);
        setFirstLoad(false);
      }
    }
    //= 0
    if (productFree && productFree.data) {
      setAllProducts1(productFree.data);
      if (firstLoad1) {
        const newProducts1 = productFree.data.slice(0, visibleProducts1);
        setVisibleNewProducts1(newProducts1);
        setFirstLoad1(false);
      }
    }
  }, [
    productData,
    firstLoad,
    visibleProducts,
    allProducts,
    productFree,
    firstLoad1,
    visibleProducts1,
    allProducts1,
  ]);
  const dataSource = BlogData?.map((Blog: IBlog) => ({
    key: Blog._id,
    name: Blog.name,
    img: Blog.img,
    description: Blog.description,
    imgUser: Blog.imgUser,
    nameUser: Blog.nameUser,
  }));
  console.log("BlogData:", BlogData);
  const renderCourseList = () => {
    // if (isLoading) {

    //   return (
    //     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    //       <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
    //       <div
    //         className="mt-2 text-black font-medium"
    //         style={{ color: "#70dbdb" }}
    //       >
    //         Loading
    //       </div>
    //     </div>
    //   );
    // }

    // if (error) {
    //   return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    // }

    // if (!productData || !productData.data || productData.data.length === 0) {
    //   return <p>No courses available</p>;
    // }
    const isLoggedIn = !!localStorage.getItem("userInfo");
    const handlePurchase = () => {
      const isLoggedIn = !!localStorage.getItem("userInfo");




      if (!isLoggedIn) {
        // Show a message that user needs to login
        alert("Bạn cần đăng nhập để tiếp tục mua hàng!");
        window.location.href = "/signin";
        return;
      }

      // ... your purchase logic here (if the user is logged in)
    };
    const handleClick = (product: any) => {
      if (product.price === "0" || product.price.toLowerCase() === "Miễn phí") {
        // Use your routing method to navigate to the lesson page
        navigate(`/detail/${product._id}`);
      } else {
        handlePurchase();
        navigate(`/pay/${product._id}`);
      }
    };
    return (
      <div>
        <>
          <div>
            <div className="flex justify-between max-w-7xl m-auto items-center  mb-4">
              <h2 className="text-[30px] font-bold">Khóa học Pro</h2>
              <div className="space-x-2 mr-3 pt-3">
                <button className="text-[20px]" onClick={handleGoBack}>
                  <BsFillArrowLeftCircleFill className="text-[25px]" />
                </button>
                <button className="text-[20px]" onClick={handleLoadMore}>
                  <BsFillArrowRightCircleFill className="text-[25px]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 m-auto mb-8 max-w-7xl">
              {visibleNewProducts?.map((product: any) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-lg max-w-[296px] transition-transform transform hover:scale-95 hover:shadow-xl border-gray-200"
                >
                  <Link to={`/detail/${product._id}`} className="">
                    <div className="block relative">
                      <div className="rounded-t-lg overflow-hidden">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full text-[10px] h-[200px] object-cover rounded-t-lg transform group-hover:opacity-80 transition-opacity rounded-lg"
                        />
                        <img src="" alt="" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 transition-opacity rounded-lg"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                        <button className="w-40 h-10 bg-white  opacity-0 group-hover:opacity-100 transition-opacity rounded-full ">
                          Xem khóa học
                        </button>
                      </div>
                    </div>
                    <div className="p-2">
                      <h2 className="text-[20px] font-bold mt-4 text-center text-[#0B7077]">
                        {product.name.length <= 25
                          ? product.name
                          : product.name.slice(0, 25) + " ..."}
                      </h2>
                      <div className="flex mt-2 justify-center max-w-[278px]">
                        <div className="flex gap-2 text-base pl-2 font-bold mt-1">
                          <p className="text-[#F05123] text-[15px]">
                            {product.price === "0"
                              ? "Miễn phí"
                              : `${parseFloat(product.price).toLocaleString(
                                  "vi-VN"
                                )}đ`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
        <>
          <div>
            <div className="flex justify-between max-w-7xl m-auto items-center  mb-4">
              <h2 className="text-[30px] font-bold">Khóa học miễn phí</h2>
              <div className="space-x-2  mr-3 pt-3">
                <button className="text-[20px]" onClick={handleGoBackk}>
                  <BsFillArrowLeftCircleFill className="text-[25px]" />
                </button>
                <button className="text-[20px]" onClick={handleLoadMoree}>
                  <BsFillArrowRightCircleFill className="text-[25px]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-auto mb-8 max-w-7xl">
              {visibleNewProducts1?.map((product: any) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-lg max-w-[296px] transition-transform transform hover:scale-95 hover:shadow-xl border-gray-200"
                >
                  <Link to={`/detail/${product._id}`} className="">
                    <div className="block relative">
                      <div className="rounded-t-lg overflow-hidden">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-[200px] object-cover rounded-t-lg transform group-hover:opacity-80 transition-opacity rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 transition-opacity rounded-lg"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                        <button className="w-40 h-10 bg-white  opacity-0 group-hover:opacity-100 transition-opacity rounded-full ">
                          Xem khóa học
                        </button>
                      </div>
                    </div>
                    <div className="p-2">
                      <h2 className="text-xl font-bold mt-4 text-center text-[#0B7077]">
                        {product.name.length <= 25
                          ? product.name
                          : product.name.slice(0, 25) + " ..."}
                      </h2>
                      <div className="flex mt-2 justify-center max-w-[278px]">
                        <div className="flex gap-2 text-base pl-2 font-bold mt-1">
                          <p className="text-[#F05123] text-[15px]">
                            {product.price === "0"
                              ? "Miễn phí"
                              : `${parseFloat(product.price).toLocaleString(
                                  "vi-VN"
                                )}đ`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      </div>
    );
  };

  return (
    <>
      <div className="bg-[#D2E6E4] w-[100%] h-[560px] border border-gray-300 rounded-b-[50px]">
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
              className="md:justify-center absolute top-[142px] left-[50%] "
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
        {/* <!-- =============== --> */}
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
            <div className="slide">
              <img src={SLider5} alt="Image 5" className="w-screen max-h-96" />
            </div>
          </Slider>
          <button onClick={customPrev} className="prev-button"><MdNavigateBefore /></button>
          <button onClick={customNext} className="next-button"><MdNavigateNext /></button>
        </div>
        <h1 className="mt-8 text-center text-[#252641] font-extrabold text-[46px] mb-8 ">
          Tin tức mới nhất
        </h1>
        <div>
          <div className="flex justify-end max-w-7xl m-auto items-center">
            <div className="space-x-2 mr-3 flex items-center text-orange-600 font-semibold link-container">
              <Link to={`/blog`} className="">
                {" "}
                Xem Tất Cả
              </Link>
              <MdNavigateNext className="icon" />
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-auto mb-8 max-w-7xl ">
            {dataSource?.slice(0, 12).map((product: any) => (
              <div
                key={product.key}
                className="group bg-white rounded-lg max-w-[296px] h-[290px] transition-transform transform hover:scale-95 hover:shadow-xl border-gray-200 mt-3"
              >
                <Link to={`/blogDetail/${product.key}`} className="">
                  <div className="block relative">
                    <div className="rounded-t-lg overflow-hidden ">
                      <img
                        src={product.img}
                        className="w-full text-[10px] h-[200px] object-cover rounded-t-lg transform group-hover:opacity-80 transition-opacity rounded-lg"
                      />
                      <img src="" alt="" />
                      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 transition-opacity rounded-lg"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                      <button className="w-40 h-10 bg-white  opacity-0 group-hover:opacity-100 transition-opacity rounded-full ">
                        Xem Blog
                      </button>
                    </div>

       
                  </div>
                  <div className="pt-1">
                    <h2 className="text-[15px] font-bold mt-2  ">
                      {product.name.length <= 25
                        ? product.name
                        : product.name.slice(0, 40) + " ..."}
                    </h2>
                  </div>
                  <div className="flex gap-2 justify-start items-center mb-6 mt-2">
                    <img
                      src={product.imgUser}
                      alt="User Avatar"
                      className="img-user "
                    />
                    <div>{product.nameUser}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default List_khoa_hoc;
