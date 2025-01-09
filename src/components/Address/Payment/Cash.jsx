import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";



export default function Cash() {
  const { Text } = Typography;
  return (
    <>
      <Row>
        <Col span={24} className="flex justify-center  items-center">
          <ExclamationCircleOutlined className="text-gray-500 mx-2 text-lg" />
          <Text type="secondary">You will be charged an additional EGP 20.00 for using this payment method.</Text>
        </Col>
      </Row>
    </>
  )
}
