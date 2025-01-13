import { useEffect, useState } from "react";
import { Card, Col, Row, Typography, message, Modal, Spin } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-api-v1-cdk5.onrender.com/api/v1/categories/"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        message.error("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCardClick = async (id) => {
    try {
      const response = await axios.get(
        `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/categories/${id}`
      );
      setCategoryDetails(response.data.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching category details:", error);
      message.error("Failed to load category details.");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setCategoryDetails(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="text-center mb-6">
        Categories
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {categories.map((category) => (
          <Col key={category._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="rounded-lg shadow-md"
              cover={
                <img
                  alt={category.name}
                  src={category.image || "https://via.placeholder.com/150"}
                  className="h-48 object-cover w-full rounded-t-lg"
                />
              }
              onClick={() => handleCardClick(category._id)}
            >
              <Card.Meta
                title={<Text strong>{category.name}</Text>}
                description={
                  <Text type="secondary">
                    {category.description || "No description available."}
                  </Text>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={categoryDetails?.name}
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {categoryDetails ? (
          <div>
            <p>
              <Text strong>Description: </Text>
              {categoryDetails.description || "No description available."}
            </p>
            <img
              src={categoryDetails.image || "https://via.placeholder.com/300"}
              alt={categoryDetails.name}
              className="w-full h-60 object-cover rounded-lg"
            />
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </div>
  );
}
