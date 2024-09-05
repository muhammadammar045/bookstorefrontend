import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";

export const apiLoginUser = async (credentials) => {
    const { data } = await axios.post(`/user/login`, credentials);
    return data;
};

export const apiLogoutUser = async (accessToken) => {
    const { data } = await axios.post(`/user/logout`, {}, getAuthConfig(accessToken));
    return data;
};

export const apiRegisterUser = async (formData) => {
    const { data } = await axios.post(`/user/register`, formData, getAuthConfig(null, "multipart/form-data"));

    return data;
};

export const apiFetchUser = async (userId, accessToken) => {
    const { data } = await axios.get(`/user/get-user/${userId}`, getAuthConfig(accessToken));
    return data;
};

export const apiUpdateUser = async (userId, userData, accessToken) => {
    const { data } = await axios.patch(`/user/update-user/${userId}`, userData, getAuthConfig(accessToken));
    return data;
};

export const apiFetchAllUsers = async (accessToken) => {
    const { data } = await axios.get("/user/get-all-users", getAuthConfig(accessToken));
    return data;
};

export const apiDeleteUser = async (userId, accessToken) => {
    const { data } = await axios.delete(`/user/delete-user/${userId}`, getAuthConfig(accessToken));
    return data;
};
