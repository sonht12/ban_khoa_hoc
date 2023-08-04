import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom'

const LayoutlClinet = () => {
  return (
    <>
      <header>
        {/* <!-- component --> */}
        <div className="flex flex-wrap place-items-center">
          <section className="relative mx-auto">
            {/* <!-- navbar --> */}
            <nav className="flex justify-between bg-gradient-to-r from-[#82AAE3] to-blue-700 text-white w-screen">
              <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                <Link to="home">
                  <a className="text-3xl font-black font-heading" >
                    J4 !
                  </a></Link>
                {/* <!-- Nav Links --> */}
                <ul className="hidden md:flex px-4 mx-auto font-bold font-heading space-x-12">
                  <button>
                    <Link to="home">
                      <a className="hover:text-blue-900" >TRANG CHỦ</a></Link>
                  </button>
                  {/* <!-- button khóa học --> */}
                  <div className='flex items-center justify-center '>
                    <nav className="hidden  space-x-10 md:flex">
                      <div className="relative" >
                        <button type="button"
                          className="text-white group p-4 inline-flex  font-bold hover:text-blue-900">
                          <Link to="chitietkhoahoc"><span>KHÓA HỌC</span></Link>
                        </button>
                      </div>
                    </nav>
                  </div>
                  {/* <!-- Button liên hệ --> */}
                  <button>
                    <Link to="contact">
                      <a className="hover:text-blue-900">LIÊN HỆ</a>
                    </Link>
                  </button>
                </ul>
                {/* <!-- Button đăng nhập --> */}
                <div className="hidden xl:flex space-x-5 items-center">
                  <section className="grid  w-full place-content-center">
                    <Link to="">
                      <a >
                        <button
                          className="btn group flex items-center bg-transparent p-2 px-6 text-sm font-medium tracking-widest text-white">
                          <span
                            className="relative pr-4 pb-1 text-white after:transition-transform after:duration-500 after:ease-out after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100">Sign
                            In</span>
                          <svg viewBox="0 0 46 16" height="10" width="20"
                            xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal"
                            className="-translate-x-2 fill-slate-700 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-x-105 group-hover:fill-white">
                            <path transform="translate(30)"
                              d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                              data-name="Path 10" id="Path_10"></path>
                          </svg>
                        </button>
                      </a></Link>
                  </section>
                </div>
                {/* <!-- button khóa học đã mua --> */}

                <Link to="boughted">
                  <button
                    className="mx-10 px-10 rounded-full bg-[#82AAE3] py-2 text-black font-medium hover:bg-[#91D8E4] hover:text-gray-500">
                    KHÓA HỌC ĐÃ MUA
                  </button>
                </Link>

              </div>
              {/* <!-- Responsive navbar --> */}
              <a className="xl:hidden flex mr-6 items-center" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                  <span
                    className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                  </span>
                </span>
              </a>
              <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </a>
            </nav>
          </section >
        </div >
      </header >

      {/* =========================== */}
      < Outlet />
      {/* =========================== */}

      <footer className="w-screen mt-5 bg-[#82AAE3]">
        <div className="max-w-screen-xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>

              <p className="max-w-xs mt-4 text-sm text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, accusantium.
              </p>
              <div className="flex mt-8 space-x-6 text-white">
                <a className="hover:opacity-75" href='' target="_blank" rel="noreferrer">
                  <span className="sr-only"> Facebook </span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd" />
                  </svg>
                </a>
                <a className="hover:opacity-75" href='' target="_blank" rel="noreferrer">
                  <span className="sr-only"> Instagram </span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd" />
                  </svg>
                </a>
                <a className="hover:opacity-75" href='' target="_blank" rel="noreferrer">
                  <span className="sr-only"> Twitter </span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a className="hover:opacity-75" href='' target="_blank" rel="noreferrer">
                  <span className="sr-only"> GitHub </span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd" />
                  </svg>
                </a>
                <a className="hover:opacity-75" href='' target="_blank" rel="noreferrer">
                  <span className="sr-only"> Dribbble </span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="font-medium">
                  Company
                </p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                  <a className="hover:opacity-75" href=''> About </a>
                  <a className="hover:opacity-75" href=''> Meet the Team </a>
                  <a className="hover:opacity-75" href=''> History </a>
                  <a className="hover:opacity-75" href=''> Careers </a>
                </nav>
              </div>
              <div>
                <p className="font-medium">
                  Services
                </p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                  <a className="hover:opacity-75" href=''> 1on1 Coaching </a>
                  <a className="hover:opacity-75" href=''> Company Review </a>
                  <a className="hover:opacity-75" href=''> Accounts Review </a>
                  <a className="hover:opacity-75" href=''> HR Consulting </a>
                  <a className="hover:opacity-75" href=''> SEO Optimisation </a>
                </nav>
              </div>
              <div>
                <p className="font-medium">
                  Helpful Links
                </p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                  <a className="hover:opacity-75" href=''> Contact </a>
                  <a className="hover:opacity-75" href=''> FAQs </a>
                  <a className="hover:opacity-75" href=''> Live Chat </a>
                </nav>
              </div>
              <div>
                <p className="font-medium">
                  Legal
                </p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-white">
                  <a className="hover:opacity-75" href=''> Privacy Policy </a>
                  <a className="hover:opacity-75" href=''> Terms &amp; Conditions </a>
                  <a className="hover:opacity-75" href=''> Returns Policy </a>
                  <a className="hover:opacity-75" href=''> Accessibility </a>
                </nav>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-800">
            © 2022 Comany Name
          </p>
        </div>
      </footer>
    </>
  )
}

export default LayoutlClinet