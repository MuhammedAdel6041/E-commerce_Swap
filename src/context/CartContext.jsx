/* eslint-disable react-refresh/only-export-components */

import PropTypes from 'prop-types';
import { createContext } from "react";
import axios from "axios";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const userToken = localStorage.getItem('authToken');
    const headers = {
        Authorization: `Bearer ${userToken}`,
        Token: userToken
    };

    // Add to Cart
    function addToCart(productId) {
        return axios.post(
            `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/cart`,
            { productId: productId },
            { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    // Display User Cart
    function displayUserCart() {
        return axios.get(
            `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/cart/`,
            { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    // Delete from Cart
    function deleteFromCart(cartItemId) {
        return axios.delete(
            `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/cart/${cartItemId}`,
            { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    // Update Quantity
    function updateCartQuantity(cartItemId, quantity) {
        return axios.put(
            `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/cart/${cartItemId}`,
            { quantity: quantity }, // Payload for quantity update
            { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    // Apply Coupon
    function applyCoupon(couponCode) {
        return axios.put(
            `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/cart/`,
            { coupon: couponCode }, // Payload for applying coupon
            { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    return (
        <CartContext.Provider value={{
            addToCart,
            displayUserCart,
            deleteFromCart,
            updateCartQuantity,
            applyCoupon // Export the new function
        }}>
            {props.children}
        </CartContext.Provider>
    );
}

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
