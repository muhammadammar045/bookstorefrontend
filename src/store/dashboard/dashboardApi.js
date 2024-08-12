import axios from "../axiosInstance";



export const apiGetDashboardStats = async (accessToken) => {
    console.log("apiGetDashboardStats")
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const response = await axios.get(`/dashboard/get-dashboard-stats`, config);
    return response.data;

}




