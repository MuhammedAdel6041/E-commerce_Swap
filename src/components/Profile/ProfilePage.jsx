/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Button,
  List,
  theme,
  Spin,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  EditOutlined,
  RightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AddProductModal from "./AddProductModal"; // Import AddProductModal

const { Content } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

const ProfilePage = () => {
  const { token } = useToken();
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Handle loading state
  const [isModalVisible, setIsModalVisible] = useState(false); // Handle modal visibility

  // Fetch logged-in user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-api-v1-cdk5.onrender.com/api/v1/users/getme",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();

        if (response.ok) {
          setUser(result.data); // Update state with the user data
        } else {
          message.error(result.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        message.error("An error occurred while fetching user data.");
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserData();
  }, []);

  // Static values if some fields are missing
  const favoriteItems = [
    {
      title: "Nike Air Force 1",
      category: "Fashion & Beauty",
      price: "620.00",
    },
  ];

  const orderItems = [
    {
      title:
        "iPhone 15 Pro Max 512GB Natural Titanium 5G With FaceTime - Middle East Version",
      description: "Blue Titanium - 512GB - Middle Eastern Version",
      quantity: 2,
    },
  ];

  const addresses = user?.addresses?.length
    ? user.addresses
    : [
        {
          type: "Home",
          address: "Static Address: 123 Cairo St, Cairo, Egypt",
        },
      ];

  if (loading) {
    return (
      <div className="text-center">
        <Spin size="large" />
      </div>
    );
  }

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAddProductSuccess = () => {
    message.success("Product added successfully!");
    // Refresh data or perform additional actions as needed
  };

  return (
    <Content className="p-6 bg-gray-100">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="bg-white text-black" align="center">
            <Avatar size={200} src="https://placehold.co/200x200" />
            <div className="flex flex-col items-center gap-3">
              <Title level={4} style={{ margin: 0 }}>
                {user?.name || "User Name"}
              </Title>
              <Text type="secondary">{user?.email || "Email"}</Text>
              <Text type="secondary">{user?.phone || "Phone number"}</Text>
              <Text type="secondary">
                {user?.createdAt
                  ? `Joined ${new Date(user.createdAt).toLocaleDateString()}`
                  : "Joined date"}
              </Text>
            </div>
            <Button
              type="link"
              icon={<EditOutlined />}
              style={{ padding: 0, marginTop: token.padding }}
            >
              Edit Details
            </Button>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Favourites</span>
                    <a href="#">See All</a>
                  </div>
                }
              >
                <Row gutter={[16, 16]}>
                  {favoriteItems.map((item, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                      <Card
                        hoverable
                        cover={
                          <img
                            alt={item.title}
                            src="https://placehold.co/240x240"
                          />
                        }
                        actions={[
                          <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                          >
                            Add to cart
                          </Button>,
                        ]}
                      >
                        <Card.Meta
                          title={item.title}
                          description={
                            <div>
                              <Text type="secondary">{item.category}</Text>
                              <Text
                                strong
                                style={{ color: token.colorPrimary }}
                              >
                                {item.price} USD
                              </Text>
                            </div>
                          }
                        />
                        <HeartOutlined
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            fontSize: 20,
                          }}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
            <Col xs={24}>
              <Card
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>My Orders</span>
                    <Link to={"/profile/myorders"}>See All</Link>
                  </div>
                }
                style={{ marginTop: 16 }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={orderItems}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            shape="square"
                            size={64}
                            src="https://placehold.co/64x64"
                          />
                        }
                        title={item.title}
                        description={
                          <div>
                            <Text>{item.description}</Text>
                            <Text>x{item.quantity}</Text>
                          </div>
                        }
                      />
                      <div style={{ textAlign: "right" }}>
                        <Text type="success">Delivered</Text>
                        <Button type="link" icon={<RightOutlined />}>
                          Order details
                        </Button>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24}>
              <Card
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Addresses</span>
                    <Button type="link">Manage</Button>
                  </div>
                }
                style={{ marginTop: 16 }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={addresses}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.type}
                        description={item.address}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                block
                onClick={() => setIsModalVisible(true)}
              >
                Add Product
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <AddProductModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onAddSuccess={handleAddProductSuccess}
      />
    </Content>
  );
};

export default ProfilePage;
