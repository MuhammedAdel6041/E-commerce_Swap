/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Button, Tag, Spin, message } from "antd";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WhisListContext"; // Correct context name
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Reviews from "../components/Reviews";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext); // Correct hook usage
  const [loading, setLoading] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);  // State for wishlist loading

  const addCartItem = async (id) => {
    setLoading(true);
    try {
      await addToCart(id);
      setLoading(false);
      message.success("Product added to cart!"); // Display success message
    } catch (error) {
      setLoading(false);
      message.error("Failed to add product to cart"); // Display error message
    }
  };

  const addWishlistItem = async (id) => {
    setLoadingWishlist(true);
    try {
      await addToWishlist(id);  // Call the addToWishlist function
      setLoadingWishlist(false);
      message.success("Product added to wishlist!");  // Show success message
    } catch (error) {
      setLoadingWishlist(false);
      message.error("Failed to add product to wishlist");  // Show error message
    }
  };

  const fetchSpecificProduct = async () =>
    axios.get(`https://e-commerce-api-v1-cdk5.onrender.com/api/v1/products/${id}`);

  const fetchReviews = async () =>
    axios.get(`https://e-commerce-api-v1-cdk5.onrender.com/api/v1/products/${id}/reviews`);

  const { data: productData, isLoading: isProductLoading } = useQuery(
    ["getSpecificProduct", id],
    fetchSpecificProduct,
    { cacheTime: 0 }
  );

  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery(
    ["getProductReviews", id],
    fetchReviews,
  );

  const product = productData?.data?.data || {
    name: "Sample Product",
    description: "This is a sample product used as fallback data.",
    price: 29.99,
    priceAfterDiscount: 0,
    quantity: 20,
    imagecover: "https://via.placeholder.com/300",
    image: [],
    category: { name: "General" },
  };

  if (isProductLoading || isReviewsLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );

  const fallbackReviews = [
    {
      id: 1,
      rating: 4,
      comment: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro blanditiis sapiente ab dolores, ad dignissimos perspiciatis.",
      author: "John Lester",
      date: "March 01, 2022",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ];

  const reviewData = reviewsData?.data?.data || fallbackReviews;

  return (
    <div className="bg-gray-50 py-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 flex flex-col items-center">
            <img
              src={product.imagecover}
              alt={product.name}
              className="w-80 h-80 rounded-lg shadow-md object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4 text-base">{product.description}</p>
            <div className="mb-4">
              <span className="text-xl font-semibold text-gray-800 mr-2">
                ${product.priceAfterDiscount > 0 ? product.priceAfterDiscount : product.price}
              </span>
              {product.priceAfterDiscount > 0 && (
                <Tag color="red" className="text-gray-500 line-through">
                  ${product.price}
                </Tag>
              )}
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-700 font-semibold mr-2">Quantity:</span>
              <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-800">{product.quantity} in stock</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-700 font-semibold mr-2">Category:</span>
              <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-800">{product.category?.name || "Uncategorized"}</span>
            </div>
            <div className="flex gap-4 mt-6">
              <Button
                type="primary"
                block
                icon={<ShoppingCartOutlined />}
                loading={loading}
                onClick={() => addCartItem(product._id)}
              >
                Add to Cart
              </Button>
              <Button
                icon={<HeartOutlined />}
                style={{ backgroundColor: "#FF6347", color: "#fff", border: "none" }}
                loading={loadingWishlist}
                onClick={() => addWishlistItem(product._id)}
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
