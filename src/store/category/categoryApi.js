import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";


export const apiAddCategory = async (categoryData, accessToken) => {
    try {
        const { data } = await axios.post('/categories/add-category', categoryData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiFetchAllCategories = async (accessToken) => {
    try {
        const { data } = await axios.get('/categories/get-all-categories', getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiFetchCategory = async (categoryId, accessToken) => {
    try {
        const { data } = await axios.get(`/categories/get-category/${categoryId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiFetchCategoryProducts = async (categoryId, accessToken) => {
    try {
        const { data } = await axios.get(`/categories/get-category-products/${categoryId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiDeleteCategory = async (categoryId, accessToken) => {
    try {
        const { data } = await axios.delete(`/categories/delete-category/${categoryId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiUpdateCategory = async (categoryId, categoryData, accessToken) => {
    try {
        const { data } = await axios.patch(`/categories/update-category/${categoryId}`, categoryData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};
