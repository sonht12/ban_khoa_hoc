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
import User from "./pages/admin/product/User";
import EditUser from "./pages/admin/product/EditUser";



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
        element:<Pay/>
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
        path: "video",
        element: <Lesson_video/>
      }

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
    path: "/admin",
    element: (
      <LayoutAdmin />
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
        path: "user/edit/:idUser",
        element: <EditUser />
      },
      {
        path: "user",
        element: <User />
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
    ],
  },
]);
