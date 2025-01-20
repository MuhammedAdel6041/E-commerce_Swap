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
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AddProductModal from "./AddProductModal"; // Import AddProductModal
import Address from "../Address/Address";
import MyOrders from './MyOrders';

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
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
          <Card
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
            align="center"
            style={{
              borderRadius: "15px",
              overflow: "hidden",
              padding: "20px",
              position: "sticky",
              top: "20px", // Distance from the top of the viewport
              zIndex: 10, // Ensures the card appears above other elements if necessary
            }}
          >
            <Avatar
              size={200}
              src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080"
              style={{
                border: "5px solid white",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              }}
            />
            <div className="flex flex-col items-center gap-3 mt-4">
              <Title
                className="capitalize"
                level={4}
                style={{ margin: 0, color: "white" }}
              >
                {user?.name || "User Name"}
              </Title>
              <Text type="secondary" style={{ color: "#e4e4e4" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <MailOutlined /> {user?.email || "Email"}
                </span>
              </Text>
              <Text type="secondary" style={{ color: "#e4e4e4" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <PhoneOutlined /> {user?.phone || "Phone number"}
                </span>
              </Text>
              <Text type="secondary" style={{ color: "#e4e4e4" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <CalendarOutlined />{" "}
                  {user?.createdAt
                    ? `Joined ${new Date(user.createdAt).toLocaleDateString()}`
                    : "Joined date"}
                </span>
              </Text>
            </div>
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
                
              >
                <MyOrders/>
              </Card>
            </Col>
            <Col xs={24}>
         <Address/>
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
