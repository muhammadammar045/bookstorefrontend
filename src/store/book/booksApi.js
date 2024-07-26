import axios from "../axiosInstance";

const apiAddBooks = async (bookData, accessToken) => {
    try {
        const response = await axios
            .post(
                '/books/add-book',
                bookData, {
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

const apiFetchAllUsersBooks = async (page, accessToken) => {
    try {
        const response = await axios
            .get(`/books/get-all-books?page=${page}`,
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

const apiFetchBooks = async (page, accessToken) => {
    try {
        const response = await axios
            .get(`/books/get-current-user-books?page=${page}`,
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

const apiFetchBook = async (bookId, accessToken) => {
    try {
        const response = await axios
            .get(`/books/get-book/${bookId}`,
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

const apiDeleteBook = async (bookId, accessToken) => {
    try {
        const response = await axios
            .delete(
                `/books/delete-book/${bookId}`,
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

const apiUpdateBook = async (bookId, bookData, accessToken) => {
    try {
        const response = await axios
            .patch(
                `/books/update-book/${bookId}`,
                bookData,
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

const apiUpdateBookThumbnail = async (bookId, thumbnailFile, accessToken) => {
    try {
        const response = await axios
            .patch(
                `/books/update-book-thumbnail/${bookId}`,
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
    apiAddBooks,
    apiFetchBooks,
    apiFetchBook,
    apiDeleteBook,
    apiUpdateBook,
    apiUpdateBookThumbnail,
    apiFetchAllUsersBooks,
};
