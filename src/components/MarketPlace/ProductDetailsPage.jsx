import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin, Typography, Button, Card, Avatar, Divider, Tag, Input, message, Rate } from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

export default function ProductDetailsPage() {
  const { id } = useParams(); // Get product ID from URL params
  const { auth } = useAuth(); // Get authentication context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swapMessage, setSwapMessage] = useState(""); // Input for swap message
  const [sending, setSending] = useState(false); // New state to track the sending status
  const staticRating = 5; // Static rating value

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/products/${id}`
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleSwapRequest = async () => {
    if (!auth.token) {
      message.error("You need to log in to send a swap request.");
      return;
    }

    if (!swapMessage.trim()) {
      message.error("Please enter a message for the swap request.");
      return;
    }

    setSending(true); // Start loading spinner

    try {
      await axios.post(
        "https://e-commerce-api-v1-cdk5.onrender.com/api/v1/reviews/",
        {
          title: swapMessage, // Use the swap message as the title
          rating: staticRating, // Static rating of 5
          product: id, // The current product ID
          user: auth.user?._id, // Get the user ID from the auth context
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      message.success("Swap request sent successfully!");
      setSwapMessage(""); // Clear the input to allow sending another message
    } catch (error) {
      console.error("Error sending swap request:", error);
      message.error("Failed to send swap request. Please try again.");
    } finally {
      setSending(false); // Stop loading spinner
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-6">
        <Text type="danger">Product not found.</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
      <div className="grid grid-cols-12 gap-6 max-w-7xl w-full">
        {/* Left Section - Product Image */}
        <div className="col-span-12 lg:col-span-5 relative">
          {/* Used Product Tag */}
          <Tag
            color="red"
            className="absolute top-4 left-4 text-lg font-semibold px-4 py-2 rounded-lg shadow-lg"
          >
            Used Product
          </Tag>
          {/* For Swap Tag */}
          <Tag
            color="blue"
            className="absolute top-16 left-4 text-lg font-semibold px-4 py-2 rounded-lg shadow-lg"
          >
            For Swap
          </Tag>
          <Card className="overflow-hidden bg-gray-200 rounded-xl shadow-md">
            <img
              src={product.imagecover}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl"
            />
          </Card>
        </div>

        {/* Right Section - Product Details */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="p-6 bg-white shadow-lg rounded-xl">
            {/* Price and Swap Tag */}
            <div className="flex justify-between items-center mb-4">
              <Title level={3} className="text-purple-600 font-semibold">
                ${product.price}
              </Title>
              <div className="flex items-center gap-2">
                <Tag color="blue" className="font-semibold text-white px-4 py-1 rounded-full">
                  FOR SWAP
                </Tag>
              </div>
            </div>

            <Divider />

            {/* Product Name, Description, Rating */}
            <Title level={4} className="text-gray-800">{product.name}</Title>
            <Text className="block mb-4 text-gray-600">{product.description}</Text>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <Rate disabled value={staticRating} />
              <Text className="text-sm text-gray-500">({staticRating} stars)</Text>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Avatar
                size={50}
                src="https://via.placeholder.com/50"
                alt="Category Avatar"
              />
              <div>
                <Text className="block font-semibold text-gray-800">{product.category?.name}</Text>
              </div>
            </div>

            {/* Swap Request Form */}
            <Input.TextArea
              rows={4}
              value={swapMessage}
              onChange={(e) => setSwapMessage(e.target.value)}
              placeholder="Enter your message for the swap request"
              className="mb-4 border-2 border-gray-300 rounded-lg p-4"
            />

            {/* Spinner and Button */}
            {sending ? (
              <div className="flex justify-center mb-4">
                <Spin size="large" />
              </div>
            ) : (
              <Button
                type="primary"
                block
                size="large"
                onClick={handleSwapRequest}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold"
              >
                Send Swap Request
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
