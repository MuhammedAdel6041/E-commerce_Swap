 
import { Input, Button, Card, Row, Col, Image, Rate, Typography, Tag } from 'antd';

const { Title, Text, Paragraph } = Typography;

export default function ProductPage() {
    return (
        <div style={{ backgroundColor: '#f5f5f5', padding: '24px' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={3}>DealHunt</Title>
                <Input.Search
                    placeholder="What are you looking for?"
                    style={{ width: '30%' }}
                />
            </div>

            {/* Product Details Section */}
            <Row gutter={24}>
                {/* Image Section */}
                <Col xs={24} lg={12}>
                    <Card bordered={false}>
                        <Image
                            src="/path/to/product-image.jpg"
                            alt="Product"
                            width="100%"
                            preview={false}
                        />
                        <Row gutter={8} style={{ marginTop: '16px' }}>
                            <Col span={6}>
                                <Image
                                    src="/path/to/image1.jpg"
                                    alt="Thumbnail 1"
                                    width="100%"
                                    preview={false}
                                />
                            </Col>
                            <Col span={6}>
                                <Image
                                    src="/path/to/image2.jpg"
                                    alt="Thumbnail 2"
                                    width="100%"
                                    preview={false}
                                />
                            </Col>
                            <Col span={6}>
                                <Image
                                    src="/path/to/image3.jpg"
                                    alt="Thumbnail 3"
                                    width="100%"
                                    preview={false}
                                />
                            </Col>
                            <Col span={6}>
                                <Image
                                    src="/path/to/image4.jpg"
                                    alt="Thumbnail 4"
                                    width="100%"
                                    preview={false}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Details Section */}
                <Col xs={24} lg={12}>
                    <Card bordered={false}>
                        <Title level={2}>iPhone 15 Pro Max 512GB Natural Titanium 5G</Title>
                        <Text type="secondary">Middle East Version</Text>
                        <Title level={3} style={{ color: '#ff4d4f', marginTop: '16px' }}>
                            EGP 72,899.00
                        </Title>
                        <Tag color="green" style={{ marginBottom: '16px' }}>
                            Only 1 left in stock
                        </Tag>
                        <Button type="primary" danger block>
                            Add to Cart
                        </Button>
                    </Card>
                </Col>
            </Row>

            {/* Ratings & Reviews Section */}
            <Card title="Ratings & Reviews" style={{ marginTop: '24px' }}>
                <Row align="middle" gutter={16}>
                    <Col>
                        <Rate disabled defaultValue={4.6} />
                    </Col>
                    <Col>
                        <Text strong>4.6</Text>
                    </Col>
                    <Col>
                        <Text>(860 Ratings)</Text>
                    </Col>
                </Row>
                <Row style={{ marginTop: '16px' }}>
                    <Col span={24}>
                        <Paragraph>
                            <Text strong>Sara Dowood</Text>
                            <br />
                            Amazing! The iPhone 15 is simply a masterpiece...
                        </Paragraph>
                    </Col>
                </Row>
            </Card>

            {/* Similar Products Section */}
            <Card title="You May Also Like" style={{ marginTop: '24px' }}>
                <Row gutter={16}>
                    <Col xs={12} sm={8} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <Image
                                    src="/path/to/sneaker.jpg"
                                    alt="Sneaker"
                                    preview={false}
                                />
                            }
                        >
                            <Text>Nike Air Force 1</Text>
                            <br />
                            <Text strong style={{ color: '#ff4d4f' }}>
                                EGP 620.00
                            </Text>
                        </Card>
                    </Col>
                    <Col xs={12} sm={8} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <Image
                                    src="/path/to/sneaker.jpg"
                                    alt="Sneaker"
                                    preview={false}
                                />
                            }
                        >
                            <Text>Nike Air Force 1</Text>
                            <br />
                            <Text strong style={{ color: '#ff4d4f' }}>
                                EGP 620.00
                            </Text>
                        </Card>
                    </Col>
                    {/* Add more products here */}
                </Row>
            </Card>
        </div>
    );
}
