import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Row, Col, Card, Button, Badge, Spin, message } from "antd";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProductSPage() {
  const { addToCart } = useContext(CartContext);
  const { auth } = useAuth(); // Get authentication state
  const [loadingProducts, setLoadingProducts] = useState({}); // Track loading state for each product

  async function addCartItem(id) {
    setLoadingProducts((prev) => ({ ...prev, [id]: true })); // Set loading for the specific product
    try {
      await addToCart(id);
      message.success("Product Added Successfully!" );
    } catch (error) {
      message.error(error.message || "Failed to add product to cart" );
    } finally {
      setLoadingProducts((prev) => ({ ...prev, [id]: false })); // Reset loading for the specific product
    }
  }

  function GetFeaturedProducts() {
    return axios.get(
      `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/products/?page=1&limit=315`
    );
  }

  const { data } = useQuery("featuredProducts", GetFeaturedProducts, {
    cacheTime: 30000,
  });

  const [showAll] = useState(false);

  const productsToDisplay = showAll
    ? data?.data?.data
    : data?.data?.data;

  const filteredProducts = productsToDisplay?.slice(4);

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <h1 className="text-center text-2xl font-bold mb-6">Products</h1>
      <Row gutter={[16, 16]} justify="center">
        {filteredProducts?.map((product) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <div className="relative">
                  <img
                    className="w-full h-60 object-cover rounded-t-lg"
                    src={product.imagecover}
                    alt={product.name}
                  />
                  {product.discount && (
                    <Badge.Ribbon text="SALE" color="red" placement="start" />
                  )}
                </div>
              }
            >
              <Card.Meta
                title={
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                }
                description={
                  <p className="text-sm text-gray-600 mb-3">
                    High-quality product suitable for various needs.
                  </p>
                }
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-gray-800">
                  ${product.price}
                </span>
                {product.discount && (
                  <span className="text-sm line-through text-gray-400">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                {auth.isAuthenticated && (
                  <Button
                    type="primary"
                    block
                    icon={loadingProducts[product._id] ? <Spin size="small" /> : <ShoppingCartOutlined />}
                    style={{
                      backgroundColor: "#1E90FF", // Custom blue color
                      color: "#fff",
                      border: "none",
                    }}
                    onClick={() => addCartItem(product._id)}
                    loading={loadingProducts[product._id]} // Set loading for the specific product
                  >
                    {loadingProducts[product._id] ? "Adding..." : "Add to Cart"}
                  </Button>
                )}
                <Link to={`/product/${product._id}`} style={{ width: "50%" }}>
                  <Button
                    type="default"
                    block
                    icon={<InfoCircleOutlined />}
                    style={{
                      backgroundColor: "#E93D82", // Custom pink color
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Details
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
