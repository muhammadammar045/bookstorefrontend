import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";

const apiCreateOrder = async (orderData, accessToken) => {
    try {
        const { data } = await axios.post('/order/create-order', orderData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchOrder = async (orderId, accessToken) => {
    try {
        const { data } = await axios.get(`/order/get-order/${orderId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchAllOrdersAdmin = async (accessToken) => {
    try {
        const { data } = await axios.get('/order/get-all-orders-admin', getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchCurrentUserOrders = async (accessToken) => {
    try {
        const { data } = await axios.get('/order/get-current-user-orders', getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiUpdateOrderStatus = async (orderId, orderData, accessToken) => {
    try {
        const { data } = await axios.patch(`/order/update-order-status/${orderId}`, orderData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiCancelOrder = async (orderId, orderData, accessToken) => {
    try {
        const { data } = await axios.patch(`/order/cancel-order/${orderId}`, orderData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export {
    apiCreateOrder,
    apiUpdateOrderStatus,
    apiCancelOrder,
    apiFetchAllOrdersAdmin,
    apiFetchCurrentUserOrders,
    apiFetchOrder
};
