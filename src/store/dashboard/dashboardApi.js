import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";

export const apiGetDashboardStats = async (accessToken) => {
    try {
        const { data } = await axios.get('/dashboard/get-dashboard-stats', getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};
