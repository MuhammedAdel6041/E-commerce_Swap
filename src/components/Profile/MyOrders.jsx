import { Card, Avatar, Typography, Button, List } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const { Text } = Typography;

const MyOrders = () => {
  const orderItems = [
    {
      title:
        "iPhone 15 Pro Max 512GB Natural Titanium 5G With FaceTime - Middle East Version",
      description: "Blue Titanium - 512GB - Middle Eastern Version",
      quantity: 2,
    },
    {
      title:
        "iPhone 15 Pro Max 512GB Natural Titanium 5G With FaceTime - Middle East Version",
      description: "Blue Titanium - 512GB - Middle Eastern Version",
      quantity: 2,
    },
  ];
  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>My Orders</span>
          <Link to={"/me/myorders"}>See All</Link>
        </div>
      }
      style={{ marginTop: 16 }}
      className="container m-auto"
    >
      <Helmet>
        <title> DealHunt - My Orders</title>
      </Helmet>
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
      {/* <Text type="secondary">+2 more items</Text> */}
      <Text type="secondary" style={{ float: "right" }}>
        {/* Order ID: 664678 */}
      </Text>
    </Card>
  );
};
export default MyOrders;
