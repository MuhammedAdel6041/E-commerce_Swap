import { Button, Col, Row, Typography, Modal, Dropdown, Space, Tag } from 'antd';
import { useState } from 'react';
import NewAddress from './NewAddress';
import { MoreOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { TbIrregularPolyhedron } from "react-icons/tb";
import Payment from './Payment/Payment';
 
export default function Address() {
    const { Title, Text } = Typography;

    const [isModal1Open, setIsModal1Open] = useState(false); // State for Modal 1
    const [isModal2Open, setIsModal2Open] = useState(false); // State for Modal 2 (passed to NewAddress)

    const handleModal1Ok = () => {
        setIsModal1Open(false);
    };

    const handleModal1Cancel = () => {
        setIsModal1Open(false);
    };

    const menuItems = [
        {
            key: '1',
            label: 'Edit',
        },
        {
            key: '2',
            label: 'Delete',
        },
    ];

    return (
        <>
            {/* First  Section */}
            <Row className="p-5 m-4 border rounded-lg ">
                <Col xs={24} md={24} className="p-4 flex justify-between">
                    <Title level={4}>Shipping Address</Title>
                    <Button type="primary" style={{ backgroundColor: '#E93D82', borderColor: '#E93D82', color: '#fff' }} onClick={() => setIsModal1Open(true)}>
                        Shipping Addresses
                    </Button>
                </Col>
                <Col xs={24} md={24} className="p-4">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Col xs={24} md={24} className="p-3  w-full border rounded-lg relative">

                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Title level={5} className="m-0">
                                            Home
                                        </Title>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className="text-gray-600">
                                            10 Al-Ahram Street, Dokki, Giza. Ground Floor, Unit 3.
                                        </Text>
                                    </Col>
                                </Row>

                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col xs={24} md={24} className="p-3 w-full border rounded-lg relative">

                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Title level={5} className="m-0">
                                            Office
                                        </Title>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Text className="text-gray-600">
                                            10 Al-Ahram Street, Dokki, Giza. Ground Floor, Unit 3.
                                        </Text>
                                    </Col>
                                </Row>

                            </Col>
                        </Col>
                    </Row>
                </Col>

            </Row>
            {/* Second Section */}
            <Row className="p-5 m-4 border rounded-lg bg-white ">
                {/* Header Section */}
                <Col xs={24} className="p-4 flex justify-between items-center">
                    {/* Left Section */}
                    <Space className="flex items-center">
                        <Title level={4} className="m-0 text-black">
                            Shipment 1 of 2
                        </Title>
                        <Text type="secondary">(4 items)</Text>
                    </Space>

                    {/* Right Section */}
                    <Space className="flex items-center">
                        <Tag color="cyan" className="flex items-center">
                            <ThunderboltOutlined style={{ marginRight: 4 }} /> Fast Shipping
                        </Tag>
                        <Text type="secondary">Get it by 11 sep</Text>
                    </Space>
                </Col>

                {/* Product Cards Section */}
                <Col xs={24} className="flex gap-4 ">
                    {/* Product Card 1 */}
                    <Col className="border rounded-lg p-4 flex gap-4 items-start w-full" xs={24} md={12}>
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Product"
                            className="rounded-md"
                            style={{ width: 100, height: 100 }}
                        />
                        <div>
                            <Title level={5} className="m-0">iPhone 15 Pro Max 512GB Natural</Title>
                            <Text className="block">Blue Titanium | 512GB | Middle Eastern Version</Text>
                            <Text className="block">x 2</Text>
                        </div>
                    </Col>

                    {/* Product Card 2 */}
                    <Col className="border rounded-lg p-4   flex gap-4 items-start w-full" xs={24} md={12}>
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Product"
                            className="rounded-md"
                            style={{ width: 100, height: 100 }}
                        />
                        <div>
                            <Title level={5} className="m-0">iPhone 15 Pro Max 512GB Natural</Title>
                            <Text className="block">Blue Titanium | 512GB | Middle Eastern Version</Text>
                            <Text className="block">x 2</Text>
                        </div>
                    </Col>
                </Col>
            </Row>
            {/* three Section */}
            <Row className="p-5 m-4 border rounded-lg bg-white">
                {/* Header Section */}
                <Col xs={24} className="p-4 flex justify-between items-center">
                    {/* Left Section */}
                    <Space className="flex items-center">
                        <Title level={4} className="m-0 text-black">
                            Shipment 2 of 2
                        </Title>
                        <Text type="secondary">(4 items)</Text>
                    </Space>

                    {/* Right Section */}
                    <Space className="flex items-center">
                        <Tag className="flex items-center">
                            <TbIrregularPolyhedron className='me-2' />
                            Regular Shipping
                        </Tag>
                        <Text type="secondary">Get it by 11 sep</Text>
                    </Space>
                </Col>

                {/* Product Cards Section */}
                <Col xs={24} className="w-full">
                    {/* Product Card 1 */}
                    <Col className=" w-full border rounded-lg p-4 flex gap-4 items-start" xs={24}>
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Product"
                            className="rounded-md"
                            style={{ width: 100, height: 100 }}
                        />
                        <div>
                            <Title level={5} className="m-0">iPhone 15 Pro Max 512GB Natural</Title>
                            <Text className="block">Blue Titanium | 512GB | Middle Eastern Version</Text>
                            <Text className="block">x 2</Text>
                        </div>
                    </Col>
                </Col>
            </Row>
            {/* Four  Section */}
            <Row className="p-5 m-4 border rounded-lg ">
                <Col xs={24} md={24} className="p-4 flex justify-between">
                    <Title level={4}>Payment</Title>

                </Col>

                <Payment/>
            </Row>
            {/* Shipping Addresses Modal No.1 */}
            <Modal
                title="Shipping Addresses"
                open={isModal1Open}
                onOk={handleModal1Ok}
                onCancel={handleModal1Cancel}
                okText="Save"
                okButtonProps={{
                    style: {
                        backgroundColor: '#E93D82',
                        borderColor: '#E93D82',
                        color: '#fff', // White text
                    },
                }}
            >
                <Row>
                    <Col xs={24} md={24} className="my-2">
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => setIsModal2Open(true)} // Open Modal 2
                            className="w-full"
                            style={{ backgroundColor: '#E93D82', borderColor: '#E93D82', color: '#fff' }}
                        >
                            Add New
                        </Button>
                    </Col>
                    <Col xs={24} md={24} className="p-4 m-2 w-full border rounded-lg relative">

                        <Row justify="space-between" align="middle">
                            <Col>
                                <Title level={5} className="m-0">
                                    Office
                                </Title>
                            </Col>
                            <Col>
                                <Dropdown
                                    menu={{
                                        items: menuItems,
                                    }}
                                    trigger={['click']}
                                    placement="bottomRight"
                                >
                                    <Button
                                        type="text"
                                        icon={<MoreOutlined />}
                                        className="hover:bg-gray-100"
                                    />
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text className="text-gray-600">
                                    10 Al-Ahram Street, Dokki, Giza. Ground Floor, Unit 3.
                                </Text>
                            </Col>
                        </Row>

                    </Col>

                    <Col xs={24} md={24} className="p-4 m-2 w-full border rounded-lg relative">

                        <Row justify="space-between" align="middle">
                            <Col>
                                <Title level={5} className="m-0">
                                    Office
                                </Title>
                            </Col>
                            <Col>
                                <Dropdown
                                    menu={{
                                        items: menuItems,
                                    }}
                                    trigger={['click']}
                                    placement="bottomRight"
                                >
                                    <Button
                                        type="text"
                                        icon={<MoreOutlined />}
                                        className="hover:bg-gray-100"
                                    />
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text className="text-gray-600">
                                    10 Al-Ahram Street, Dokki, Giza. Ground Floor, Unit 3.
                                </Text>
                            </Col>
                        </Row>

                    </Col>

                </Row>
            </Modal>

            {/* Modal 2 (New Address Component) */}
            <NewAddress isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} />
        </>
    );
}
