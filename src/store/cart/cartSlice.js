import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';
import { apiAddProductToCart, apiFetchUserCart, apiRemoveProductFromCart } from './cartApi';

export const addProductToCartThunk = createAsyncThunk(
    'cart/add-product-to-cart',
    async (productId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiAddProductToCart(productId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeProductFromCartThunk = createAsyncThunk(
    'cart/remove-product-from-cart',
    async (productId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiRemoveProductFromCart(productId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUserCartThunk = createAsyncThunk(
    'cart/fetchUserCart',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchUserCart(accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    cartItem: null,
    cartItems: [],
    userCart: null,
    isLoading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetSelectedCart: (state) => {
            state.userCart = null;
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

        // Add product to cart
        builder
            .addCase(addProductToCartThunk.pending, handlePending)
            .addCase(addProductToCartThunk.rejected, handleRejected)
            .addCase(addProductToCartThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state, action) => {
                    state.userCart.cartItems.push(action.payload.data);
                });
            })

            // Remove product from cart
            .addCase(removeProductFromCartThunk.pending, handlePending)
            .addCase(removeProductFromCartThunk.rejected, handleRejected)
            .addCase(removeProductFromCartThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state, action) => {
                    state.userCart.cartItems = state.userCart.cartItems.filter((item) => item._id !== action.payload.data._id);
                });
            })

            // Fetch user cart
            .addCase(fetchUserCartThunk.pending, handlePending)
            .addCase(fetchUserCartThunk.rejected, handleRejected)
            .addCase(fetchUserCartThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state, action) => {
                    state.userCart = action.payload.data;
                    state.cartItems = action.payload.data.cartItems;
                });
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});


export const { resetSelectedCart } = cartSlice.actions;
export default cartSlice.reducer;


const getCartState = (state) => state.cart;

export const selectedCartItem = (state) => getCartState(state)?.cartItem;
export const selectedCartItems = (state) => getCartState(state)?.userCart?.cartItems;
export const selectedCartTotal = (state) => getCartState(state)?.userCart?.totalAmount;
export const selectedCartStatus = (state) => getCartState(state)?.status;
export const selectedCartIsLoading = (state) => getCartState(state)?.isLoading;

