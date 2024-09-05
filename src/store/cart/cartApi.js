import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";


export const apiAddProductToCart = async (productId, accessToken) => {
    try {
        const { data } = await axios.patch(
            `/cart/add-product-to-cart/${productId}`,
            {},
            getAuthConfig(accessToken)
        );
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiFetchUserCart = async (accessToken) => {
    try {
        const { data } = await axios.get(
            `/cart/get-user-cart`,
            getAuthConfig(accessToken)
        );
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiRemoveProductFromCart = async (productId, accessToken) => {
    try {
        const { data } = await axios.patch(
            `/cart/remove-product-from-cart/${productId}`,
            {},
            getAuthConfig(accessToken)
        );
        return data;
    } catch (error) {
        throw error;
    }
};
