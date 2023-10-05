import { useGetProductsQuery } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetAllBlogQuery } from "@/Api/Blog";
import { IBlog } from "@/interface/Blog";
const List_khoa_hoc = () => {
  const { data: productData, error, isLoading } = useGetProductsQuery();
  const [showFullDescription, setShowFullDescription] = useState(false); // Đặt showFullDescription ở đây
  const { data: BlogData } = useGetAllBlogQuery();

  const dataSource = BlogData?.map((Blog: IBlog) => ({
    key: Blog._id,
    name: Blog.name,
    img: Blog.img,
    description: Blog.description,
  }));
  console.log("BlogData:", BlogData);
  const renderCourseList = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error</p>;
    }

    if (!productData || !productData.data || productData.data.length === 0) {
      return <p>No courses available</p>;
    }
    const isLoggedIn = !!localStorage.getItem('userToken');
    const handlePurchase = () => {
      const isLoggedIn = !!localStorage.getItem('userToken');

      if (!isLoggedIn) {
        // Show a message that user needs to login
        alert('Bạn cần đăng nhập để tiếp tục mua hàng!');
        window.location.href = '/signin';
        return;
      }

      // ... your purchase logic here (if the user is logged in)
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
                <p className="text-gray-600 text-sm mt-4  overflow-hidden whitespace-nowrap">
                  {showFullDescription
                    ? product.description
                    : `${product.description.slice(0, 50)}...`}
                  {!showFullDescription && (
                    <button
                      className="text-blue-500 ml-1 underline"
                      onClick={() => setShowFullDescription(true)}
                    >
                      Xem thêm
                    </button>
                  )}
                </p>
                <div className="flex mt-4 justify-between max-w-[278px]">
                  <div className="flex gap-2 text-lg font-bold mt-1">
                    <p className="text-gray-500 line-through">
                      ${product.price}
                    </p>
                    <p className="text-red-500">${product.price}</p>
                  </div>
                  <Link to={`/pay/${product._id}`}>
                    <button onClick={handlePurchase} className="bg-[#0B7077] text-white px-4 py-2 rounded-[10px] hover:bg-[#FD661F] hover:text-white w-[102px]">
                      MUA
                    </button>
                  </Link>
                </div>
              </div>
            </Link>
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
        {/* <!-- =============== --> */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[400px] m-auto pl-20 ">
          {/* <!-- Card 1 --> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white shadow-lg rounded-lg w-[520px] h-[220px] border-2 border-solid">
            {/* <!-- Phần hình ảnh --> */}
            <div className="relative bg-gray-200 rounded-l-lg overflow-hidden">
              <img
                src="../../../public/img/anhcobokhoahoc.svg"
                alt="Khóa học"
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 right-2 p-2 bg-white text-center text-lg font-bold flex rounded-full gap-2">
                <p className="text-red-500 ">$80</p>
                <p className="text-gray-500 line-through">$100</p>
              </div>
            </div>

            {/* <!-- Phần thông tin --> */}
            <div className="bg-white p-4 rounded-r-lg">
              <h2 className="text-2xl font-bold">Tên khóa học</h2>
              <p className="text-gray-600">Mô tả ngắn về khóa học.</p>
              <p className="text-gray-600">Ngày tháng: 12/09/2023</p>
              <button className="bg-[#0B7077] text-white px-4 py-2 rounded-[10px] self-end hover:bg-[#FD661F] hover:text-white w-[102px] mt-10">
                MUA
              </button>
            </div>
          </div>

          {/* <!-- Card 2 --> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white shadow-lg rounded-lg w-[520px] h-[220px] border-2 border-solid">
            {/* <!-- Phần hình ảnh --> */}
            <div className="relative bg-gray-200 rounded-l-lg overflow-hidden">
              <img
                src="../../../public/img/anhcobokhoahoc.svg"
                alt="Khóa học"
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 right-2 p-2 bg-white text-center text-lg font-bold flex rounded-full gap-2">
                <p className="text-red-500 ">$80</p>
                <p className="text-gray-500 line-through">$100</p>
              </div>
            </div>

            {/* <!-- Phần thông tin --> */}
            <div className="bg-white p-4 rounded-r-lg">
              <h2 className="text-2xl font-bold">Tên khóa học</h2>
              <p className="text-gray-600">Mô tả ngắn về khóa học.</p>
              <p className="text-gray-600">Ngày tháng: 12/09/2023</p>
              <button className="bg-[#0B7077] text-white px-4 py-2 rounded-[10px] self-end hover:bg-[#FD661F] hover:text-white w-[102px] mt-10">
                MUA
              </button>
              
            </div>
          </div>
          {/* <!-- ================== --> */}
        </div>
        <h1 className="mt-8 text-center text-[#252641] font-extrabold text-[46px] mb-8 ">
          Blog new
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
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error fetching data</p>
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
                              {item.name}
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
