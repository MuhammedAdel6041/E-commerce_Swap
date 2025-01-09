import {
    Typography,
    Col,
    Row,
    Breadcrumb,
    Button,
    Divider,
} from 'antd';

import Address from '../components/Address/Address';

export default function CheckOut() {
    const { Title, Text } = Typography;

    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'News', href: '/news' }
    ];

    return (
        <>
            <Row className="p-4">

                {/* Breadcrumb Section */}
                <Col span={24}>
                    <Breadcrumb className="m-3 p-3" items={breadcrumbItems} />
                </Col>

                {/* Main Content: Cart Items + Order Summary */}
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        {/* Cart Items Section */}
                        <Col xs={24} md={18} className="p-4">
                            <Address />
                        </Col>

                        {/* Order Summary Section */}
                        <Col
                            xs={24}
                            md={6}
                            className="p-4 border border-gray-200 rounded-md bg-white self-start"
                        >
                            <Row gutter={[16]}>
                                <Col span={24}>
                                    <Title level={4}>Order Summary</Title>
                                </Col>


                                {/* Summary Items */}
                                <Col span={24} className="my-4">
                                    <Row className="p-3">
                                        {/* Subtotal Section */}
                                        <Col span={24} className="my-2">
                                            <Row align="middle" gutter={[8, 8]}>
                                                <Col xs={12} sm={8}>
                                                    <Text type="secondary" className="text-base sm:text-lg">
                                                        Subtotal
                                                    </Text>
                                                </Col>
                                                <Col xs={12} sm={8} offset={4} className="text-right">
                                                    <Text type="secondary" className="text-base sm:text-lg">
                                                        EGP <span className="text-gray-500 font-medium">128</span>
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        {/* Shipping Section */}
                                        <Col span={24} className="my-2">
                                            <Row align="middle" gutter={[8, 8]}>
                                                <Col xs={12} sm={8}>
                                                    <Text type="secondary" className="text-base sm:text-lg">
                                                        Shipping
                                                    </Text>
                                                </Col>
                                                <Col xs={12} sm={8} offset={4} className="text-right">
                                                    <Text type="secondary" className="text-base sm:text-lg">
                                                        EGP <span className="text-gray-500 font-medium">32</span>
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Divider />

                                        {/* Total Section */}
                                        <Col span={24}>
                                            <Row align="middle" gutter={[8, 8]}>
                                                <Col xs={12}>
                                                    <Title level={4} className="text-base sm:text-xl">
                                                        Total <Text type="secondary">(Including VAT)</Text>
                                                    </Title>
                                                </Col>
                                                <Col xs={12} className="text-right">
                                                    <Text className="text-main text-lg sm:text-xl font-bold">
                                                        <Text className="p-2" type="secondary">
                                                            EGP
                                                        </Text>
                                                        620.00
                                                    </Text>
                                                </Col>

                                                {/* Checkout Button */}
                                                <Col span={24} className="mt-4">
                                                    <Button
                                                        size="large"
                                                        className='w-full'
                                                        style={{ backgroundColor: '#E93D82', borderColor: '#E93D82', color: '#fff' }}
                                                    >
                                                        Checkout
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}
