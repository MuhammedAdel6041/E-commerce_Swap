import {
  Typography,
  Col,
  Row,
  Breadcrumb,
 
} from 'antd';
import CartProduct from '../components/CartProduct/CartProduct';
 

export default function Cart() {
  const { Title, Text } = Typography;

  return (
    <Row className="p-4">
      {/* Breadcrumb Section */}
      <Col span={24}>
        <Breadcrumb className="m-3 p-3" separator=">">
          <Breadcrumb.Item href="/">
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/news">
            <span>News</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>

      {/* Main Content: Cart Items + Order Summary */}
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {/* Cart Items Section */}
          <Col xs={24} md={24} className="p-4">
            <Title level={4}>
              Cart <Text className="text-lg" type="secondary">(3 items)</Text>
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <CartProduct />
               
              </Col>
            </Row>
          </Col>

          {/* Order Summary Section */}
         
        </Row>
      </Col>
    </Row>
  );
}
