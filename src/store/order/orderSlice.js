import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';
import { apiCancelOrder, apiCreateOrder, apiFetchAllOrdersAdmin, apiFetchCurrentUserOrders, apiFetchOrder, apiUpdateOrderStatus } from './orderApi';


export const createOrderThunk = createAsyncThunk(
    'order/create-order',
    async (orderData, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiCreateOrder(orderData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchOrderThunk = createAsyncThunk(
    'order/fetch-order',
    async (orderId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchOrder(orderId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllOrdersAdminThunk = createAsyncThunk(
    'order/fetchAllOrdersAdmin',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllOrdersAdmin(accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchCurrentUserOrdersThunk = createAsyncThunk(
    'order/fetchCurrentUserOrders',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchCurrentUserOrders(accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateOrderStatusThunk = createAsyncThunk(
    'order/updateOrderStatus',
    async ({ orderId, orderData }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiUpdateOrderStatus(orderId, orderData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const cancelOrderThunk = createAsyncThunk(
    'order/cancelOrder',
    async ({ orderId, orderData }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiCancelOrder(orderId, orderData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    orders: [],
    order: null,
    isLoading: false,
    error: null,
    status: 'idle',
};

const ordersSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetSelectedOrder: (state) => {
            state.order = null;
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

        builder
            // Add Order
            .addCase(createOrderThunk.pending, handlePending)
            .addCase(createOrderThunk.rejected, handleRejected)
            .addCase(createOrderThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.orders.push(action.payload.data);
                });
            })

            // Fetch Order
            .addCase(fetchOrderThunk.pending, handlePending)
            .addCase(fetchOrderThunk.rejected, handleRejected)
            .addCase(fetchOrderThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.order = action.payload.data;
                });
            })

            // Fetch All Orders Admin
            .addCase(fetchAllOrdersAdminThunk.pending, handlePending)
            .addCase(fetchAllOrdersAdminThunk.rejected, handleRejected)
            .addCase(fetchAllOrdersAdminThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.orders = action.payload.data;
                });
            })

            // Fetch All Orders
            .addCase(fetchCurrentUserOrdersThunk.pending, handlePending)
            .addCase(fetchCurrentUserOrdersThunk.rejected, handleRejected)
            .addCase(fetchCurrentUserOrdersThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.orders = action.payload.data;
                });
            })

            // Update Order
            .addCase(updateOrderStatusThunk.pending, handlePending)
            .addCase(updateOrderStatusThunk.rejected, handleRejected)
            .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.orders = state.orders.map(order =>
                        order._id === action.payload.data._id ? action.payload.data : order
                    );
                    state.order = null;
                });
            })

            // Cancel Order
            .addCase(cancelOrderThunk.pending, handlePending)
            .addCase(cancelOrderThunk.rejected, handleRejected)
            .addCase(cancelOrderThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.orders = state.orders.filter(order =>
                        order._id !== action.payload.data._id
                    );
                });
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});



export const { resetSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;

const getOrdersState = (state) => state.orders;

export const selectAllOrders = (state) => getOrdersState(state)?.orders;
export const selectOrder = (state) => getOrdersState(state)?.order;
export const selectOrderIsLoading = (state) => getOrdersState(state)?.isLoading;
export const selectOrderError = (state) => getOrdersState(state)?.error;
export const selectOrderStatus = (state) => getOrdersState(state)?.status;
