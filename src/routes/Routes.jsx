import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import { Cart, CheckOut,  Home, NotFound } from "./routes_Component.routes";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import ProductDetailes from './../pages/ProductDetailes';
import ProfilePage from "../components/Profile/ProfilePage";
 
import MyOrders from './../components/Profile/MyOrders';
import Products from "../pages/Products";
import CategoryPage from "../pages/CategoryPage";
import Brand from "../pages/Brand";
import MarketPlace from './../pages/MarketPlace';
import ProductDetailsPage from "../components/MarketPlace/ProductDetailsPage";
import WhisList from "../pages/WhisList";
 
 

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "category", element: <CategoryPage /> },
      { path: "brand", element: <Brand /> },
      { path: "market", element: <MarketPlace /> },
      { path: "checkOut", element: <CheckOut /> },
      { path: "product", element: <Products /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <AboutUs /> },
      { path: "ContactUs", element: <Contact /> },
      { path: "whishlist", element: <WhisList /> },
      { path: "register", element: <Register /> },
      { path: "swap/:id", element: <ProductDetailsPage /> },
      { path: "profile/myorders", element: <MyOrders /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "product/:id", element: <ProductDetailes /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
