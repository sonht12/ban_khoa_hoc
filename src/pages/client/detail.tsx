import { useGetProductByIdQuery, useUpdateProductMutation } from "@/Api/productApi"
import { useNavigate, useParams } from "react-router-dom";
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { FaHandHoldingHeart } from 'react-icons/fa';
const Productdetail = () => {
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData } = useGetProductByIdQuery(idProduct || "");
    console.log(productData)

    return (
        <div className="grid grid-cols-6 gap-4 p-8 bg-[#EAFDFC] w-screen mt-7">
            <div className="col-span-6 sm:col-span-4 flex justify-center">
                <div className="relative ">
                    <img
                        src={productData?.data.img}
                        alt=""
                        className="object-cover object-center w-96 h-96  rounded-full border-4 border-gray-300 shadow-md"
                    />
                    <div className="text-center mt-6">
                        <Link
                            to={`/home`}
                            className="bg-gradient-to-r from-sky-400 via-red-500 to-yellow-500 hover:from-red-500 hover:to-sky-400 hover:bg-gradient-to-l hover:via-red-500 font-sans rounded-full text-white px-6 py-3 text-xl"
                        >
                            Xem Video Giới Thiệu
                        </Link>
                    </div>
                    <div className="mt-4 text-4xl text-red-600 flex justify-center">
                        <FaHandHoldingHeart size={80} />
                    </div>
                </div>
            </div>
            <div className="col-span-6 sm:col-span-2 mt-10">
                <h1 className="text-3xl font-semibold ">
                    {productData?.data.name}:
                    <span className="text-2xl font-bold text-red-600 ml-2">{productData?.data.price}</span>
                </h1>
                <p>{productData?.data.description}</p>
                <div className="flex ml-12 grid-cols-3 gap-16 mt-36">
                    <div className="mt-4 text-4xl text-blue-800">
                        <FaFacebook />
                    </div>
                    <div className="mt-4 text-4xl text-purple-600">
                        <FaInstagram />
                    </div>
                    <div className="mt-4 text-4xl text-blue-500">
                        <FaTwitter />
                    </div>
                </div>
            </div>

        </div>
    );

};


export default Productdetail;