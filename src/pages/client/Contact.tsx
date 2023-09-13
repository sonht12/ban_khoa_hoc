// Contact 

const Contact = () => {
  return (
    <>
      <section className="content">
            {/* <!-- component --> */}
            <section className="text-gray-600  relative">
                <div className="absolute  bg-gray-300">
                    <iframe className="w-screen h-screen"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.919897260996!2d105.74627993415311!3d21.035890878423363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455f097562a6f%3A0xc1df36ba25eab7e0!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1690736722793!5m2!1svi!2s"></iframe>
                </div>
                <div className="container px-5 py-24 mx-auto flex">
                    <div
                        className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Nhận xét</h2>
                        <p className="leading-relaxed mb-5 text-gray-600">Phản hồi về trải nghiệm của bạn cho chúng tôi!.
                        </p>
                        <form action="https://formspree.io/f/mvojqgyr" method="POST">
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" id="name" name="Name"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
                        {/* <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-600">Image</label>
                            <input type="file" id="image" name="Image"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div> */}
                        <div className="relative mb-4">
                            <label  className="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message" name="message"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <button type="submit"
                            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Gửi</button>
                        <p className="text-xs text-gray-500 mt-3">Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi. Quý khách vui lòng đợi phản hồi trong giây lát!
                        </p>
                        </form>
                    </div>
                </div>
            </section>
        </section>
    </>
  )
}

export default Contact