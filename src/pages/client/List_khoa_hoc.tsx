import { useGetProductsQuery } from "@/Api/productApi";

 import { useGetCategorysQuery } from "@/Api/categoryApi";
 import { IProduct } from "@/interface/products";
 import { Link, useParams } from "react-router-dom";
 import { useState, useEffect } from "react";
 import { Category } from "@/interface/categorys";
 import { RaceBy } from '@uiball/loaders'
 import { Empty } from 'antd';





const ListKhoaHoc = () => {
  const { data: productData, error, isLoading: productIsLoading } = useGetProductsQuery();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: categoryData } = useGetCategorysQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const renderCourseList = () => {
    if (isLoading) {
      return  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
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
          return byCategory && product.price >0;
      }
      return byCategory;
  });
  
    return (
      <section className="content py-[88px] bg-[#D2E6E4] h-[1300px] mb-[500px]">
        <div className="mx-auto bg-white px-20 h-[100%] ">
          <div className="pt-10 mb-5">
            <h1 className="text-3xl font-semibold ">Danh mục</h1>
          </div>
          <div className="grid grid-cols-12 gap-8">
            {/* ====================================== */}
            <div className="col-span-2 ">
             {categoryData?.data?.map((category) => (
                <button className=" rounded-lg  text-[#0B7077] font-bold hover:bg-[#D2E6E4] py-2 pl-3 w-[200px] block  text-left " onClick={() => setSelectedCategory(category._id)}>
                    {category.name}
                </button>
            ))}
        </div>
            {/* ========================================= */}
            <div className="col-span-10">
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
                <select 
                  className=" mb-20 border border-gray-300 font-normal text-gray-900 h-10 pl-5 pr-10 bg-gradient-to-r hover:border-gray-400 focus:outline-none appearance-none"
                  onChange={(e) => setFilterOption(e.target.value)}
                
                  
              >
                  <option value="all">Tất cả</option>
                  <option value="free">Miễn phí</option>
                  <option value="paid">Trả phí</option>
              </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-auto mb-8 max-w-7xl">
              {filteredProducts?.map((product:IProduct) => (
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
                      <div className="flex mt-4 justify-between px-5 max-w-[278px]">
                      <div className="flex gap-2 text-base pl-2 font-bold mt-1">
<p className="text-red-500">
                            {product.price === "0" ? 'Miễn phí' : `${product.price} VNĐ`}
                        </p>
                    </div>
                        <Link to={`/pay/${product._id}`}>
                          <button onClick={handlePurchase} className="bg-[#0B7077] text-white px-4 py-2 rounded-[10px] hover:bg-[#FD661F] hover:text-white w-[102px]">
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