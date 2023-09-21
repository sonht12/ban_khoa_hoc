// Contact

import { AiFillHome,AiFillPhone,AiOutlineMail } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import App from "@/App.css";

const Contact = () => {
  const [text, setText] = useState("J4 xin kính chào quý khách, chúng tôi rất hân hạnh được phục vụ!");
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const animateText = () => {
      setPosition((prevPosition) => prevPosition + 1);
    };

    const interval = setInterval(animateText, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="content pt-[89px] bg-[#D2E6E4]">
        {/* <!-- component --> */}
        <section className="text-gray-600  relative ">
          <div className="App">
            <div
              className="running-text"
              style={{ transform: `translateX(${position}px)` }}
            >
              {text}
            </div>
          </div>
          <div className="container   px-10 py-16 mx-auto flex">
            <div className="bg-[#fff] rounded-lg px-10 w-[850px]  text-[#0B7077]">
              <p className="text-[25px] pt-5 font-bold text-[#0B7077] pb-2">
                Thông tin liên hệ:
              </p>{" "}
              <hr />
              <p className="pt-2">
                Nếu gặp bất kỳ vấn đề gì trong quá trình sử dụng dịch vụ của J4,
                Quý khách hàng vui lòng liên hệ với chúng tôi thông qua email,
                hotline hoặc trực tiếp tại trụ sở Công ty. J4 cam kết sẽ phản
                hồi khách hàng nhanh nhất có thể. Chúng tôi luôn quan tâm tới ý
                kiến của Quý khách hàng và cam kết hỗ trợ thông tin để đem lại
                sự hài lòng tối đa cho khách hàng khi sử dụng dịch vụ của J4.
              </p>
              <p className="text-[25px] pt-5 font-bold text-[#0B7077] pb-2">
                Phương thức liên hệ:
              </p>{" "}
              <hr /> <hr />
              <div className="">
              <a className="text-[17px] text-gray-500 pt-2 flex" href="">
                {" "}
                <AiFillHome className="ml-2 mr-2 pt-1 text-[20px] text-[#0B7077]" 
               
                /> Address: Tòa nhà FPT Polytechnic, P. Trịnh
                Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
              </a>
              
              <a className="text-[17px] text-gray-500 flex" href="">
                {" "}
                <AiFillPhone className="ml-2 mr-2 pt-1 text-[20px] text-[#0B7077]" 
               
                />
                Hotline: 082626999
              </a>
              
              <a className="text-[17px] text-gray-500 flex" href="">
                {" "}
                <AiOutlineMail className="ml-2 mr-2 pt-1 text-[20px] text-[#0B7077]" 
               
                />
                Email: cskhJ4@gmail.com
              </a>
              </div>
<img src="../../../public/img/cskh.png" alt="" className="w-[500px] h-[250px] pt-3 ml-[140px]"/>
            </div>
            <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-10  flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
              <h2 className="text-[#0B7077] text-lg mb-1 font-medium title-font">
                Phản Hồi
              </h2>
              <p className="leading-relaxed mb-5 text-gray-600">
                Phản hồi về trải nghiệm của bạn cho chúng tôi!.
              </p>
              <form action="https://formspree.io/f/xrgwyanv" method="POST">
                <div className="relative mb-4">
                  <label className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="Name"
                    required
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label className="leading-7 text-sm text-gray-600">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Gửi
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi. Quý khách
                  vui lòng đợi phản hồi trong giây lát!
                </p>
              </form>
            </div>
          </div>
<iframe
            className="ml-[135px]  w-[1456px] pb-10 h-[500px] pt-5"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.919897260996!2d105.74627993415311!3d21.035890878423363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455f097562a6f%3A0xc1df36ba25eab7e0!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1690736722793!5m2!1svi!2s"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;