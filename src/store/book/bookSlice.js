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
        page = 1,
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllUsersBooks(page, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchBooksThunk = createAsyncThunk(
    "book/fetchBooks",
    async (
        page = 1,
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchBooks(page, accessToken);
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
    book: {},
    isLoading: false,
    error: null,
    status: "idle",
};

const booksSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //=======================================================ADD A BOOK==================================================

            .addCase(addBookThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(addBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.books.push(action.payload);
                state.status = "succeeded";
            })
            .addCase(addBookThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = "failed";
            })


            //=======================================================FETCH ALL USERS BOOK===============================================

            .addCase(fetchAllUsersBooksThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(fetchAllUsersBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload.data;
                state.status = "succeeded";
            })
            .addCase(fetchAllUsersBooksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = "failed";
            })
            //=======================================================FETCH ALL BOOK===============================================

            .addCase(fetchBooksThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(fetchBooksThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload.data;
                state.status = "succeeded";
            })
            .addCase(fetchBooksThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = "failed";
            })


            //=======================================================FETCH SINGLE BOOK============================================


            .addCase(fetchBookThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(fetchBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.book = action.payload.data;
                state.status = "succeeded";
            })
            .addCase(fetchBookThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = "failed";
            })


            //=======================================================DELETE BOOK==================================================


            .addCase(deleteBookThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(deleteBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "succeeded";
            })
            .addCase(deleteBookThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = "failed";
            })


            //=======================================================UPDATE BOOK==================================================


            .addCase(updateBookThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(updateBookThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.book = action.payload.data;
                state.status = "succeeded";
            })
            .addCase(updateBookThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = "failed";
            })


            //=======================================================UPDATE THUMBNAIL============================================


            .addCase(updateBookThumbnailThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = "loading";
            })
            .addCase(updateBookThumbnailThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.book = action.payload.data;
                state.status = "succeeded";
            })
            .addCase(updateBookThumbnailThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = "failed";
            })

            //=======================================================Logout============================================
            .addCase(logoutUserThunk.fulfilled, (state) => {
                return initialState;
            })

    },
});


export default booksSlice.reducer;

export const selectBooks = (state) => state.booksData?.books?.results;
export const selectBook = (state) => state.booksData?.book?.book;
export const selectTotalPages = (state) => state.booksData?.books?.meta?.totalPages;
export const selectTotalDocuments = (state) => state.booksData?.books?.meta?.totalDocuments;
export const selectCurrentPage = (state) => state.booksData?.books?.meta?.page;
export const selectLimit = (state) => state.booksData?.books?.meta?.limit;
export const selectIsLoading = (state) => state.booksData?.isLoading;
export const selectError = (state) => state.booksData?.error;
export const selectStatus = (state) => state.booksData?.status;