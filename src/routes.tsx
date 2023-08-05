import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutlClinet from "./components/Layouts/LayoutlClinet";
import LayoutAdmin from "./components/Layouts/LayoutAdmin";
import Home from "./pages/client/Home";
import Listproduct from "./pages/admin/product/Listproduct";
import Addproduct from "./pages/admin/product/add";
import EditProduct from "./pages/admin/product/edit";
import List_khoa_hoc from "./pages/client/List_khoa_hoc";
import Contact from "./pages/client/Contact";
import Boughted from "./pages/client/Boughted";

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
        path: "chitietkhoahoc",
        element: <List_khoa_hoc />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "boughted",
        element: <Boughted />
      }
      
    ],
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
        element: <div>dashboard</div>
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
        path: "product/edit/:idProduct",
        element: <EditProduct />
      },
    ],
  },
]);