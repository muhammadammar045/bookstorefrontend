import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";

const apiAddReview = async (productId, reviewData, accessToken) => {
    try {
        const { data } = await axios.post(`/reviews/add-review/${productId}`, reviewData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchAllProductReviews = async (productId, accessToken) => { // Added missing productId parameter
    try {
        const { data } = await axios.get(`/reviews/get-product-reviews/${productId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchReview = async (reviewId, accessToken) => {
    try {
        const { data } = await axios.get(`/reviews/get-review/${reviewId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiDeleteReview = async (reviewId, accessToken) => {
    try {
        const { data } = await axios.delete(`/reviews/delete-review/${reviewId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiUpdateReview = async (reviewId, reviewData, accessToken) => {
    try {
        const { data } = await axios.patch(`/reviews/update-review/${reviewId}`, reviewData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export {
    apiAddReview,
    apiDeleteReview,
    apiUpdateReview,
    apiFetchAllProductReviews,
    apiFetchReview,
};
