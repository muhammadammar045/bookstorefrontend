import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";

const apiToggleProductLike = async (productId, accessToken) => {
    try {
        const { data } = await axios.post(`/likes/toggle/p/${productId}`, {}, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiToggleReviewLike = async (reviewId, accessToken) => {
    try {
        const { data } = await axios.post(`/likes/toggle/r/${reviewId}`, {}, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchAllLikedProducts = async (accessToken) => {
    try {
        const { data } = await axios.get('/likes/liked-products', getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export {
    apiToggleProductLike,
    apiToggleReviewLike,
    apiFetchAllLikedProducts
};
