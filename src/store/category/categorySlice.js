import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiFetchAllCategories,
    apiFetchCategory,
    apiAddCategory,
    apiDeleteCategory,
    apiUpdateCategory,
} from './categoryApi';
import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';


export const addCategoryThunk = createAsyncThunk(
    'category/add',
    async (categoryData, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiAddCategory(categoryData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCategoryThunk = createAsyncThunk(
    'category/fetch',
    async (categoryId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchCategory(categoryId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllCategoriesThunk = createAsyncThunk(
    'category/fetchAll',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllCategories(accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCategoryThunk = createAsyncThunk(
    'category/update',
    async ({ categoryId, categoryData }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiUpdateCategory(categoryId, categoryData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCategoryThunk = createAsyncThunk(
    'category/delete',
    async (categoryId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiDeleteCategory(categoryId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    categories: [],
    category: null,
    isLoading: false,
    error: null,
    status: 'idle',
};

const categoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resetSelectedCategory: (state) => {
            state.category = null;
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

            // Add Category
            .addCase(addCategoryThunk.pending, handlePending)
            .addCase(addCategoryThunk.rejected, handleRejected)
            .addCase(addCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories.push(action.payload.data);
                state.status = 'succeeded';
            })

            // Fetch Category
            .addCase(fetchCategoryThunk.pending, handlePending)
            .addCase(fetchCategoryThunk.rejected, handleRejected)
            .addCase(fetchCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.category = action.payload.data;
                state.status = 'succeeded';
            })

            // Fetch All Categories
            .addCase(fetchAllCategoriesThunk.pending, handlePending)
            .addCase(fetchAllCategoriesThunk.rejected, handleRejected)
            .addCase(fetchAllCategoriesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload.data;
                state.status = 'succeeded';
            })

            // Update Category
            .addCase(updateCategoryThunk.pending, handlePending)
            .addCase(updateCategoryThunk.rejected, handleRejected)
            .addCase(updateCategoryThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = state.categories.map(category => category._id === action.payload.data._id ? action.payload.data : category);
                state.status = 'succeeded';
                state.category = null
            })

            // Delete Category
            .addCase(deleteCategoryThunk.pending, handlePending)
            .addCase(deleteCategoryThunk.rejected, handleRejected)
            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
                state.categories = state.categories.filter(category => category._id !== action.payload.data._id);
                state.isLoading = false;
                state.status = 'succeeded';
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});


export const { resetSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

export const selectAllCategories = (state) => state.CategorySlice.categories;
export const selectCategory = (state) => state.CategorySlice.category;
export const selectCategoryIsLoading = (state) => state.CategorySlice.isLoading;
export const selectCategoryError = (state) => state.CategorySlice.error;
export const selectCategoryStatus = (state) => state.CategorySlice.status;