import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUserThunk, selectAccessToken } from "../user/userAuthSlice"
import {
    apiAddBooks,
    apiFetchBooks,
    apiFetchBook,
    apiDeleteBook,
    apiUpdateBook,
    apiUpdateBookThumbnail,
    apiFetchAllUsersBooks
} from "./booksApi";

export const addBookThunk = createAsyncThunk(
    "book/addBook",
    async (bookData, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const formData = new FormData();
            formData.append("title", bookData.title);
            formData.append("price", bookData.price);
            formData.append("description", bookData.description);
            formData.append("category", bookData.category);
            formData.append("thumbnail", bookData.thumbnail[0]);

            const response = await apiAddBooks(formData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllUsersBooksThunk = createAsyncThunk(
    "book/fetchAllUsersBooks",
    async (
        {
            page = 1,
            query = "",
            limit = 10

        },
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllUsersBooks(page, query, limit, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchBooksThunk = createAsyncThunk(
    "book/fetchBooks",
    async (
        {
            page = 1,
            query = "",
            limit = 10
        },
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchBooks(page, query, limit, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchBookThunk = createAsyncThunk(
    "book/fetchBook",
    async (
        bookId,
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchBook(bookId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const deleteBookThunk = createAsyncThunk(
    "book/deleteBook",
    async (
        bookId,
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiDeleteBook(bookId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateBookThunk = createAsyncThunk(
    "book/updateBook",
    async (
        { bookId, bookData },
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiUpdateBook(bookId, bookData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateBookThumbnailThunk = createAsyncThunk(
    "book/updateBookThumbnail",
    async (
        { bookId, bookData },
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const formData = new FormData();
            formData.append("thumbnail", bookData.thumbnail[0]);
            const response = await apiUpdateBookThumbnail(bookId, formData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    books: [],
    book: null,
    isLoading: false,
    error: null,
    status: "idle",
};

const booksSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        resetSelectedBook: (state) => {
            state.book = null;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            // console.log(action.payload);
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.isLoading = true;
            state.error = null;
            state.status = 'loading';
        };

        const handleRejected = (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.status = 'failed';
        };

        builder
            // ADD BOOK
            .addCase(addBookThunk.pending, handlePending)
            .addCase(addBookThunk.rejected, handleRejected)
            .addCase(addBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books.books.push(action.payload.data);
                state.status = 'succeeded';
            })

            // FETCH ALL USERS' BOOKS
            .addCase(fetchAllUsersBooksThunk.pending, handlePending)
            .addCase(fetchAllUsersBooksThunk.rejected, handleRejected)
            .addCase(fetchAllUsersBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload.data;
                state.status = 'succeeded';
            })

            // FETCH ALL BOOKS
            .addCase(fetchBooksThunk.pending, handlePending)
            .addCase(fetchBooksThunk.rejected, handleRejected)
            .addCase(fetchBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload.data;
                state.status = 'succeeded';
            })

            // FETCH SINGLE BOOK
            .addCase(fetchBookThunk.pending, handlePending)
            .addCase(fetchBookThunk.rejected, handleRejected)
            .addCase(fetchBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.book = action.payload.data;
                state.status = 'succeeded';
            })

            // UPDATE BOOK
            .addCase(updateBookThunk.pending, handlePending)
            .addCase(updateBookThunk.rejected, handleRejected)
            .addCase(updateBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.books.books.findIndex(book => book._id === action.payload.data._id);
                if (index !== -1) {
                    state.books.books[index] = action.payload.data;
                }
                state.status = 'succeeded';
                state.book = null;
            })

            // UPDATE BOOK THUMBNAIL
            .addCase(updateBookThumbnailThunk.pending, handlePending)
            .addCase(updateBookThumbnailThunk.rejected, handleRejected)
            .addCase(updateBookThumbnailThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.books.books.findIndex(book => book._id === action.payload.data._id);
                if (index !== -1) {
                    state.books.books[index] = action.payload.data;
                }
                state.status = 'succeeded';
                state.book = null;
            })

            // DELETE BOOK
            .addCase(deleteBookThunk.pending, handlePending)
            .addCase(deleteBookThunk.rejected, handleRejected)
            .addCase(deleteBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books.books = state.books.books.filter(book => book._id !== action.payload.data._id);
                // console.log(state.books)
                // console.log(action.payload.data);
                state.status = 'succeeded';
            })

            // LOGOUT USER
            .addCase(logoutUserThunk.fulfilled, () => {
                return initialState;
            });
    },
});



export const { resetSelectedBook, setSearchQuery } = booksSlice.actions;
export default booksSlice.reducer;

export const selectSearchQuery = (state) => state.booksData.searchQuery;
export const selectBooks = (state) => state.booksData?.books?.books;
export const selectBook = (state) => state.booksData?.book?.book;
export const selectBookIsOwner = (state) => state.booksData?.book?.isOwner;
export const selectTotalPages = (state) => state.booksData?.books?.totalPages;
export const selectTotalDocuments = (state) => state.booksData?.books?.totalBooks;
export const selectCurrentPage = (state) => state.booksData?.books?.meta?.currentPage;
export const selectLimit = (state) => state.booksData?.books?.meta?.limit;
export const selectBookIsLoading = (state) => state.booksData?.isLoading;
export const selectBookError = (state) => state.booksData?.error;
export const selectStatus = (state) => state.booksData?.status;