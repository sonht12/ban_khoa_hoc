import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutlClinet from "./components/Layouts/LayoutlClinet";
import LayoutAdmin from "./components/Layouts/LayoutAdmin";
import Home from "./pages/client/Home";
import Listproduct from "./pages/admin/product/Listproduct";
import Addproduct from "./pages/admin/product/add";
import EditProduct from "./pages/admin/product/edit";
import ListKhoaHoc from "./pages/client/List_khoa_hoc";
import Contact from "./pages/client/Contact";
import Boughted from "./pages/client/Boughted";
import Signin from "./components/Layouts/Signin";
import Signup from "./components/Layouts/Signup";
import Listcategory from "./pages/admin/category";
import Addcategory from "./pages/admin/category/add";
import Editcategory from "./pages/admin/category/edit";
import ProductDetail from "./pages/client/detail";
import Pay from "./pages/client/Pay";
import Orderdetail from "./pages/admin/product/Oderdetail";
import Lesson_video from "./pages/client/Lesson_video";
import User from "./pages/admin/User/User";
import EditUser from "./pages/admin/User/EditUser";
import Blog from "./pages/admin/Blog/Blog";
import AddBlog from "./pages/admin/Blog/AddBlog";
import EditBlog from "./pages/admin/Blog/EditBlog";
import BlogDetail from "./pages/admin/Blog/detailBlog";
import Addlesson from "./pages/admin/lesson/add";
import EditLesson from "./pages/admin/lesson/edit";
import Detaillesson from "./pages/admin/lesson/Detaillesson";
import Addquizz from "./pages/admin/quizz/add";
import EditQuizz from "./pages/admin/quizz/edit";
import Videodetail from "./pages/client/Video";
import Detailproduct from "./pages/admin/product/Detailproduct";
import RatingProduct from "./pages/admin/product/ratingProduct";
import CommentProduct from "./pages/admin/product/commentProduct";
import ChangePassword from "./components/Layouts/changePassword";
import ProfileUser from "./pages/admin/User/profileUser";
import EditProfile from "./pages/admin/User/editProfile";
import ListOrder from "./pages/admin/order/oderList";
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
const isAdmin = userInfo && userInfo.userData && userInfo.userData.role === 'admin';

function ProtectedElement({ children }) {
  const isLoggedIn = !!localStorage.getItem('userInfo');
  return isLoggedIn ? children : <Navigate to="/pay" />;
}


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LayoutlClinet />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "khoahoc",
        element: <ListKhoaHoc />
      },
      {
        path: "detail/:idProduct",
        element: <ProductDetail/>
      },
      {
        path:"pay/:idProduct",
        element:<ProtectedElement><Pay/></ProtectedElement>
      },
      {
        path:"blogDetail/:idBlog",
        element:<BlogDetail/>
      },

      {
        path:"profile/:idUser",
        element:<ProfileUser/>
      },
      {
        path: "profile/edit/:idUser",
        element: <EditProfile />
      },

      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "boughted",
        element: <Boughted />
      },
      {
        path: "video/:idProduct",
        element: <Lesson_video />,
        children:[
          {
            index: true,
            path: "lesson/:idLesson/:idUser",
            element: <Videodetail/>,
          },
          
        ]
      },

    ],
  },
  {
    path: "signin",
    element: (
      <Signin />
    ),
  },
  {
    path: "signup",
    element: (
      <Signup />
    ),
  },
  {
    path: "changePassword",
    element: (
      <ChangePassword />
    ),
  },


  {
    path: "/admin",
    element: (
      isAdmin ? <LayoutAdmin /> : <Navigate to="/" />  // Nếu không phải là admin, chuyển hướng về trang chính
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <div>dashboard kiểu index.html</div>
      },
      {
        path: "products",
        element: <Listproduct />
      },
      {
        path: "product/add",
        element: <Addproduct />
      },
      {
        path: "product/oderdetail",
        element: <Orderdetail />
      },
      {
        path: "product/edit/:idProduct",
        element: <EditProduct />
      },
      {
        path: "product/ratings/:idProduct",
        element: <RatingProduct />
      },
      {
        path: "product/comments/:idProduct",
        element: <CommentProduct />
      },
      {
        path: "user/edit/:idUser",
        element: <EditUser />
      },
      {
        path: "user",
        element: <User />
      },
      {
        path: "blog",
        element: <Blog />
      },
      {
        path: "blog/add",
        element: <AddBlog />
      },
      {
        path: "blog/edit/:idBlog",
        element: <EditBlog />
      },
      {
        path: "categorys",
        element: <Listcategory />
      },
      {
        path: "category/add",
        element: <Addcategory />
      },
      {
        path: "category/edit/:idCategory",
        element: <Editcategory />
      },
      {
        path: "product/detail/:idProduct",
        element: <Detailproduct />,
      },
      {
        path: "/admin/lesson/add/:idProduct",
        element: <Addlesson />
      },
      {
        path: "/admin/lesson/edit/:idLesson",
        element: <EditLesson />
      },
      {
        path: "/admin/lesson/detail/:idLesson",
        element: <Detaillesson />
      },
      {
        path: "/admin/quizz/add/:idLesson",
        element: <Addquizz />
      },
      {
        path: "/admin/quizz/edit/:idQuizz",
        element: <EditQuizz />
      },
      {
        path: "orders",
        element: <ListOrder />
      },
    ],
  },
]);