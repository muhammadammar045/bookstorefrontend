import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiFetchAllCategories,
    apiFetchCategory,
    apiAddCategory,
    apiDeleteCategory,
    apiUpdateCategory,
    apiFetchCategoryProducts,
} from './categoryApi';
import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';


export const addCategoryThunk = createAsyncThunk(
    'category/addCategory',
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
    'category/fetchCategory',
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
    'category/fetchAllCategories',
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
    'category/updateCategory',
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
    'category/deleteCategory',
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

export const fetchCategoryProductsThunk = createAsyncThunk(
    'category/fetchCategoryProducts',
    async (categoryId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchCategoryProducts(categoryId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const initialState = {
    categories: [],
    category: null,
    categoryProducts: [],
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
        // Common handlers
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

        const handleFulfilled = (state, action, successCallback) => {
            state.isLoading = false;
            successCallback(state, action);
            state.status = 'succeeded';
        };

        // Helper function to update categories list
        const updateCategoriesList = (state, action) => {
            state.categories = state.categories.map(category =>
                category._id === action.payload.data._id ? action.payload.data : category
            );
        };

        builder
            // Add Category
            .addCase(addCategoryThunk.pending, handlePending)
            .addCase(addCategoryThunk.rejected, handleRejected)
            .addCase(addCategoryThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.categories.push(action.payload.data);
                });
            })

            // Fetch Category
            .addCase(fetchCategoryThunk.pending, handlePending)
            .addCase(fetchCategoryThunk.rejected, handleRejected)
            .addCase(fetchCategoryThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.category = action.payload.data;
                });
            })

            // Fetch Category Products
            .addCase(fetchCategoryProductsThunk.pending, handlePending)
            .addCase(fetchCategoryProductsThunk.rejected, handleRejected)
            .addCase(fetchCategoryProductsThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.categoryProducts = action.payload.data;
                });
            })

            // Fetch All Categories
            .addCase(fetchAllCategoriesThunk.pending, handlePending)
            .addCase(fetchAllCategoriesThunk.rejected, handleRejected)
            .addCase(fetchAllCategoriesThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.categories = action.payload.data;
                });
            })

            // Update Category
            .addCase(updateCategoryThunk.pending, handlePending)
            .addCase(updateCategoryThunk.rejected, handleRejected)
            .addCase(updateCategoryThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    updateCategoriesList(state, action);
                    state.category = null;
                });
            })

            // Delete Category
            .addCase(deleteCategoryThunk.pending, handlePending)
            .addCase(deleteCategoryThunk.rejected, handleRejected)
            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.categories = state.categories.filter(category => category._id !== action.payload.data._id);
                });
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});



export const { resetSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

const getCategoriesState = (state) => state.categories;

export const selectAllCategories = (state) => getCategoriesState(state)?.categories;
export const selectCategory = (state) => getCategoriesState(state)?.category;
export const selectCategoryProducts = (state) => getCategoriesState(state)?.categoryProducts?.products;
export const selectCategoryIsLoading = (state) => getCategoriesState(state)?.isLoading;
export const selectCategoryError = (state) => getCategoriesState(state)?.error;
export const selectCategoryStatus = (state) => getCategoriesState(state)?.status;

// PAGINATION SELECTORS
export const selectCategoryTotalPages = (state) => getCategoriesState(state)?.categoryProducts?.totalPages;
export const selectCategoryTotalProducts = (state) => getCategoriesState(state)?.categoryProducts?.totalProducts;
export const selectCategoryCurrentPage = (state) => getCategoriesState(state)?.categoryProducts?.currentPage;
export const selectCategoryLimit = (state) => getCategoriesState(state)?.categoryProducts?.pageSize;
export const selectCategorySearchQuery = (state) => getCategoriesState(state)?.searchQuery;
