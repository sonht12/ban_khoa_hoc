import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useEffect } from "react";
import { useGetProductsQuery } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { useState } from "react";
import {  Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetAllBlogQuery } from "@/Api/Blog";
import { IBlog } from "@/interface/Blog";
import { BsAlarm } from "react-icons/bs";
import { Spin } from 'antd';
// import {Testinput} from "./Testinput";
const LayoutlClinet = () => {
  const { data: productData, error, isLoading } = useGetProductsQuery();
  const { data: BlogData } = useGetAllBlogQuery();

  const dataSource = BlogData?.map((Blog: IBlog) => ({
    key: Blog._id,
    name: Blog.name,
    img: Blog.img,
    description: Blog.description,
  }));
  
  console.log("ở đây",productData,dataSource)
  const [searchTerm, setSearchTerm] = useState("");
  const [delayedSearchTerm, setDelayedSearchTerm] = useState("");
const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
const [showLoading, setShowLoading] = useState(false);
useEffect(() => {
  if (timer) clearTimeout(timer);

  setShowLoading(true);  // Hiển thị biểu tượng loading

  const newTimer = setTimeout(() => {
    setDelayedSearchTerm(searchTerm);
    setShowLoading(false);  // Ẩn biểu tượng loading sau 1,5 giây
  }, 1500);

  setTimer(newTimer);

  return () => {
    if (timer) clearTimeout(timer);
  };
}, [searchTerm]);
  const headerClass = "bg-emerald-50";
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
        <div className="flex items-center">
          <img src="../../../public/img/logo.svg" alt="" />
          <h1 className="text-[#0B7077] text-2xl italic font-bold">
            hello, world
          </h1>
        </div>
        <nav className="text-lg text-[#252641] font-bold  ">
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
      showLoading ? 
        <Spin /> : 
        <SearchOutlined className="text-[18px]  mr-2 text-gray-500 "/>
    }
    onChange={(event) => {
      setSearchTerm(event.target.value);
    }}
  />

<div className="absolute bg-white mt-2 w-full rounded-lg z-10 ">
    {/* Hiển thị kết quả tìm kiếm của blog */}
    {delayedSearchTerm && dataSource && dataSource.filter((val:any) => val.name.toLowerCase().includes(delayedSearchTerm.toLowerCase())).length > 0 && (
      <>
        <p className="text-xl ml-2">Blog</p>
        {dataSource?.filter((val:any) => {
          if(val.name.toLowerCase().includes(delayedSearchTerm.toLowerCase())){
            return val;
          }
        }).map((item: any) => (
            <div key={item.key} className="bg-white rounded-lg hover:border hover:shadow-md overflow-hidden  hover:scale-105 transition ease-out duration-500 ">
            <div key={item._id} className="border-none rounded-lg">
              <Link to={`/blogDetail/${item.key}`} className=" ">
                <div className="p-2 flex ">
                  <img className="w-[50px] h-[50px] rounded-full" src={item.img} alt="" />
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
    {delayedSearchTerm && productData && productData.data.filter((val) => val.name.toLowerCase().includes(delayedSearchTerm.toLowerCase())).length > 0 && (
      <>
        <p className="text-xl ml-2">Sản phẩm</p>
        {productData.data.filter((val) => {
          if(val.name.toLowerCase().includes(delayedSearchTerm.toLowerCase())){
            return val;
          }
        }).map((product: IProduct) => (
            <div key={product._id} className="bg-white rounded-lg hover:border hover:shadow-md overflow-hidden  hover:scale-105 transition ease-out duration-500">
            <Link to={`/detail/${product._id}`} className=" ">
              <div className="p-2 flex ">
                <img className="w-[50px] h-[50px] rounded-full" src={product.img} alt="" />
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
    {delayedSearchTerm && dataSource && productData && dataSource.filter((val:any) => val.name.toLowerCase().includes(delayedSearchTerm.toLowerCase())).length === 0 && productData.data.filter((val) => val.name.toLowerCase().includes(delayedSearchTerm.toLowerCase())).length === 0 && (
      <p className=" p-4">Không tìm thấy kết quả cho từ khóa bạn tìm.</p>
    )}
</div>

</div>





          <Link to="signin">
            <button className="bg-white text-[#0B7077] px-4 py-2 rounded-[10px] hover:bg-[#FD661F] hover:text-white">
              LOG IN
            </button>
          </Link>
          <button className="bg-[#0B7077] text-white px-4 py-2 rounded-[10px] hover:bg-[#FD661F] hover:text-white">
            SIGN UP
          </button>
        </div>
      </header>

      {/* =========================== */}
      <Outlet />
      {/* =========================== */}

      {/* <!-- FOOTEER --> */}
      <footer className="relative text-white h-[330px]  bg-cover bg-center bg-[#D2E6E4] ">
        <div className="absolute inset-0 flex mt-[5%] justify-center w-[100%] ">
          <div className=" flex space-x-60 text-[#0B7077]">
            <div className="">
              <p className="text-xl font-bold">Thông tin 1</p>
              <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
            </div>
            <div className=" mt-4">
              <p className="text-xl font-bold">Thông tin 2</p>
              <p>Email: example@example.com</p>
            </div>
            <div className=" mt-4">
              <p className="text-xl font-bold">Thông tin 3</p>
              <p>Điện thoại: 123-456-7890</p>
            </div>
          </div>
        </div>
        <img
          src="../../../public/img/anh2.svg"
          alt=""
          className="absolute bottom-0 right-0"
        />
      </footer>
    </>
  );
};

export default LayoutlClinet;
