const List_khoa_hoc = () => {
    return (
        <>
            <section className="content ">
                {/* <!-- side bar --> */}
                <div className="max-w-screen-xl mx-auto">
                    <div
                        className=" text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
                        <div className="flex-shrink-0  px-8 py-4 flex flex-row items-center justify-between">
                            <a href="#"
                                className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Danh
                                mục</a>

                            <button className="rounded-lg md:hidden  focus:outline-none focus:shadow-outline">
                                <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                    <path x-show="!open" fill-rule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                        clip-rule="evenodd"></path>
                                    <path x-show="open" fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        {/* <!-- component -->
                <!-- This is an example component --> */}
                        <div className="relative inline-flex">
                            <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                                <path
                                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                    fill="#648299" fill-rule="nonzero" />
                            </svg>
                            <select
                                className="border border-gray-300 rounded-full font-normal text-gray-900 h-10 pl-5 pr-10 bg-gradient-to-r from-[#82AAE3] to-blue-700 hover:border-gray-400 focus:outline-none appearance-none">
                                <option>Tất cả</option>
                                <option>Miễn phí</option>
                                <option>Trả phí</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-[250px,1fr] ">
                            <nav>
                                <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gradient-to-r from-[#82AAE3]to-blue-700 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gradient-to-r from-[#82AAE3] to-blue-700 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href="#">Thiết kế website</a>
                                <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gradient-to-r from-[#82AAE3] to-blue-700 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href="#">Marketing</a>
                                <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gradient-to-r from-[#82AAE3] to-blue-700 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href="#">Ứng dụng phần mềm</a>
                                <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gradient-to-r from-[#82AAE3] to-blue-700 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href="#">Photoshop</a>
                                <div className="relative" x-data="{open: false }">
                                    <button
                                        className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">


                                    </button>
                                </div>
                            </nav >
                            <nav className=" ">
                                <section>
                                    <h1 className="text-center font-bold text-2xl text-indigo-500 mb-5">Danh sách khóa học</h1>
                                    <div className="grid justify-center md:grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-7">
                                        {/* <!-- Card 1 --> */}
                                        <a>
                                            <div
                                                className="bg-white rounded-lg border shadow-md  h-[350px] md:max-w-none overflow-hidden">
                                                <img className="h-56 lg:h-60 w-full object-cover"
                                                    src="https://d1iv5z3ivlqga1.cloudfront.net/wp-content/uploads/2021/02/30162211/html-va-css.jpg"
                                                    alt="" />
                                                <div className="p-3">
                                                    <h3 className="font-semibold text-xl text-center leading-6 text-gray-700 my-2">
                                                        HTML, CSS CƠ BẢN
                                                    </h3>
                                                    <p className="paragraph-normal text-red-500 text-center">
                                                        Miễn Phí
                                                    </p>
                                                </div>
                                            </div>
                                        </a>

                                        {/* <!-- Card 2 --> */}
                                        <div
                                            className="bg-white rounded-lg border shadow-md h-[350px] md:max-w-none overflow-hidden">
                                            <img className="h-56 lg:h-60 w-full object-cover"
                                                src="https://www.komododigital.co.uk/app/uploads/2021/05/React-1-1024x683.jpg"
                                                alt="" />
                                            <div className="p-3">

                                                <h3 className="font-semibold text-xl text-center leading-6 text-gray-700 my-2">
                                                    REACT CƠ BẢN
                                                </h3>
                                                <p className="paragraph-normal text-red-500 text-center">
                                                    Miễn Phí
                                                </p>
                                            </div>
                                        </div>

                                        {/* <!-- Card 3 --> */}
                                        <div
                                            className="bg-white rounded-lg border shadow-md h-[350px] md:max-w-none overflow-hidden">
                                            <img className="h-56 lg:h-60 w-full object-cover"
                                                src="https://images.ctfassets.net/23aumh6u8s0i/2QjNmyDo6LfK4HC8F1q4qw/b8baddde46d79ec9432a15f14b4a41a2/javascript"
                                                alt="" />
                                            <div className="p-3">

                                                <h3 className="font-semibold text-xl text-center leading-6 text-gray-700 my-2">
                                                    JAVASCRIPT CƠ BẢN
                                                </h3>
                                                <p className="paragraph-normal text-red-500 text-center">
                                                    Miễn Phí
                                                </p>
                                            </div>
                                        </div>
                                        {/* <!-- Card 4 --> */}
                                        <div
                                            className="bg-white rounded-lg border shadow-md h-[350px] md:max-w-none overflow-hidden">
                                            <img className="h-56 lg:h-60 w-full object-cover"
                                                src="https://www.datocms-assets.com/48401/1628645197-learn-typescript.png"
                                                alt="" />
                                            <div className="p-3">

                                                <h3 className="font-semibold text-xl text-center leading-6 text-gray-700 my-2">
                                                    TYPESCRIPTS NÂNG CAO
                                                </h3>
                                                <p className="paragraph-normal text-red-500 text-center">
                                                    1.000 $
                                                </p>
                                            </div>
                                        </div>

                                        {/* <!-- Card 5 --> */}
                                        <div
                                            className="bg-white rounded-lg border shadow-md w-[ h-[350px] md:max-w-none overflow-hidden">
                                            <img className="h-56 lg:h-60 w-full object-cover"
                                                src="https://blog.haposoft.com/content/images/2021/11/laravel-featured.png"
                                                alt="" />
                                            <div className="p-3">

                                                <h3 className="font-semibold text-xl text-center leading-6 text-gray-700 my-2">
                                                    LARAVEL NÂNG CAO
                                                </h3>
                                                <p className="paragraph-normal text-red-500 text-center">
                                                    960$
                                                </p>
                                            </div>
                                        </div>

                                        {/* <!-- Card 6 --> */}
                                        <div
                                            className="bg-white rounded-lg border shadow-md h-[350px] md:max-w-none overflow-hidden">
                                            <img className="h-56 lg:h-60 w-full object-cover"
                                                src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_php_icon_130266.png"
                                                alt="" />
                                            <div className="p-3">

                                                <h3 className="font-semibold text-xl text-center leading-6 text-gray-700 my-2">
                                                    LẬP TRÌNH PHP 3
                                                </h3>
                                                <p className="paragraph-normal text-red-500 text-center">
                                                    850$
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </section>
                            </nav>
                        </div >

                    </div >
                </div >
            </section >
        </>
    )
}

export default List_khoa_hoc