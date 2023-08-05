import { Link } from "react-router-dom"
const Signin = () => {
    return (
        <>
            <div
                className="h-screen font-sans bg-cover bg-no-repeat bg-[url('https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-binh-minh.jpg')]">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form className="max-w-sm m-4 p-10 bg-white bg-opacity-30 rounded shadow-xl">
                                <p className="text-black text-center text-lg font-bold">SIGN IN</p>
                                <div className="">
                                    <label className="block text-lg font-semibold text-black" htmlFor="email">E-mail</label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
                                        type="email" placeholder="Nhập email của bạn" />
                                </div>
                                <div className="mt-2">
                                    <label className="block  text-lg font-semibold text-black">Mật khẩu</label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
                                        type="password" placeholder="Nhập mật khẩu của bạn" />
                                </div>
                                <div className="my-5">
                                    <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 bg-gray-200 hover:bg-white hover:shadow transition duration-150">
                                        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" /> <span>Login with Google</span>
                                    </button>
                                </div>
                                <div className="mt-4 items-center justify-between space-x-5">
                                    <button
                                        className="px-4 py-1 text-white font-normal tracking-wider bg-blue-900 hover:bg-blue-500 rounded"
                                        type="submit">Đăng nhập</button>

                                    <Link to="/signup">
                                        <button
                                            className="px-4 py-1 text-white font-normal tracking-wider bg-blue-900 hover:bg-blue-500 rounded"
                                            type="submit">Đăng ký
                                        </button>
                                    </Link>

                                    <a className="inline-block items-center right-0 align-baseline font-bold text-sm text-500 text-black hover:text-gray-300"
                                        href="#">Quên mật khẩu ?</a>
                                </div>
                                <div className="button-dangky">

                                </div>
                            </form>


                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Signin