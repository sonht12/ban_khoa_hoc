import { useGetProductsQuery } from "@/Api/productApi";

import { useGetCategorysQuery } from "@/Api/categoryApi";
import { IProduct } from "@/interface/products";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Category } from "@/interface/categorys";
import { RaceBy } from '@uiball/loaders'
const ListKhoaHoc = () => {
  const { data: productData, error, isLoading: productIsLoading, } = useGetProductsQuery();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: categoryData } = useGetCategorysQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState<string>("all");
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const renderCourseList = () => {
    if (isLoading) {
      return  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <RaceBy size={100} lineWeight={6} speed={1.4} color="#47d1d1" />
      <div className="mt-2 text-black font-medium" style={{ color: '#70dbdb' }}>Loading</div>
    </div>
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
    // const filteredProducts = productData?.data?.filter(product => {
    //         return selectedCategory ? product.categoryId._id === selectedCategory : true;
    //     });
    const filteredProducts = productData?.data?.filter(product => {
      // Filter by category if it's selected
      const byCategory = selectedCategory ? product.categoryId._id === selectedCategory : true;

      // Filter by price
      if (filterOption === "free") {
        return byCategory && product.price === "0";
      }
      else if (filterOption === "paid") {
        return byCategory && product.price > 0;
      }
      return byCategory;
    });

    return (
      <section className="mr-[10%] content py-[88px] bg-white ">
        <div className="flex flex-col md:flex-row justify-center bg-white px-4 md:px-20 mt-10">
  <div className="bg-[#0B7077] hover:bg-[#FD661F] h-12 md:h-16 w-40 md:w-170 mr-4 md:mr-10 mt-2 md:mt-3 pt-2 md:pt-3 rounded-full">
    <h1 className="text-2xl md:text-3xl font-semibold text-[#fff] ml-2 md:ml-4">Danh mục</h1>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-8">
    {/* ====================================== */}
    <div className="col-span-2 md:col-span-2">
      {categoryData?.data?.map((category) => (
        <button className="rounded-lg text-[#0B7077] font-bold hover:bg-[#D2E6E4] py-2 pl-2 md:pl-3  md:w-200 block text-left" onClick={() => setSelectedCategory(category._id)}>
          {category.name}
        </button>
      ))}
    </div>
    {/* ========================================= */}
    <div className="col-span-10 md:col-span-10">
      <div className="relative inline-flex">
        <svg
          className="w-2 h-2 absolute top-0 right-0 m-4 md:m-8 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          
        </svg>
        <select
          className="mt-4 mb-4 md:mb-20 border border-gray-300 font-normal text-gray-900 h-10 pl-3 md:pl-5 pr-10 bg-gradient-to-r hover:border-gray-400 focus:outline-none appearance-none"
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="free">Miễn phí</option>
          <option value="paid">Trả phí</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-auto mb-8 max-w-screen-xl">
        {filteredProducts?.map((product: IProduct) => (
          <div
            key={product._id}
            className="group bg-white rounded-lg shadow-lg max-w-[296px] transition-transform transform hover:scale-95 hover:shadow-xl w-[296px] h-[428px] border border-gray-200"
          >
            <Link to={`/detail/${product._id}`} className="">
              <img
                src={product.img}
                alt={product.name}
                className="object-cover object-center w-full h-52 md:h-[230px] rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl md:text-2xl font-bold mt-4 text-[#0B7077]">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mt-4 overflow-hidden whitespace-nowrap">
                  {showFullDescription
                    ? product.description
                    : `${product.description.slice(0, 30)} ...`}
                  {!showFullDescription && (
                    <button
                      className="text-blue-500 text-xs hover:text-sm ml-1 underline"
                      onClick={() => setShowFullDescription(true)}
                    >
                      Xem thêm
                    </button>
                  )}
                </p>
                <div className="flex mt-4 justify-between">
                  <div className="flex gap-2 text-base pl-2 font-bold mt-1">
                    <p className="text-[#F05123] text-sm">
                      {product.price === "0" ? 'Miễn phí' : `${parseFloat(product.price).toLocaleString('vi-VN')}đ`}
                    </p>
                  </div>
                  <Link to={`/pay/${product._id}`}>
                    <button onClick={handlePurchase} className="bg-[#0B7077] text-white px-4 py-2 rounded-[10px] hover:bg-[#FD661F] hover:text-white w-28 md:w-36">
                      Học Ngay
                    </button>
                  </Link>
                </div>
              </div>
            </Link>
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