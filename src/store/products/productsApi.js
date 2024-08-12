import axios from "../axiosInstance";

const apiAddProducts = async (productData, accessToken) => {
    try {
        const response = await axios
            .post(
                '/products/add-product',
                productData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiFetchAllUsersProducts = async (page, query, limit, accessToken) => {
    try {
        const response = await axios
            .get(`/products/get-all-products?page=${page}&q=${query}&limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiFetchAllUsersProductsAdmin = async (accessToken) => {
    try {
        const response = await axios
            .get(`/products/get-all-products-admin`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiFetchCurrentUserProducts = async (page, query, limit, accessToken) => {
    try {
        const response = await axios
            .get(`/products/get-current-user-products?page=${page}&q=${query}&limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiFetchProduct = async (productId, accessToken) => {
    try {
        const response = await axios
            .get(`/products/get-product/${productId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiDeleteProduct = async (productId, accessToken) => {
    try {
        const response = await axios
            .delete(
                `/products/delete-product/${productId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiUpdateProduct = async (productId, productData, accessToken) => {
    try {
        const response = await axios
            .patch(
                `/products/update-product/${productId}`,
                productData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiUpdateProductThumbnail = async (productId, thumbnailFile, accessToken) => {
    try {
        const response = await axios
            .patch(
                `/products/update-product-thumbnail/${productId}`,
                thumbnailFile,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

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
