// /* eslint-disable react/prop-types */
// import { createContext } from "react";
// import axios from "axios";

// export let WhisListContext = createContext();  // Keep the name consistent with your import

// export default function WishlistContextProvider(props) {
//     const userToken = localStorage.getItem('authToken');
//     const headers = {
//         Authorization: `Bearer ${userToken}`,
//     };

//     // Add to Wishlist
//     function addToWishlist(productId) {
//         return axios
//             .post(
//                 `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/wishlist/`,
//                 { productId: productId },
//                 { headers: headers }
//             )
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.error("Add to Wishlist Error:", error.response || error);
//                 throw error;
//             });
//     }

//     // Display User Wishlist
//     function displayUserWishlist() {
//         return axios
//             .get(
//                 `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/wishlist/`,
//                 { headers: headers }
//             )
//             .then((response) => response.data)
//             .catch((error) => {
//                 console.error("Error fetching wishlist:", error);
//                 throw error;
//             });
//     }

//     // Delete from Wishlist
//     function deleteFromWishlist(wishlistItemId) {
//         return axios
//             .delete(
//                 `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/wishlist/${wishlistItemId}`,
//                 { headers: headers }
//             )
//             .then((response) => response)
//             .catch((error) => {
//                 console.error("Error deleting from wishlist:", error);
//                 throw error;
//             });
//     }

//     return (
//         <WhisListContext.Provider value={{
//             addToWishlist,
//             displayUserWishlist,
//             deleteFromWishlist
//         }}>
//             {props.children}
//         </WhisListContext.Provider>
//     );
// }
 












/* eslint-disable react-refresh/only-export-components */

import PropTypes from 'prop-types';
import { createContext } from "react";
import axios from "axios";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
    const userToken = localStorage.getItem('authToken');
    const headers = {
        Authorization: `Bearer ${userToken}`,
        Token: userToken
    };

    // Add to Wishlist
    function addToWishlist(productId) {
        return axios
            .post(
                `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/wishlist/`,
                { productId: productId },
                { headers: headers }
            )
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    return response.data; // Return successful response data
                }
                throw new Error("Failed to add product to wishlist");
            })
            .catch((error) => {
                console.error("Add to Wishlist Error:", error.response || error);
                throw new Error(error.response?.data?.message || "Add to Wishlist failed");
            });
    }

    // Display User Wishlist
    function displayUserWishlist() {
        return axios.get(
            `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/wishlist/`,
            { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    // Delete from Wishlist
    function deleteFromWishlist(wishlistItemId) {
        return axios.delete(
            `https://e-commerce-api-v1-cdk5.onrender.com/api/v1/wishlist/${wishlistItemId}`,
            { headers: headers }
        )
        .then((response) => response)
        .catch((error) => error);
    }

    return (
        <WishlistContext.Provider value={{
            addToWishlist,
            displayUserWishlist,
            deleteFromWishlist
        }}>
            {props.children}
        </WishlistContext.Provider>
    );
}

WishlistContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
