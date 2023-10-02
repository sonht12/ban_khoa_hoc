import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useEffect, useState } from "react";
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
  const headerClass = "bg-emerald-50";
  const [userInfo, setUserInfo] = useState<UserType>(null);
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);
  useEffect(() => {
    const header = document.querySelector(".fixed");

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
          {userInfo ? (
            <>
                <UserOutlined style={{ fontSize: '32px', marginRight: '10px' }} />

              <span>{userInfo.userData.name}</span>

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
      <footer className="relative text-white h-[330px]  bg-cover bg-center bg-[#D2E6E4]  ">
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
