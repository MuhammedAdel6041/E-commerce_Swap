import { Button, Col, Image, Row, Tag, Typography, message, Input, Spin, Divider, Modal } from 'antd';
import { DeleteOutlined, ThunderboltOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export default function CartProduct() {
    const { displayUserCart, deleteFromCart, updateCartQuantity } = useContext(CartContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery('cartProducts', displayUserCart);
    const cartItems = data?.data?.data?.cartItems || [];
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const { confirm } = Modal;
    const { Title, Text } = Typography;

    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const deleteMutation = useMutation(deleteFromCart, {
        onSuccess: () => {
            message.success('Item removed from cart');
            queryClient.invalidateQueries('cartProducts');
        },
        onError: () => {
            message.error('Failed to remove item from cart');
        }
    });

    const updateQuantityMutation = useMutation(({ cartItemId, quantity }) =>
        updateCartQuantity(cartItemId, quantity), {
        onSuccess: () => {
            message.success('Quantity updated');
            queryClient.invalidateQueries('cartProducts');
        },
        onError: () => {
            message.error('Failed to update quantity');
        }
    });

    const handleDelete = (cartItemId) => {
        confirm({
            title: 'Are you sure you want to remove this item?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteMutation.mutate(cartItemId);
            },
            onCancel() {
                message.info('Remove action cancelled');
            },
        });
    };

    const handleUpdateQuantity = (cartItemId, quantity) => {
        if (quantity < 1) {
            message.warning("Quantity can't be less than 1");
            return;
        }
        updateQuantityMutation.mutate({ cartItemId, quantity });
    };

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            message.warning('Please enter a valid coupon code');
            return;
        }

        setIsCouponApplied(true);
        const discount = 50; // Mock discount value
        const discountedTotalValue = totalPrice - discount;
        setDiscountedTotal(discountedTotalValue > 0 ? discountedTotalValue : 0);
        message.success('Coupon applied successfully!');
    };

    // Spinner while loading cart items
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Row gutter={16} className="p-4">
            <Col md={24}>
                <Title>
                    Cart Items{' '}
                    <span style={{ fontWeight: 'normal', fontSize: '16px' }}>
                        ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
                    </span>
                </Title>
            </Col>
            <Col xs={24} md={16}>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="p-4 m-4 border rounded-lg relative shadow"
                        >
                            <Row gutter={[16, 16]} align="middle">
                                <Col xs={24} sm={8} md={6}>
                                    <Image
                                        width={120}
                                        src={item.product.imagecover}
                                        alt={item.product.name}
                                        className="rounded-lg"
                                    />
                                </Col>
                                <Col xs={24} sm={16} md={18}>
                                    <Title level={4}>{item.product.name}</Title>
                                    <Text type="secondary">{item.product.description || 'No description available'}</Text>
                                    <div className="mt-2">
                                        <Tag color="#2db7f5">
                                            <ThunderboltOutlined /> Fast Shipping
                                        </Tag>
                                    </div>
                                    <Row className="mt-3" align="middle" gutter={16}>
                                        <Col>
                                            <Button
                                                type="text"
                                                onClick={() =>
                                                    handleUpdateQuantity(item._id, item.quantity - 1)
                                                }
                                                disabled={isCouponApplied}
                                            >
                                                -
                                            </Button>
                                            <Text className="px-2">{item.quantity}</Text>
                                            <Button
                                                type="text"
                                                onClick={() =>
                                                    handleUpdateQuantity(item._id, item.quantity + 1)
                                                }
                                                disabled={isCouponApplied}
                                            >
                                                +
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Text strong>{`EGP ${(item.product.price * item.quantity).toFixed(2)}`}</Text>
                                        </Col>
                                    </Row>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDelete(item._id)}
                                        danger
                                        className="mt-3"
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    ))
                ) : (
                    <Text type="secondary">Your cart is empty.</Text>
                )}
            </Col>
            <Col xs={24} md={8}>
                <div className="p-4 border rounded-lg bg-white shadow">
                    <Title level={4}>Order Summary</Title>
                    <Divider />
                    <Row>
                        <Col span={12}>
                            <Text type="secondary">Subtotal:</Text>
                        </Col>
                        <Col span={12} className="text-right">
                            <Text>{`EGP ${totalPrice.toFixed(2)}`}</Text>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col span={12}>
                            <Text type="secondary">Discount:</Text>
                        </Col>
                        <Col span={12} className="text-right">
                            <Text>{isCouponApplied ? `EGP 50.00` : `EGP 0.00`}</Text>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col span={12}>
                            <Text type="secondary">Total:</Text>
                        </Col>
                        <Col span={12} className="text-right">
                            <Text strong>{`EGP ${(isCouponApplied ? discountedTotal : totalPrice).toFixed(2)}`}</Text>
                        </Col>
                    </Row>
                    <Divider />
                    <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="mb-2"
                    />
                    <Button
                        type="primary"
                        onClick={handleApplyCoupon}
                       
                        className="mb-4 w-full"
                        disabled={cartItems.length === 0} // Disable when the cart is empty
                    >
                        Apply Coupon
                    </Button>
                    <Button
                       color="danger" variant="solid"
                        onClick={() => navigate('/checkout')}
                        className="w-full"
                        disabled={cartItems.length === 0} // Disable when the cart is empty
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            </Col>
        </Row>
    );
}
