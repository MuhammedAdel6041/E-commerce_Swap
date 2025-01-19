import { Button, Col, Image, Row, Tag, Typography, message, Input, Spin } from 'antd';
import { DeleteOutlined, ThunderboltOutlined, ClearOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export default function CartProduct() {
    const { displayUserCart, deleteFromCart, updateCartQuantity, applyCoupon, clearCart } = useContext(CartContext);
    const queryClient = useQueryClient(); // For refetching data after mutations

    const { data, isLoading } = useQuery('cartProducts', displayUserCart);
    const cartItems = data?.data?.data?.cartItems || []; // Default to an empty array

    const [couponCode, setCouponCode] = useState(""); // State to hold coupon code
    const [isCouponApplied, setIsCouponApplied] = useState(false); // To track if coupon is applied
    const [discountedTotal, setDiscountedTotal] = useState(0); // To hold the total price after discount

    const { Title, Text } = Typography;

    // Deduplicate cart items
    const deduplicatedCart = cartItems.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.product._id === item.product._id);
        if (existingItem) {
            existingItem.quantity += item.quantity; // Combine quantities
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);

    // Calculate total price
    const calculateTotalPrice = () => {
        return deduplicatedCart.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    };

    // Get the total price before discount
    const totalPrice = calculateTotalPrice();

    // Delete item mutation
    const deleteMutation = useMutation(deleteFromCart, {
        onSuccess: () => {
            message.success('Item removed from cart');
            queryClient.invalidateQueries('cartProducts'); // Refetch cart data
        },
        onError: () => {
            message.error('Failed to remove item from cart');
        }
    });

    // Clear cart mutation
    const clearCartMutation = useMutation(clearCart, {
        onSuccess: () => {
            message.success('Cart cleared successfully');
            queryClient.invalidateQueries('cartProducts'); // Refetch cart data
        },
        onError: () => {
            message.error('Failed to clear cart');
        }
    });

    // Update quantity mutation
    const updateQuantityMutation = useMutation(({ cartItemId, quantity }) => 
        updateCartQuantity(cartItemId, quantity), {
        onSuccess: () => {
            message.success('Quantity updated');
            queryClient.invalidateQueries('cartProducts'); // Refetch cart data
        },
        onError: () => {
            message.error('Failed to update quantity');
        }
    });

    // Apply coupon mutation
    const applyCouponMutation = useMutation(applyCoupon, {
        onSuccess: (response) => {
            setIsCouponApplied(true);
            // Assuming response contains the discount amount
            const discount = response.data.discount || 0; // Adjust according to your API response
            const newTotal = totalPrice - discount;
            setDiscountedTotal(newTotal > 0 ? newTotal : 0); // Ensure the total doesn't go below 0
            message.success('Coupon applied successfully!');
            queryClient.invalidateQueries('cartProducts'); // Refetch cart data
        },
        onError: () => {
            message.error('Failed to apply coupon');
        }
    });

    const handleDelete = (cartItemId) => {
        deleteMutation.mutate(cartItemId);
    };

    const handleClearCart = () => {
        clearCartMutation.mutate();
    };

    const handleUpdateQuantity = (cartItemId, quantity) => {
        if (quantity < 1) {
            message.warning("Quantity can't be less than 1");
            return;
        }
        updateQuantityMutation.mutate({ cartItemId, quantity });
    };

    const handleApplyCoupon = () => {
        if (couponCode) {
            applyCouponMutation.mutate(couponCode);
        } else {
            message.warning('Please enter a valid coupon code');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="p-4">
            <Button 
                type="danger" 
                icon={<ClearOutlined />} 
                onClick={handleClearCart} 
                className="mb-4"
            >
                Clear Cart
            </Button>

            <Row gutter={16}>
                <Col xs={24} md={16}>
                    {deduplicatedCart.length > 0 ? (
                        <>
                            {deduplicatedCart.map((item) => (
                                <div
                                    key={item._id} // Use a unique key for each cart item
                                    className="p-4 m-4 border rounded-lg relative shadow"
                                >
                                    <Row gutter={[16, 16]} align="middle" className="flex-wrap">
                                        {/* Image Section */}
                                        <Col
                                            xs={24}
                                            sm={8}
                                            md={6}
                                            lg={4}
                                            className="relative flex justify-center"
                                        >
                                            <Image
                                                width={120}
                                                src={item.product.imagecover} // Use item product image
                                                alt={item.product.name} // Use item product name
                                                className="rounded-lg"
                                            />
                                            {/* Floating Delete Button */}
                                            <Button
                                                className="absolute bottom-2 right-2 bg-black opacity-70 text-white hover:opacity-90"
                                                icon={<DeleteOutlined />}
                                                onClick={() => handleDelete(item._id)} // Call delete handler
                                            />
                                        </Col>

                                        {/* Info Section */}
                                        <Col xs={24} sm={16} md={18} lg={20}>
                                            <Title
                                                level={3}
                                                className="text-lg sm:text-xl md:text-2xl lg:text-3xl"
                                            >
                                                {item.product.name} {/* Product name */}
                                            </Title>
                                            <Text
                                                type="secondary"
                                                className="block text-sm sm:text-base"
                                            >
                                                {item.product.description || 'Product description not available'}
                                            </Text>

                                            <div className="flex flex-wrap items-center mt-2 space-x-2">
                                                <Tag color="#2db7f5">
                                                    <ThunderboltOutlined /> Fast Shipping
                                                </Tag>
                                                <Text className="text-black text-sm sm:text-base">
                                                    Get it by {new Date().toLocaleDateString()} {/* Placeholder delivery date */}
                                                </Text>
                                            </div>

                                            {/* Quantity and Price Controls */}
                                            <Row gutter={[16, 16]} className="py-2 items-center">
                                                {/* Quantity Controls */}
                                                <Col xs={12} sm={8} md={6} className="flex">
                                                    <Button
                                                        className="px-3 py-1 text-lg font-bold"
                                                        type="text"
                                                        onClick={() =>
                                                            handleUpdateQuantity(item._id, item.quantity - 1)
                                                        } // Decrease quantity
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="px-4 text-lg">{item.quantity}</span>
                                                    <Button
                                                        className="px-3 py-1 text-lg font-bold"
                                                        type="text"
                                                        onClick={() =>
                                                            handleUpdateQuantity(item._id, item.quantity + 1)
                                                        } // Increase quantity
                                                    >
                                                        +
                                                    </Button>
                                                </Col>

                                                {/* Price Section */}
                                                <Col xs={12} sm={16} md={18} className="text-right">
                                                    <Text className="text-main text-xl font-bold">
                                                        <Text className="p-2" type="secondary">
                                                            EGP
                                                        </Text>
                                                        {(item.product.price * item.quantity).toFixed(2)} {/* Total price */}
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            ))}

                            {/* Coupon Section */}
                            <div className="mt-4">
                                <Input
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter coupon code"
                                    className="w-full mb-2"
                                />
                                <Button
                                    type="primary"
                                    onClick={handleApplyCoupon}
                                    disabled={isCouponApplied}
                                    className="w-full"
                                >
                                    Apply Coupon
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Text type="secondary" className="text-center block">
                            Your cart is empty.
                        </Text>
                    )}
                </Col>

                <Col xs={24} md={8}>
                    <div className="p-4 border rounded-lg shadow mt-4 md:mt-0">
                        <Title level={4} className="text-center mb-4">Order Summary</Title>
                        <Text className="block text-lg font-bold">Total Price:</Text>
                        <Text className="text-main text-2xl font-bold">
                            <Text className="p-2" type="secondary">
                                EGP
                            </Text>
                            {isCouponApplied ? discountedTotal.toFixed(2) : totalPrice.toFixed(2)} {/* Display discounted total */}
                        </Text>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
