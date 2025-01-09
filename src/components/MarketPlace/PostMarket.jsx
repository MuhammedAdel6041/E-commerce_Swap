import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
  InputNumber,
  Radio,
  Card,
  Typography,
  theme,
} from "antd";
import { HeartOutlined, BulbOutlined } from "@ant-design/icons";
// import { useState } from "react";
import UploadImages from "./UploadImages";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const { useToken } = theme;

const PostProduct = () => {
  const { token } = useToken();

  // Function to handle image change

  return (
    <Layout style={{ minHeight: "100vh", background: token.colorBgContainer }}>
      <Content style={{ padding: token.paddingLG }}>
        {/* <Title level={3}>Preview</Title> */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16} className="m-auto">
            <Form layout="vertical" style={{ width: "100%" }}>
              <Title level={4}>Basic Information</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="Category">
                    <Select placeholder="Main Category">
                      <Option value="category">Main Category</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Name">
                    <Input placeholder="Enter Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="Brand">
                    <Input placeholder="Enter Brand" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Status">
                    <Select placeholder="Used">
                      <Option value="used">Used</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="Quantity">
                    <Select placeholder="1">
                      <Option value="1">1</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Description">
                <Input.TextArea rows={4} placeholder="Enter Description" />
              </Form.Item>
              <Title level={4}>Product Images</Title>
              <UploadImages />
              <Card
                style={{
                  marginTop: token.marginMD,
                  background: token.colorInfoBg,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BulbOutlined
                    style={{ fontSize: 24, marginRight: token.marginSM }}
                  />
                  <Text>
                    Tip: Use high-quality, well-lit images to showcase your
                    product's best features and attract more buyers.
                  </Text>
                </div>
              </Card>
              <Title level={4} style={{ marginTop: token.marginLG }}>
                Payment
              </Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Button style={{ width: "100%" }}>Cash</Button>
                </Col>
                <Col xs={24} md={12}>
                  <Button style={{ width: "100%" }}>Swap</Button>
                </Col>
              </Row>
              <Form.Item label="Amount">
                <InputNumber
                  style={{ width: "100%" }}
                  addonBefore="EGP"
                  placeholder="Enter Price"
                />
              </Form.Item>
              <Form.Item>
                <Radio.Group>
                  <Radio value="fixed">Fixed Price</Radio>
                  <Radio value="negotiable">Negotiable</Radio>
                </Radio.Group>
              </Form.Item>
              <Title level={4}>Delivery</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Button style={{ width: "100%" }}>Meet-up</Button>
                </Col>
                <Col xs={24} md={12}>
                  <Button style={{ width: "100%" }}>Shipping</Button>
                </Col>
              </Row>
              <Form.Item label="Location">
                <Input placeholder="Enter Location" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="large" block>
                  Post Now
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default PostProduct;
