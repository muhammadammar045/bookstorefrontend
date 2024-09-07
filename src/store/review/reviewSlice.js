import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';
import { apiAddReview, apiDeleteReview, apiFetchAllProductReviews, apiFetchReview, apiUpdateReview } from './reviewApi';


export const addReviewThunk = createAsyncThunk(
    'review/add-review',
    async ({ productId, reviewData }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiAddReview({ productId, reviewData }, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchReviewThunk = createAsyncThunk(
    'review/fetch-review',
    async (reviewId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchReview(reviewId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllProductReviewsThunk = createAsyncThunk(
    'review/fetchAllProductReviews',
    async (productId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllProductReviews(productId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateReviewThunk = createAsyncThunk(
    'review/update-review',
    async ({ reviewId, reviewData }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiUpdateReview(reviewId, reviewData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteReviewThunk = createAsyncThunk(
    'review/delete-review',
    async (reviewId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiDeleteReview(reviewId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    reviews: [],
    review: null,
    isLoading: false,
    error: null,
};

const reviewsSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        resetSelectedReview: (state) => {
            state.review = null;
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

        const handleFulfilled = (state, action, successCallback) => {
            state.isLoading = false;
            successCallback(state, action);
            state.status = 'succeeded';
        };

        builder
            // Add Review
            .addCase(addReviewThunk.pending, handlePending)
            .addCase(addReviewThunk.rejected, handleRejected)
            .addCase(addReviewThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.reviews.push(action.payload.data);
                });
            })

            // Fetch Review
            .addCase(fetchReviewThunk.pending, handlePending)
            .addCase(fetchReviewThunk.rejected, handleRejected)
            .addCase(fetchReviewThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.review = action.payload.data;
                });
            })

            // Fetch All Reviews
            .addCase(fetchAllProductReviewsThunk.pending, handlePending)
            .addCase(fetchAllProductReviewsThunk.rejected, handleRejected)
            .addCase(fetchAllProductReviewsThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.reviews = action.payload.data;
                });
            })

            // Update Review
            .addCase(updateReviewThunk.pending, handlePending)
            .addCase(updateReviewThunk.rejected, handleRejected)
            .addCase(updateReviewThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.reviews = state.reviews.map(review =>
                        review._id === action.payload.data._id ? action.payload.data : review
                    );
                    state.review = null;
                });
            })

            // Delete Review
            .addCase(deleteReviewThunk.pending, handlePending)
            .addCase(deleteReviewThunk.rejected, handleRejected)
            .addCase(deleteReviewThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.reviews = state.reviews.filter(review =>
                        review._id !== action.payload.data._id
                    );
                });
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});




export const { resetSelectedReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;

const getReviewsState = (state) => state.reviews;

export const selectAllReviews = (state) => getReviewsState(state)?.reviews;
export const selectAllProductReviews = (state) => getReviewsState(state)?.reviews;
export const selectProductReviewsCount = (state) => getReviewsState(state)?.reviews?.reviewCount;
export const selectProductReviewsAverageRating = (state) => getReviewsState(state)?.reviews?.averageRating;
export const selectProductReviewsIndividualStarCount = (state) => getReviewsState(state)?.reviews?.individualStarCount;
export const selectReview = (state) => getReviewsState(state)?.review;
export const selectReviewIsLoading = (state) => getReviewsState(state)?.isLoading;
export const selectReviewError = (state) => getReviewsState(state)?.error;
export const selectReviewStatus = (state) => getReviewsState(state)?.status;
