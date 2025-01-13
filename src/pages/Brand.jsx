import { useEffect, useState } from "react";
import { Card, Col, Row, Typography, message, Spin } from "antd";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const { Title, Text } = Typography;

export default function BrandPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth(); // Access authentication state

  useEffect(() => {
    const fetchBrands = async () => {
      if (!auth.token) {
        message.warning("You need to log in to view brands.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://e-commerce-api-v1-cdk5.onrender.com/api/v1/brands/",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Include token in headers
            },
          }
        );
        setBrands(response.data.data || []); // Fallback to empty array
      } catch (error) {
        console.error("Error fetching brands:", error);
        message.error("Failed to load brands.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [auth.token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!auth.token) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography.Text type="danger">Access denied. Please log in.</Typography.Text>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="text-center mb-6">
        Brands
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {brands.map((brand) => (
          <Col key={brand._id || brand.name} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="rounded-lg shadow-md overflow-hidden"
              cover={
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img
                    alt={brand.name || "Brand"}
                    src={brand.image || "https://via.placeholder.com/150"}
                    className="h-36 object-contain"
                  />
                </div>
              }
            >
              <div className="text-center">
                <Text strong className="text-lg">
                  {brand.name || "Unknown Brand"}
                </Text>
                <p className="text-sm text-gray-500 mt-2">
                  {brand.description || "High-quality and trusted brand"}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
