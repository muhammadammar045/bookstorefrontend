import axios from "../axiosInstance";

const apiAddCategory = async (categoryData, accessToken) => {
    try {
        const response = await axios
            .post(
                '/categories/add-category',
                categoryData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiFetchAllCategories = async (accessToken) => {
    try {
        const response = await axios
            .get(`/categories/get-all-categories`,
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

const apiFetchCategory = async (categoryId, accessToken) => {
    try {
        const response = await axios
            .get(`/categories/get-category/${categoryId}`,
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

const apiDeleteCategory = async (categoryId, accessToken) => {
    try {
        const response = await axios
            .delete(
                `/categories/delete-category/${categoryId}`,
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

const apiUpdateCategory = async (categoryId, categoryData, accessToken) => {
    try {
        const response = await axios
            .patch(
                `/categories/update-category/${categoryId}`,
                categoryData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
        return response.data;
    } catch (error) {
        throw error;
    }
}


export {
    apiUpdateCategory,
    apiAddCategory,
    apiDeleteCategory,
    apiFetchAllCategories,
    apiFetchCategory

};



