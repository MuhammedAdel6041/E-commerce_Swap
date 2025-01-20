import { Button, Col, Row, Typography, Modal, message, Spin, Card, Space } from 'antd';
import { useState, useEffect, useContext } from 'react';
import { ExclamationCircleOutlined, DeleteOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import NewAddress from './NewAddress';
import { useAuth } from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { CartContext } from '../../context/CartContext'; // Import CartContext
import { useNavigate } from 'react-router-dom';

export default function Address() {
    const { Title, Text } = Typography;
    const navigate = useNavigate(); // Initialize useNavigate
    const { confirm } = Modal;
    const { auth } = useAuth();
    const queryClient = useQueryClient();
    const { displayUserCart } = useContext(CartContext);

    const [isModal2Open, setIsModal2Open] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const productId = "64beba5738189e96e6b9e726"; // Hardcoded productId

    // Fetch user addresses
    const { data, isLoading, isError } = useQuery(
        'userAddresses',
        async () => {
            const response = await axios.post(
                'https://e-commerce-api-v1-cdk5.onrender.com/api/v1/address/',
                { productId },
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );
            return response.data;
        },
        { enabled: !!auth.token }
    );

    // Fetch cart items
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartItems = await displayUserCart();
                console.log("Cart Items:", cartItems?.data?.data?._id);
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            }
        };

        fetchCartItems();
    }, [displayUserCart]);

    // Add new address mutation
    const addAddressMutation = useMutation(
        async (newAddress) => {
            await axios.post(
                'https://e-commerce-api-v1-cdk5.onrender.com/api/v1/address/',
                { ...newAddress, productId },
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );
        },
        {
            onSuccess: () => {
                message.success('Address added successfully');
                queryClient.invalidateQueries('userAddresses');
                setIsModal2Open(false);
            },
            onError: () => {
                message.error('Failed to add address');
            },
        }
    );

    // Delete address mutation
    const deleteAddressMutation = useMutation(
        async (addressId) => {
            await axios.delete(
                `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/address/${addressId}`,
                {
                    headers: { Authorization: `Bearer ${auth.token}` },
                    data: { productId },
                }
            );
        },
        {
            onSuccess: () => {
                message.success('Address deleted successfully');
                queryClient.invalidateQueries('userAddresses');
            },
            onError: () => {
                message.error('Failed to delete address');
            },
        }
    );

    // Create order mutation
    const createOrderMutation = useMutation(
        async ({ cartId, address }) => {
            await axios.post(
                `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/orders/${cartId}`, // Cart ID in the URL
                {
                    shippingAddress: {
                        details: address.alias,
                        phone: address.phone,
                        city: address.city,
                        postalCode: address.postalCode || '', // Default postal code if not provided
                    },
                },
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );
        },
        {
            onSuccess: () => {
                message.success('Order created successfully');
                navigate('/profile/myorders'); // Navigate to the orders page
            },
            onError: () => {
                message.error('Failed to create order');
            },
        }
    );

    const handleCreateOrder = async () => {
        if (!selectedAddress) {
            message.error('Please select an address first');
            return;
        }

        try {
            const cartItems = await displayUserCart();
            const cartId = cartItems?.data?.data?._id;
            if (!cartId) {
                message.error('No cart found');
                return;
            }

            createOrderMutation.mutate({ cartId, address: selectedAddress });
        } catch (error) {
            console.error('Failed to fetch cart or create order:', error);
        }
    };

    const handleDelete = (addressId) => {
        confirm({
            title: 'Are you sure you want to delete this address?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => deleteAddressMutation.mutate(addressId),
        });
    };

    const handleAddNewAddress = (addressData) => {
        addAddressMutation.mutate(addressData);
    };

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    };

    const addresses = Array.isArray(data?.data)
        ? data.data.filter((address) => address.alias && address.phone && address.city)
        : [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (isError) {
        return <Text type="danger">Failed to load addresses. Please try again later.</Text>;
    }

    return (
        <>
            <Row className="p-5 m-4 border rounded-lg">
                <Col xs={24} md={24} className="p-4 flex justify-between">
                    <Title level={4}>Shipping Address</Title>
                    <Button
                        type="primary"
                        style={{ backgroundColor: '#E93D82', borderColor: '#E93D82', color: '#fff' }}
                        onClick={() => setIsModal2Open(true)}
                    >
                        Add New Address
                    </Button>
                </Col>
                <Col xs={24} md={24} className="p-4">
                    <Row gutter={[16, 16]}>
                        {addresses.length > 0 ? (
                            addresses.map((address) => (
                                <Col xs={24} sm={12} lg={8} key={address._id}>
                                    <Card
                                        hoverable
                                        bordered={false}
                                        className={`shadow-sm rounded-lg ${selectedAddress?._id === address._id ? 'border border-blue-500' : ''}`}
                                        style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}
                                        onClick={() => handleAddressSelect(address)}
                                    >
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <div className="flex justify-between">
                                                <Title level={5} style={{ marginBottom: 0 }}>
                                                    {address.alias}
                                                </Title>
                                            </div>
                                            <Space direction="vertical" size="small">
                                                <Text>
                                                    <EnvironmentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                                                    {address.city}
                                                </Text>
                                                <Text>
                                                    <PhoneOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                                                    {address.phone}
                                                </Text>
                                            </Space>
                                            <Button
                                                danger
                                                type="text"
                                                icon={<DeleteOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(address._id);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Space>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Text type="secondary">No addresses found. Add a new address.</Text>
                        )}
                    </Row>
                </Col>
            </Row>

            <NewAddress
                isOpen={isModal2Open}
                onClose={() => setIsModal2Open(false)}
                onSave={handleAddNewAddress}
            />

            {selectedAddress && (
                <div className="p-5">
                    <Title level={5}>Selected Address:</Title>
                    <Text>{selectedAddress.alias}</Text>
                    <Text>{selectedAddress.city}</Text>
                    <Text>{selectedAddress.phone}</Text>
                    <Button
                        type="primary"
                        onClick={handleCreateOrder}
                        style={{ backgroundColor: '#E93D82', borderColor: '#E93D82', color: '#fff', marginTop: '10px' }}
                    >
                        Create Order
                    </Button>
                </div>
            )}
        </>
    );
}
