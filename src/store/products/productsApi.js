import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";


const apiAddProducts = async (productData, accessToken) => {
    try {
        const { data } = await axios.post('/products/add-product', productData, getAuthConfig(accessToken, "multipart/form-data"));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchAllUsersProducts = async (page, searchQuery, sort, sortOrder, limit, priceRange, accessToken) => {
    try {
        const { data } = await axios.get(`/products/get-all-products`, {
            params: {
                page,
                q: searchQuery,
                limit,
                sort,
                sortOrder,
                priceRange
            },
            ...getAuthConfig(accessToken),
        });
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchAllUsersProductsAdmin = async (accessToken) => {
    try {
        const { data } = await axios.get(`/products/get-all-products-admin`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchCurrentUserProducts = async (page, searchQuery, sort, sortOrder, limit, accessToken) => {
    try {
        const { data } = await axios.get(`/products/get-current-user-products`, {
            params: { page, q: searchQuery, limit, sort, sortOrder },
            ...getAuthConfig(accessToken),
        });
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchProduct = async (productId, accessToken) => {
    try {
        const { data } = await axios.get(`/products/get-product/${productId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiDeleteProduct = async (productId, accessToken) => {
    try {
        const { data } = await axios.delete(`/products/delete-product/${productId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiUpdateProduct = async (productId, productData, accessToken) => {
    try {
        const { data } = await axios.patch(`/products/update-product/${productId}`, productData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiUpdateProductThumbnail = async (productId, thumbnailFile, accessToken) => {
    try {
        const { data } = await axios.patch(`/products/update-product-thumbnail/${productId}`, thumbnailFile, getAuthConfig(accessToken, "multipart/form-data"));
        return data;
    } catch (error) {
        throw error;
    }
};

export {
    apiAddProducts,
    apiFetchCurrentUserProducts,
    apiFetchProduct,
    apiDeleteProduct,
    apiUpdateProduct,
    apiUpdateProductThumbnail,
    apiFetchAllUsersProducts,
    apiFetchAllUsersProductsAdmin
};
