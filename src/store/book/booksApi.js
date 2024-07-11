import axios from "../axiosInstance";

const addBooks = async (bookData, accessToken) => {
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

const fetchBooks = async (page, accessToken) => {
    try {
        const response = await axios.get(`/books/get-current-user-books?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const fetchBook = async (bookId, accessToken) => {
    try {
        const response = await axios.get(`/books/get-book/${bookId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const deleteBook = async (bookId, accessToken) => {
    try {
        const response = await axios.delete(`/books/delete-book/${bookId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const updateBook = async (bookId, bookData, accessToken) => {
    try {
        const response = await axios.patch(`/books/update-book/${bookId}`, bookData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const updateBookThumbnail = async (bookId, thumbnail, accessToken) => {
    try {
        const response = await axios.patch(`/books/update-book-thumbnail/${bookId}`, thumbnail, {
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
    addBooks,
    fetchBooks,
    fetchBook,
    deleteBook,
    updateBook,
    updateBookThumbnail
};
