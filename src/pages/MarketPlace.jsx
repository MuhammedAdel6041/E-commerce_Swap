/* eslint-disable no-unused-vars */
import { Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
 

export default function MarketPlace() {
  const { addToCart } = useContext(CartContext);
  const { auth } = useAuth(); // Get authentication state

  // Fetch featured products using React Query
  const { data, isLoading } = useQuery("featuredProducts", () =>
    axios.get(
      `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/products/?page=1&limit=315`
    )
  );

  const [showAll] = useState(false);

  const productsToDisplay = showAll
    ? data?.data?.data
    : data?.data.data;

  const filteredProducts = productsToDisplay?.slice(4);

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <h1 className="text-center text-2xl font-bold mb-6">SWAP ANY ITEM DO YOU WANT </h1>

      {/* Show Spinner if data is still loading */}
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Spin size="large" />
        </div>
      ) : (
        // Display products once data is fetched
        <Row gutter={[16, 16]} justify="center" className="my-8">
          {filteredProducts?.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 duration-300 ease-in-out overflow-hidden">
                <div className="relative group">
                  <img
                    className="w-full h-60 object-cover rounded-t-xl group-hover:opacity-80 transition-opacity duration-300"
                    src={product.imagecover}
                    alt={product.name}
                  />
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-full shadow-lg">
                      SALE
                    </div>
                  )}
                </div>

                {/* Display product name, description, and price */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description || "No description available."}
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

                  {/* Show only the "Show Details" button */}
                  <div className="flex gap-2">
                    <Link
                      to={`/swap/${product._id}`}
                      className="w-full flex items-center justify-center bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                    >
                     Swap Product 
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
