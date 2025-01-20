import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Table,
  Spin,
  Badge,
  Button,
  Tag,
  Modal,
  Descriptions,
  Divider,
} from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { auth } = useAuth();

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.token) return;

      try {
        const response = await axios.get(
          "https://e-commerce-api-v1-cdk5.onrender.com/api/v1/orders",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth.token]);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => (
        <Text strong>
          <ShoppingCartOutlined style={{ marginRight: 8 }} />
          {text}
        </Text>
      ),
    },
    {
      title: "Items",
      dataIndex: "cartItems",
      key: "cartItems",
      render: (items) => (
        <div>
          {items.slice(0, 2).map((item) => (
            <Tag color="blue" key={item.product._id}>
              {item.product.name}
            </Tag>
          ))}
          {items.length > 2 && (
            <Tag color="cyan">+{items.length - 2} more</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalOrderPrice",
      key: "totalOrderPrice",
      render: (price) => <Text strong>${price.toFixed(2)}</Text>,
    },
    {
      title: "Status",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered) => (
        <Badge
          status={isDelivered ? "success" : "error"}
          text={isDelivered ? "Delivered" : "Not Delivered"}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, order) => (
        <Button type="primary" onClick={() => showOrderDetails(order)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="container p-4 m-auto">
      <Helmet>
        <title>DealHunt - My Orders</title>
      </Helmet>
      <Card className="shadow-lg rounded-lg">
        <Title level={3}>My Orders</Title>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={orders}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 5 }}
            style={{ marginTop: 20 }}
          />
        )}
      </Card>

      {/* Modal for Order Details */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal} icon={<CloseOutlined />}>
            Close
          </Button>,
        ]}
        centered
        width={700}
      >
        {selectedOrder && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Order ID">
              <Text>{selectedOrder._id}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Items">
              {selectedOrder.cartItems.map((item) => (
                <div key={item.product._id} style={{ marginBottom: 8 }}>
                  <Text strong>{item.product.name}</Text> -{" "}
                  <Text type="secondary">Qty: {item.quantity}</Text>
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Total Price">
              <Text strong>${selectedOrder.totalOrderPrice.toFixed(2)}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={selectedOrder.isDelivered ? "success" : "error"}
                text={selectedOrder.isDelivered ? "Delivered" : "Not Delivered"}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Delivery Address">
              {selectedOrder.shippingAddress ? (
                <div>
                  <Text strong>Details: </Text>
                  {selectedOrder.shippingAddress.details}
                  <Divider />
                  <Text strong>City: </Text>
                  {selectedOrder.shippingAddress.city}
                  <Divider />
                  <Text strong>Phone: </Text>
                  {selectedOrder.shippingAddress.phone}
                </div>
              ) : (
                "N/A"
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default MyOrders;
