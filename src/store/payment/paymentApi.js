import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";

const apiCreateStripePayment = async (orderId, accessToken) => {
    try {
        const { data } = await axios.post(
            `/payments/create-stripe-payment/${orderId}`,
            {},
            getAuthConfig(accessToken)
        );
        return data;
    } catch (error) {
        throw error;
    }
};

export {
    apiCreateStripePayment
};
