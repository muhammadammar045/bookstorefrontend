import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';
import { apiFetchAllLikedProducts, apiToggleProductLike, apiToggleReviewLike } from './likeApi';

// Thunks
export const toggleProductLikeThunk = createAsyncThunk(
    'like/toggleProductLike',
    async (productId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiToggleProductLike(productId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const toggleReviewLikeThunk = createAsyncThunk(
    'like/toggleReviewLike',
    async (reviewId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiToggleReviewLike(reviewId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllLikedProductsThunk = createAsyncThunk(
    'like/fetchAllLikedProducts',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllLikedProducts(accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial State
const initialState = {
    likedProducts: [],
    isLiked: false,
    isLoading: false,
    error: null,
};

// Slice
const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        resetLike: (state) => {
            state.isLiked = false;
        },
    },
    extraReducers: (builder) => {
        // Common handlers
        const handlePending = (state) => {
            state.isLoading = true;
            state.error = null;
        };

        const handleRejected = (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        };

        const handleFulfilled = (state, action, successCallback) => {
            state.isLoading = false;
            successCallback(state, action);
        };

        builder
            // Toggle Product Like
            .addCase(toggleProductLikeThunk.pending, handlePending)
            .addCase(toggleProductLikeThunk.rejected, handleRejected)
            .addCase(toggleProductLikeThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.isLiked = action.payload.isLiked;
                });
            })

            // Toggle Review Like
            .addCase(toggleReviewLikeThunk.pending, handlePending)
            .addCase(toggleReviewLikeThunk.rejected, handleRejected)
            .addCase(toggleReviewLikeThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.isLiked = action.payload.isLiked;
                });
            })

            // Fetch All Liked Products
            .addCase(fetchAllLikedProductsThunk.pending, handlePending)
            .addCase(fetchAllLikedProductsThunk.rejected, handleRejected)
            .addCase(fetchAllLikedProductsThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.likedProducts = action.payload;
                });
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});



// Actions and Selectors
export const { resetLike } = likeSlice.actions;

const getLikesState = (state) => state.likes;

export const selectIsLiked = (state) => getLikesState(state)?.isLiked;
export const selectLikedProducts = (state) => getLikesState(state)?.likedProducts;
export const selectLikeError = (state) => getLikesState(state)?.error;
export const selectLikeIsLoading = (state) => getLikesState(state)?.isLoading;


export default likeSlice.reducer;
