import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  AiOutlineUserAdd,
  AiFillHome,
  AiFillPhone,
  AiOutlineMail,
  AiFillCaretRight,
} from "react-icons/ai";
import { useEffect } from "react";
import { useGetProductsQuery } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllBlogQuery } from "@/Api/Blog";
import { IBlog } from "@/interface/Blog";
import {
  BsAlarm,
  BsFacebook,
  BsGithub,
  BsYoutube,
  BsInstagram,
  BsPinAngleFill,
} from "react-icons/bs";
import { Spin } from "antd";
import { sign } from "jsonwebtoken";
import { UserOutlined } from "@ant-design/icons";
import Dropdown from "../../style/dropdown.css";

type UserType = {
  id: number;
  name: string;
  email: string;
  // ... other properties if any
} | null;
const LayoutlClinet = () => {
  const { data: productData, error, isLoading } = useGetProductsQuery();
  const { data: BlogData } = useGetAllBlogQuery();

  const dataSource = BlogData?.map((Blog: IBlog) => ({
    key: Blog._id,
    name: Blog.name,
    img: Blog.img,
    description: Blog.description,
  }));

  console.log("ở đây", productData, dataSource);
  const [searchTerm, setSearchTerm] = useState("");
  const [delayedSearchTerm, setDelayedSearchTerm] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (timer) clearTimeout(timer);

    setShowLoading(true); // Hiển thị biểu tượng loading

    const newTimer = setTimeout(() => {
      setDelayedSearchTerm(searchTerm);
      setShowLoading(false); // Ẩn biểu tượng loading sau 1,5 giây
    }, 1500);

    setTimer(newTimer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchTerm]);
  const headerClass = "bg-emerald-50";
  const [userInfo, setUserInfo] = useState<UserType>(null);
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const header = document.querySelector(".fixed");
    // productData.data.map((product: IProduct) )

    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          // Kiểm tra xem lớp đã được áp dụng chưa
          const hasClass = header.classList.contains(headerClass);
          if (!hasClass) {
            header.classList.add(headerClass);
          }
        } else {
          header.classList.remove(headerClass);
        }
      };

      // Gọi handleScroll ngay khi effect được gắn kết
      handleScroll();

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [headerClass]);
  return (
    <>
      {/* <!-- HEADER --> */}
      <header
        className={`mx-auto flex justify-between items-center py-6 px-20 mb-4 mt-0 transition-all w-full z-50 fixed ${headerClass}  `}
      >
        <div className="flex items-center w-[100px] ">
          <img src="../../../public/img/logo.png" alt="" />
          
        </div>
        <nav className="text-lg text-[#0B7077] font-bold  ">
          <ul className="flex space-x-12">
            <li className="relative group">
              <a href="/" className=" group-hover:text-[#FD661F]">
                Trang chủ
              </a>
            </li>
            <li className="relative group">
              <a href="/khoahoc" className="group-hover:text-[#FD661F]">
                Khóa học
              </a>
              <ul className="absolute mt-2 py-2 bg-white text-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li>
                  <a href="#" className="block px-4 py-2">
                    sanpham1
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2">
                    sanpham2
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2">
                    sanpham3
                  </a>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <a href="#" className=" group-hover:text-[#FD661F]">
                Dịch vụ
              </a>
            </li>
            <li className="relative group">
              <a href="/contact" className=" group-hover:text-[#FD661F]">
                Liên hệ
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              className="text-white w-[200px] rounded-full border border-[#0B7077] hover:border-red-500 text-sm"
              placeholder="Search khóa học và blog"
              prefix={
                showLoading ? (
                  <Spin />
                ) : (
                  <SearchOutlined className="text-[18px]  mr-2 text-gray-500 " />
                )
              }
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />

            <div className="absolute bg-white mt-2 w-full rounded-lg z-10 ">
              {/* Hiển thị kết quả tìm kiếm của blog */}
              {delayedSearchTerm &&
                dataSource &&
                dataSource.filter((val: any) =>
                  val.name
                    .toLowerCase()
                    .includes(delayedSearchTerm.toLowerCase())
                ).length > 0 && (
                  <>
                    <p className="text-xl ml-2">Blog</p>
                    {dataSource
                      ?.filter((val: any) => {
                        if (
                          val.name
                            .toLowerCase()
                            .includes(delayedSearchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((item: any) => (
                        <div
                          key={item.key}
                          className="bg-white rounded-lg hover:border hover:shadow-md overflow-hidden  hover:scale-105 transition ease-out duration-500 "
                        >
                          <div
                            key={item._id}
                            className="border-none rounded-lg"
                          >
                            <Link to={`/blogDetail/${item.key}`} className=" ">
                              <div className="p-2 flex ">
                                <img
                                  className="w-[50px] h-[50px] rounded-full"
                                  src={item.img}
                                  alt=""
                                />
                                <h2 className="text-base   text-center  ml-2">
                                  {item.name}
                                </h2>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </>
                )}

              {/* Hiển thị kết quả tìm kiếm của sản phẩm */}
              {delayedSearchTerm &&
                productData &&
                productData.data.filter((val) =>
                  val.name
                    .toLowerCase()
                    .includes(delayedSearchTerm.toLowerCase())
                ).length > 0 && (
                  <>
                    <p className="text-xl ml-2">Sản phẩm</p>
                    {productData.data
                      .filter((val) => {
                        if (
                          val.name
                            .toLowerCase()
                            .includes(delayedSearchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((product: IProduct) => (
                        <div
                          key={product._id}
                          className="bg-white rounded-lg hover:border hover:shadow-md overflow-hidden  hover:scale-105 transition ease-out duration-500"
                        >
                          <Link to={`/detail/${product._id}`} className=" ">
                            <div className="p-2 flex ">
                              <img
                                className="w-[50px] h-[50px] rounded-full"
                                src={product.img}
                                alt=""
                              />
                              <h2 className="text-base text-center  ml-2">
                                {product.name}
                              </h2>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </>
                )}

              {/* Thông báo khi không tìm thấy kết quả */}
              {delayedSearchTerm &&
                dataSource &&
                productData &&
                dataSource.filter((val: any) =>
                  val.name
                    .toLowerCase()
                    .includes(delayedSearchTerm.toLowerCase())
                ).length === 0 &&
                productData.data.filter((val) =>
                  val.name
                    .toLowerCase()
                    .includes(delayedSearchTerm.toLowerCase())
                ).length === 0 && (
                  <p className=" p-4">
                    Không tìm thấy kết quả cho từ khóa bạn tìm.
                  </p>
                )}
            </div>
          </div>

          {userInfo ? (
            <>
           <div 
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <div className="text-center">
        <UserOutlined style={{ fontSize: '32px', marginRight: '10px' }} />
      </div>
      {isMenuOpen && (
        <div className="border rounded-xl"  style={{ position: 'absolute', backgroundColor: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <Link to="#"> <div className="hover:bg-[#0B7077] hover:text-white  rounded-xl" style={{ padding: '10px 20px' }}>Profile</div></Link>
          <Link to="#"> <div className="hover:bg-[#0B7077]  hover:text-white   rounded-xl"  style={{ padding: '10px 20px' }}>Logout</div></Link>
        </div>
      )}
      <span>{userInfo.userData.name}</span>
    </div>
            </>
          ) : (
            <>
              <Link to="signin">
                <button className="bg-white text-[#0B7077] px-4 py-2 rounded-[10px] hover:bg-[#FD661F] hover:text-white">
                  Đăng nhập
                </button>
              </Link>
              <Link to="signup">
                <button className="bg-[#0B7077] text-white px-4 py-2 rounded-[10px] hover:bg-[#FD661F] hover:text-white">
                  Đăng Ký
                </button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* =========================== */}
      <Outlet />
      {/* =========================== */}

      {/* <!-- FOOTEER --> */}
      <footer className="relative text-white h-[330px]  bg-cover bg-center bg-[#D2E6E4] ">
        <div className="absolute inset-0 flex mt-14 justify-center w-[100%] ">
          <div className=" flex space-x-40 text-[#0B7077]">
            <div className="">
              <p className="text-xl font-bold">Thông tin liên hệ</p>
              <p className="text-[15px] mt-4 flex ">
                <AiFillHome className="mt-1 text-[14px] mr-1 text-[#0B7077]" />
                Address: Số 1 Phố Trịnh Văn Bô - Nam Từ Liêm - Hà Nội{" "}
              </p>
              <p className="flex">
                <AiOutlineMail className="mt-2 text-[13px] mr-1 text-[#0B7077]" />{" "}
                Email: son01679580054@gmail.com
              </p>
              <p className="flex">
                <AiFillPhone className="mt-1 text-[15px] mr-1 text-[#0B7077]" />
                Hotline: 1800000
              </p>
              <p className="text-xl mt-2 font-bold">Đăng ký để nhận thông tin mới nhất</p>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="submit"
                  className="mt-2 bg-[#0B7077] hover:bg-yellow-500 text-white py-2 px-4 rounded-full"
                >
                  Đăng ký
                </button>
              </form>
            </div>

            <div className="">
              <p className="text-xl font-bold">Liên kết nhanh</p>
              <p className="mt-4 flex ">
                <a href="/" className="flex">
                  <BsPinAngleFill className="mt-1.5 text-[14px] mr-1 text-[#0B7077]" />
                  Trang chủ
                </a>
              </p>
              <p className="flex ">
                <a href="/khoahoc" className="flex">
                  <BsPinAngleFill className="mt-1.5 text-[14px] mr-1 text-[#0B7077]" />
                  Khóa học
                </a>
              </p>
              <p className="flex">
                <a href="#" className="flex">
                  <BsPinAngleFill className="mt-1.5 text-[14px] mr-1 text-[#0B7077]" />
                  Dịch vụ
                </a>
              </p>
              <p className="flex">
                <a href="/contact" className="flex">
                  <BsPinAngleFill className="mt-1.5 text-[14px] mr-1 text-[#0B7077]" />
                  Liên hệ
                </a>
              </p>
            </div>
            <div className="">
              <p className="text-xl font-bold">Theo dõi chúng tôi</p>
              <p className="mt-4">
                <a href="https://www.facebook.com/photo.php?fbid=546379440492747&set=pb.100053620882304.-2207520000&type=3" className="flex ">
                  <BsFacebook className="mt-1.5 text-[14px] mr-1 text-[#0B7077]" />
                  Facebook
                </a>
              </p>
              <p>
                <a href="" className="flex">
                  <BsGithub className="mt-1.5 text-[14px] mr-1 text-[#0B7077]" />
                  Github
                </a>
              </p>
              <p>
                <a href="" className="flex">
                  <BsYoutube className="mt-2 text-[14px] mr-1 text-[#0B7077]" />
                  Youtobe
                </a>
              </p>
              <p>
                <a href="" className="flex">
                  <BsInstagram className="mt-1.5 text-[14px] mr-1 text-[#0B7077]" />
                  Instagram
                </a>
              </p>
            </div>
            <div className="">
              <p className="text-xl font-bold">Phương thức thanh toán</p>
              <p>Thanh toán qua Momo, Zalopay</p>
              <div className="flex mt-2 mb-2">
                <img
                  className="w-10 mr-4"
                  src="../../../public/img/momo.png"
                  alt=""
                />
                <img
                  className="w-10"
                  src="../../../public/img/zalopay.png"
                  alt=""
                />
              </div>
              <p>Thanh toán qua ngân hàng nội địa</p>
              <div className="flex mt-2">
                <img
                  className="w-20 h-10 mt-2 mr-2"
                  src="../../../public/img/vcb.png"
                  alt=""
                />
                <img
                  className="w-20 h-10 mt-2 mr-2"
                  src="../../../public/img/mb.png"
                  alt=""
                />
                <img
                  className="w-20 h-10 "
                  src="../../../public/img/vietin.png"
                  alt=""
                />
              </div>
              <div className="flex">
                <img
                  className="w-20 mr-2"
                  src="../../../public/img/tech.png"
                  alt=""
                />
                <img
                  className="w-20 h-4 mt-6 mr-2"
                  src="../../../public/img/agr.png"
                  alt=""
                />
                <img
                  className="w-20 h-4 mt-5 mr-2"
                  src="../../../public/img/bidv.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <img
          src="../../../public/img/anh2.svg"
          alt=""
          className="absolute bottom-0 right-0"
        />
        <div className="text-center  text-[#0B7077] absolute inset-x-0 bottom-0  mb-4">
          &copy; Strong Code "Code của tôi - Học là do bạn!".
        </div>
      </footer>
    </>
  );
};

export default LayoutlClinet;
