import axios from "../axiosInstance";

export const apiLoginUser = async (credentials) => {
    const response = await axios.post(`/user/login`, credentials);
    return response.data;
};

export const apiLogoutUser = async (accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const response = await axios.post(`/user/logout`, {}, config);
    return response.data;
};

export const apiRegisterUser = async (credentials) => {
    const response = await axios.post(`/user/register`, credentials);
    return response.data;
};

export const apiFetchUser = async (userId, accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const response = await axios.get(`/user/get-user/${userId}`, config);
    return response.data;

}

export const apiUpdateUser = async (userId, userData, accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const response = await axios.patch(`/user/update-user/${userId}`, userData, config);
    return response.data;

}

export const apiFetchAllUsers = async (accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    const response = await axios.get("/user/get-all-users", config)
    return response.data;
}

export const apiDeleteUser = async (userId, accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    const response = await axios.delete(`/user/delete-user/${userId}`, config)
    return response.data;
}
