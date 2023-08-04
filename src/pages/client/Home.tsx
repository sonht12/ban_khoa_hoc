
const Home = () => {
    return (
        <>
             <section className="content w-screen">
            <nav className="banner">
                {/* <!-- Ảnh  --> */}
                <div className="image-banner flex ">
                    {/* <!-- text --> */}
                    <div className="pt-[200px] items-center mx-[100px] ">
                        <span className="text-4xl font-bold text-gray-700">Hôm nay bạn muốn học gì nào ???
                            <p className="text-sm font-medium pt-2">Bạn đang không biết chọn trang Web nào uy tín để tăng
                                khả năng của mình ?</p>
                        </span>
                        <button
                            className="bg-blue-400 text-white font-semibold text-xl px-3 py-2 mt-5 rounded-lg hover:bg-blue-600 ">Học
                            Ngay
                        </button>

                    </div>
                    <img className=" rounded-lg w-[60%] h-[600px]"
                        src="https://camo.githubusercontent.com/5ddf73ad3a205111cf8c686f687fc216c2946a75005718c8da5b837ad9de78c9/68747470733a2f2f7468756d62732e6766796361742e636f6d2f4576696c4e657874446576696c666973682d736d616c6c2e676966"
                        alt=""/>

                </div>

            </nav>
            <nav className="h-[150px] w-auto bg-[#91D8E4] items-center flex justify-between px-[300px]">
                <div className="thanhtich">
                    <img className="w-[50px] " src="" alt=""/>
                    <h2 className="text-orange-700 font-semibold text-xl">+200 Khóa Học</h2>
                    <p>Lựa chọn số 1 thị trường</p>
                </div>

                <div className="thanhtich ">
                    <img className="w-[50px]" src="" alt=""/>
                    <h2 className="text-orange-700 font-semibold text-xl">Giảng viên chuyên nghiệp</h2>
                    <p>Lựa chọn số 1 thị trường</p>
                </div>

                <div className="thanhtich">
                    <img className="w-[50px]" src="" alt=""/>
                    <h2 className="text-orange-700 font-semibold text-xl">Theo sát học viên</h2>
                    <p>Lựa chọn số 1 thị trường</p>
                </div>
            </nav>

            <nav className="content1 w-screen mx-auto mt-[200px] mb-[200px] flex ">
                {/* <!-- card --> */}
                <div className="font-sans  w-full flex flex-row justify-center items-center opacity-30">
                    <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                        <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
                            src="https://media.itsnicethat.com/original_images/giphy-2021-gifs-and-clips-animation-itsnicethat-02.gif"
                            alt=""/>
                        <div className="text-center mt-2 text-3xl font-medium">ZZilZZil</div>
                        <div className="text-center mt-2 font-light text-sm">Darius</div>
                        <div className="text-center font-normal text-lg">Cao Đẳng FPT Polytechnic</div>
                        <div className="px-6 text-center mt-2 font-light text-sm">
                            <p>
                                Giảng viên front-end
                            </p>
                        </div>
                        <hr className="mt-8"/>
                        <div className="flex p-4">
                            <div className="w-1/2 text-center">
                                <span className="font-bold">1.8 k</span> Followers
                            </div>
                            <div className="w-0 border border-gray-300">

                            </div>
                            <div className="w-1/2 text-center">
                                <span className="font-bold">2.0 k</span> Following
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- card --> */}
                <div className=" font-sans  w-full flex flex-row justify-center items-center">
                    <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                        <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
                            src="https://user-images.githubusercontent.com/14011726/94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif"
                            alt=""/>
                        <div className="text-center mt-2 text-3xl font-medium">Nguyễn Duy Anh</div>
                        <div className="text-center mt-2 font-light text-sm">@anhndph24923</div>
                        <div className="text-center font-normal text-lg">Cao Đẳng FPT Polytechnic</div>
                        <div className="px-6 text-center mt-2 font-light text-sm">
                            <p>
                                Bố của đời
                            </p>
                        </div>
                        <hr className="mt-8"/>
                        <div className="flex p-4">
                            <div className="w-1/2 text-center">
                                <span className="font-bold">1.8 k</span> Followers
                            </div>
                            <div className="w-0 border border-gray-300">

                            </div>
                            <div className="w-1/2 text-center">
                                <span className="font-bold">2.0 k</span> Following
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- card --> */}
                <div className=" font-sans  w-full flex flex-row justify-center items-center opacity-30">
                    <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                        <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
                            src="https://i.pinimg.com/originals/56/2c/3a/562c3ab491bf2eae2a6754aa9ff3426d.gif" alt=""/>
                        <div className="text-center mt-2 text-3xl font-medium">ZZilZZil</div>
                        <div className="text-center mt-2 font-light text-sm">@truongbq</div>
                        <div className="text-center font-normal text-lg">Cao Đẳng FPT Polytechnic</div>
                        <div className="px-6 text-center mt-2 font-light text-sm">
                            <p>
                                Giảng viên front-end
                            </p>
                        </div>
                        <hr className="mt-8"/>
                        <div className="flex p-4">
                            <div className="w-1/2 text-center">
                                <span className="font-bold">1.8 k</span> Followers
                            </div>
                            <div className="w-0 border border-gray-300">

                            </div>
                            <div className="w-1/2 text-center">
                                <span className="font-bold">2.0 k</span> Following
                            </div>
                        </div>
                    </div>
                </div>

            </nav>

            <nav className="content2">
                <section className=" w-screen bg-[#BFEAF5] p-8">
                    <h1 className="text-center font-bold text-2xl text-indigo-500">Danh sách chủ đề</h1>

                    <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 my-10">
                        {/* <!-- Card 1 --> */}
                        <div
                            className="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden opacity-30">
                            <img className="h-56 lg:h-60 w-full object-cover"
                                src="https://d1iv5z3ivlqga1.cloudfront.net/wp-content/uploads/2021/02/30162211/html-va-css.jpg"
                                alt="" />
                            <div className="p-3">
                                <span className="text-sm text-primary">November 19, 2022</span>
                                <h3 className="font-semibold text-xl leading-6 text-gray-700 my-2">
                                    KHÓA HỌC HTML,CSS CƠ BẢN ĐẾN NÂNG CAO
                                </h3>
                                <p className="paragraph-normal text-gray-600">
                                    Bao gồm hơn 10 video kèm các câu hỏi để luyện tập về HTML,CSS...
                                </p>
                                <a className="mt-3 block" href="#">Read More </a>
                            </div>
                        </div>

                        {/* <!-- Card 2 --> */}
                        <div className="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden">
                            <img className="h-56 lg:h-60 w-full object-cover"
                                src="https://amis.misa.vn/wp-content/uploads/2021/09/marketing-scaled.jpg" alt="" />
                            <div className="p-3">
                                <span className="text-sm text-primary">December 15, 2023</span>
                                <h3 className="font-semibold text-xl leading-6 text-gray-700 my-2">
                                    KHÓA HỌC MARKETING CĂN BẢN CHO NGƯỜI MỚI BẮT ĐẦU
                                </h3>
                                <p className="paragraph-normal text-gray-600">
                                    Với nhiều giảng viên giỏi dạy thì học cái này tốt lắm ...
                                </p>
                                <a className="mt-3 block" href="#">Read More</a>
                            </div>
                        </div>

                        {/* <!-- Card 3 --> */}
                        <div
                            className="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden opacity-30">
                            <img className="h-56 lg:h-60 w-full object-cover"
                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTnkgMMyUtWe-nFcLJnzZ39jVkSzw5V6DRYHWb_iyX4aYrkQVjp5b0EgIWQ6G2pMEIo6BSov6C8UmKo4LhOTVxLeO9ySYuwjLaDK5_VQoia58lBaf6iBIxx36gD7Ag01NCl11_udxB4gER9MDSmiTiKxz5o6llGSBLGdtKwNY51eK_1dMKJhjaCp0h4w/s1280/photoshop1.jpg"
                                alt="" />
                            <div className="p-3">
                                <span className="text-sm text-primary">November 19, 2022</span>
                                <h3 className="font-semibold text-xl leading-6 text-gray-700 my-2">
                                    PHOTOSHOP TỪ CƠ BẢN ĐẾN NÂNG CAO
                                </h3>
                                <p className="paragraph-normal text-gray-600">
                                    Học cái này chỉnh ảnh cho người yêu hay gia đình thì hết nước chấm...
                                </p>
                                <a className="mt-3 block" href="#">Read More</a>
                            </div>
                        </div>
                    </div>

                </section>
            </nav>
        </section>
        </>
    )
}

export default Home