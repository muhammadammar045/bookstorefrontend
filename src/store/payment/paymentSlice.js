import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';
import { apiCreateStripePayment } from './paymentApi';


export const createStripePaymentThunk = createAsyncThunk(
    'payments/createStripePayment',
    async (orderId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiCreateStripePayment(orderId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const initialState = {
    isLoading: false,
    error: null,
    stripePayment: null,

};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        handlePending: (state) => {
            state.isLoading = true;
            state.error = null; // Clear any existing errors
        },
        handleRejected: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        handleFulfilled: (state, action, successCallback) => {
            state.isLoading = false;
            successCallback(state, action);
        }
    },

    extraReducers: (builder) => {
        builder
            // Create Stripe Payment
            .addCase(createStripePaymentThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Clear any existing errors
            })
            .addCase(createStripePaymentThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(createStripePaymentThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stripePayment = action.payload;
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});


const getPaymentsState = (state) => state.payments


export const selectStripePayment = (state) => getPaymentsState(state)?.stripePayment;

export default paymentSlice.reducer;