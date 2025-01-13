 


import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Row, Col } from "antd";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const { auth } = useAuth(); // Get authentication state

  async function addCartItem(id) {
    try {
      await addToCart(id);
      toast.success("Product Added Successfully!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.message || "Failed to add product to cart", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  function GetFeaturedProducts() {
    return axios.get(
      `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/products/`
    );
  }

  const { data } = useQuery("featuredProducts", GetFeaturedProducts, {
    cacheTime: 30000,
  });

  const [showAll] = useState(false);

  const productsToDisplay = showAll
    ? data?.data?.data
    : data?.data.data;

  const filteredProducts = productsToDisplay?.slice(4);

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <h1 className="text-center text-2xl font-bold mb-6">Products</h1>
      <Row gutter={[16, 16]} justify="center" className="my-8">
        {filteredProducts?.map((product) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <div className="max-w-sm mx-auto mb-6 rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="relative">
                <img
                  className="w-full h-60 object-cover"
                  src={product.imagecover}
                  alt={product.name}
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-md shadow">
                    SALE
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  High-quality product suitable for various needs.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-800">
                    ${product.price}
                  </span>
                  {product.discount && (
                    <span className="text-sm line-through text-gray-400">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="w-full flex items-center justify-center bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                  >
                    Show Details
                  </Link>
                  {auth.isAuthenticated && (
                    <button
                      onClick={() => addCartItem(product._id)}
                      className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
