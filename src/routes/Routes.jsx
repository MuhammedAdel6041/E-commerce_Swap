import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import { Cart, CheckOut, Category, Home, NotFound, ProductPage } from "./routes_Component.routes";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import ProductDetailes from './../pages/ProductDetailes';
import ProfilePage from "../components/Profile/ProfilePage";
 
 

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "category", element: <Category /> },
      { path: "checkOut", element: <CheckOut /> },
      { path: "product", element: <ProductPage /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <AboutUs /> },
      { path: "ContactUs", element: <Contact /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "details/:id", element: <ProductDetailes /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
