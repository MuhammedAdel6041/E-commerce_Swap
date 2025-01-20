import   { useState, useEffect } from 'react';
import { Col, Row, Breadcrumb, Spin } from 'antd';
import CartProduct from '../components/CartProduct/CartProduct';

export default function Cart() {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    // Simulate an API call or data fetch with a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

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

      {/* Main Content */}
      <Col span={24}>
        <Spin spinning={loading} size='large'  >
          <Row gutter={[16, 16]}>
            {/* Cart Items Section */}
            <Col xs={24} md={24} className="p-4">
              <Row>
                <Col span={24}>
                  {!loading && <CartProduct />}
                </Col>
              </Row>
            </Col>
            {/* Additional sections like Order Summary can be added here */}
          </Row>
        </Spin>
      </Col>
    </Row>
  );
}
