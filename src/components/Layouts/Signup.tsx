const Signup = () => {
    return (
        <>
            <div
                className="h-screen font-sans bg-cover bg-no-repeat bg-[url('https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-binh-minh.jpg')]">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form className="max-w-sm m-4 p-10 bg-white bg-opacity-10 rounded shadow-xl">
                                <p className="text-black text-center text-lg font-bold">SIGN UP</p>
                                <div className="">
                                    <label className="block text-lg font-semibold text-black" htmlFor="email">E-mail</label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="email" placeholder="Nhập email của bạn" />
                                </div>
                                <div className="mt-2">
                                    <label className="block  text-lg font-semibold text-black">Mật khẩu</label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="password" placeholder="Nhập mật khẩu của bạn" />
                                </div>
                                <div className="mt-2">
                                    <label className="block  text-lg font-semibold text-black">Nhập lại mật khẩu</label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="password" placeholder="Nhập mật khẩu của bạn" />
                                </div>

                                <a href="">
                                    <div className="mt-4 items-center flex justify-center">
                                        <button
                                            className="px-4 py-1 text-white font-light tracking-wider bg-blue-900 hover:bg-blue-400 rounded"
                                            type="submit">Đăng ký
                                        </button>
                                    </div>
                                </a>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup