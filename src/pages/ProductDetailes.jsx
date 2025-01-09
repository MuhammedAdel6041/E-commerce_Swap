import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Button, Tag, Spin } from "antd";

const ProductDetailes = () => {
  const { id } = useParams();

  const fetchSpecificProduct = async () =>
    axios.get(`https://e-commerce-api-v1-cdk5.onrender.com/api/v1/products/${id}`);

  const { data, isLoading, error } = useQuery(
    ["getSpecificProduct", id],
    fetchSpecificProduct,
    { cacheTime: 0 }
  );

  const product = data?.data?.data;

  const staticProduct = {
    name: "Sample Product",
    description: "This is a sample product used as fallback data.",
    price: 29.99,
    priceAfterDiscount: 0,
    quantity: 20,
    imagecover: "https://via.placeholder.com/300",
    image: [],
    category: { name: "General" },
    reviews: [],
  };

  const displayProduct = product || staticProduct;

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  if (error) return <div>Error fetching product details</div>;

  return (
    <div className="bg-gray-50 py-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-1 flex flex-col items-center">
            <img
              src={displayProduct.imagecover}
              alt={displayProduct.name}
              className="w-80 h-80 rounded-lg shadow-md object-cover"
            />
            {displayProduct.image.length > 0 && (
              <div className="flex gap-2 mt-4">
                {displayProduct.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product Thumbnail ${index + 1}`}
                    className="w-20 h-20 rounded-md object-cover cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {displayProduct.name}
            </h1>
            <p className="text-gray-600 mb-4 text-base">
              {displayProduct.description}
            </p>
            <div className="mb-4">
              <span className="text-xl font-semibold text-gray-800 mr-2">
                $
                {displayProduct.priceAfterDiscount > 0
                  ? displayProduct.priceAfterDiscount
                  : displayProduct.price}
              </span>
              {displayProduct.priceAfterDiscount > 0 && (
                <Tag color="red" className="text-gray-500 line-through">
                  ${displayProduct.price}
                </Tag>
              )}
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-700 font-semibold mr-2">
                Quantity:
              </span>
              <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-800">
                {displayProduct.quantity} in stock
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-700 font-semibold mr-2">Category:</span>
              <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-800">
                {displayProduct.category?.name || "Uncategorized"}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Reviews:
              </h2>
              {displayProduct.reviews.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-600">
                  {displayProduct.reviews.map((review, index) => (
                    <li key={index}>{review.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No reviews available.</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                type="primary"
                className="w-full md:w-auto px-6 py-2 rounded-md"
              >
                Add to Cart
              </Button>
              <Button
                className="w-full md:w-auto px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailes;
