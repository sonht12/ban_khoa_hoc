import { useGetProductsQuery } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Link } from "react-router-dom";
import { useState } from "react";

const ListKhoaHoc = () => {
  const { data: productData, error, isLoading } = useGetProductsQuery();
  const [showFullDescription, setShowFullDescription] = useState(false);

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

    return (
      <section className="content py-[88px] bg-[#D2E6E4] h-[1300px]">
        <div className="mx-auto bg-white px-20 h-[100%] ">
          <div>
            <h1 className="text-3xl font-semibold ">Danh mục</h1>
          </div>
          <div className="flex">
            {/* ====================================== */}
            <div className="grid grid-cols-[250px,1fr] pt-1 ">
              <nav>
                <a
                  className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gradient-to-r from-[#82AAE3]to-blue-700 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gradient-to-r  focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Thiết kế website
                </a>
                <a
                  className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gradient-to-r  focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Marketing
                </a>
                <a
                  className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gradient-to-r  focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Ứng dụng phần mềm
                </a>
                <a
                  className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gradient-to-r  focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  Photoshop
                </a>
                <div className="relative" x-data="{open: false }">
                  <button className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"></button>
                </div>
              </nav>
            </div>
            {/* ========================================= */}
            <div>
              <div className="relative inline-flex">
                <svg
                  className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fillRule="nonzero"
                  />
                </svg>
                <select className=" ml-8  mb-20 border border-gray-300  font-normal text-gray-900 h-10 pl-5 pr-10 bg-gradient-to-r  hover:border-gray-400 focus:outline-none appearance-none">
                  <option>Tất cả</option>
                  <option>Miễn phí</option>
                  <option>Trả phí</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 m-auto mb-8 max-w-7xl">
                {productData.data.map((product: IProduct) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-lg rounded-lg relative group overflow-hidden w-80"
                  >
                    <div className="block relative">
                      <div className="rounded-t-lg overflow-hidden">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-[200px] object-cover rounded-t-lg transform  group-hover:opacity-80 transition-opacity  rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 transition-opacity rounded-lg"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center ">
                        <Link to={`/detail/${product._id}`}>
                          <button className="w-40 h-10 bg-white  opacity-0 group-hover:opacity-100 transition-opacity rounded-full ">
                            Xem khóa học
                          </button>
                        </Link>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-4 ml-4">
                      <a href="/landing/htmlcss/">{product.name}</a>
                    </h3>
                    <div className="flex items-center mt-2">
                      <div className="ml-2 flex gap-4">
                        <div className="text-gray-700 line-through font-bold ml-4 mb-4">
                          {product.price}$
                        </div>
                        <div className="text-red-500 font-bold">
                          {product.price}$
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ====================================== */}
          </div>
        </div>
      </section>
    );
  };

  return <>{renderCourseList()}</>;
};

export default ListKhoaHoc;
