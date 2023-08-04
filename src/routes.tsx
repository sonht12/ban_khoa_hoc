import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutlClinet from "./components/Layouts/LayoutlClinet";
import LayoutAdmin from "./components/Layouts/LayoutAdmin";
import Listproduct from "./pages/admin/product/Listproduct";
import Addproduct from "./pages/admin/product/add";
import EditProduct from "./pages/admin/product/edit";

export const router = createBrowserRouter([
  { path: "/", element: <LayoutlClinet/> },
  {
    path: "/admin",
    element: (
     <LayoutAdmin/>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element:<div>dashboard</div>
      },
      {
        path: "products",
        element:<Listproduct/>
      },
      {
        path: "product/add",
        element:<Addproduct/>
      },
      {
        path: "product/edit/:idProduct",
        element:<EditProduct/>
      },
    ],
  },
]);
