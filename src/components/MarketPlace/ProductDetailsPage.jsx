import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin, Typography, Button, Card, Avatar, Divider, Tag, Input, message } from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

export default function ProductDetailsPage() {
  const { id } = useParams(); // Get product ID from URL params
  const { auth } = useAuth(); // Get authentication context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swapMessage, setSwapMessage] = useState(""); // Input for swap message
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
      <div className="grid grid-cols-12 gap-4 max-w-6xl w-full">
        {/* Left Section */}
        <div className="col-span-12 lg:col-span-5 relative">
          {/* Used Product Tag */}
          <Tag
            color="red"
            className="absolute top-4 left-4 text-lg font-semibold px-4 py-2 rounded-lg shadow-md"
          >
            Used Product
          </Tag>
          {/* For Swap Tag */}
          <Tag
            color="blue"
            className="absolute top-16 left-4 text-lg font-semibold px-4 py-2 rounded-lg shadow-md"
          >
            For Swap
          </Tag>
          <Card className="overflow-hidden bg-gray-200 rounded-lg shadow-md">
            <img
              src={product.imagecover}
              alt={product.name}
              className="w-full h-80 object-cover"
            />
          </Card>
        </div>

        {/* Right Section */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="p-6 bg-white shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <Title level={3} className="text-purple-600">
                ${product.price}
              </Title>
              <div className="flex items-center gap-2">
                <Tag color="red" className="font-semibold px-4 py-1">
                  FOR SWAP
                </Tag>
              </div>
            </div>

            <Divider />

            {/* Product Details */}
            <Title level={4}>{product.name}</Title>
            <Text className="block mb-4 text-gray-600">{product.description}</Text>

            <div className="flex items-center gap-4 mb-6">
              <Avatar
                size={50}
                src="https://via.placeholder.com/50"
                alt="Category Avatar"
              />
              <div className="text-center">
                <Text className="block font-semibold">{product.category?.name}</Text>
              </div>
            </div>

            {/* Swap Request */}
            <Input.TextArea
              rows={4}
              value={swapMessage}
              onChange={(e) => setSwapMessage(e.target.value)}
              placeholder="Enter your message for the swap request"
              className="mb-4"
            />
            <Button
              type="primary"
              block
              size="large"
              onClick={handleSwapRequest}
              className="mt-4 bg-gray-900 hover:bg-gray-800"
            >
              Send Swap Request
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
