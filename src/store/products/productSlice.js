import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUserThunk, selectAccessToken } from "../user/userAuthSlice"
import {
    apiAddProducts,
    apiFetchCurrentUserProducts,
    apiFetchAllUsersProductsAdmin,
    apiFetchProduct,
    apiDeleteProduct,
    apiUpdateProduct,
    apiUpdateProductThumbnail,
    apiFetchAllUsersProducts
} from "./productsApi";

export const addProductThunk = createAsyncThunk(
    "product/addProduct",
    async (productData, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const formData = new FormData();
            formData.append("title", productData.title);
            formData.append("price", productData.price);
            formData.append("description", productData.description);
            formData.append("category", productData.category);
            formData.append("thumbnail", productData.thumbnail[0]);

            const response = await apiAddProducts(formData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllUsersProductsThunk = createAsyncThunk(
    "product/fetchAllUsersProducts",
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
            const response = await apiFetchAllUsersProducts(page, query, limit, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllUsersProductsAdminThunk = createAsyncThunk(
    "product/fetchAllUsersProductsAdmin",
    async (_,
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllUsersProductsAdmin(accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCurrentUserProductsThunk = createAsyncThunk(
    "product/fetchCurrentUserProducts",
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
            const response = await apiFetchCurrentUserProducts(page, query, limit, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchProductThunk = createAsyncThunk(
    "product/fetchProduct",
    async (
        productId,
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchProduct(productId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const deleteProductThunk = createAsyncThunk(
    "product/deleteProduct",
    async (
        productId,
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiDeleteProduct(productId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProductThunk = createAsyncThunk(
    "product/updateProduct",
    async (
        { productId, productData },
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiUpdateProduct(productId, productData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProductThumbnailThunk = createAsyncThunk(
    "product/updateProductThumbnail",
    async (
        { productId, productData },
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const formData = new FormData();
            formData.append("thumbnail", productData.thumbnail[0]);
            const response = await apiUpdateProductThumbnail(productId, formData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    products: [],
    product: null,
    isLoading: false,
    error: null,
    status: "idle",
};

const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetSelectedProduct: (state) => {
            state.product = null;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
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
            // ADD PRODUCT
            .addCase(addProductThunk.pending, handlePending)
            .addCase(addProductThunk.rejected, handleRejected)
            .addCase(addProductThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.products.push(action.payload.data);
                state.status = 'succeeded';
            })

            // FETCH ALL USERS' PRODUCTS
            .addCase(fetchAllUsersProductsThunk.pending, handlePending)
            .addCase(fetchAllUsersProductsThunk.rejected, handleRejected)
            .addCase(fetchAllUsersProductsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
                state.status = 'succeeded';
            })

            // FETCH ALL USERS ADMIN PRODUCTS
            .addCase(fetchAllUsersProductsAdminThunk.pending, handlePending)
            .addCase(fetchAllUsersProductsAdminThunk.rejected, handleRejected)
            .addCase(fetchAllUsersProductsAdminThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
                state.status = 'succeeded';
            })

            // FETCH ALL PRODUCTS
            .addCase(fetchCurrentUserProductsThunk.pending, handlePending)
            .addCase(fetchCurrentUserProductsThunk.rejected, handleRejected)
            .addCase(fetchCurrentUserProductsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
                state.status = 'succeeded';
            })

            // FETCH SINGLE PRODUCT
            .addCase(fetchProductThunk.pending, handlePending)
            .addCase(fetchProductThunk.rejected, handleRejected)
            .addCase(fetchProductThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload.data;
                state.status = 'succeeded';
            })

            // UPDATE PRODUCT
            .addCase(updateProductThunk.pending, handlePending)
            .addCase(updateProductThunk.rejected, handleRejected)
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.products.map(product => product._id === action.payload.data._id ? action.payload.data : product);
                state.status = 'succeeded';
                state.product = null;
            })

            // UPDATE PRODUCT THUMBNAIL
            .addCase(updateProductThumbnailThunk.pending, handlePending)
            .addCase(updateProductThumbnailThunk.rejected, handleRejected)
            .addCase(updateProductThumbnailThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.products.map(product => product._id === action.payload.data._id ? action.payload.data : product);
                state.status = 'succeeded';
                state.product = null;
            })

            // DELETE PRODUCT
            .addCase(deleteProductThunk.pending, handlePending)
            .addCase(deleteProductThunk.rejected, handleRejected)
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.products = state.products.products.filter(product => product._id !== action.payload.data._id);
                state.status = 'succeeded';
            })

            // LOGOUT USER
            .addCase(logoutUserThunk.fulfilled, () => {
                return initialState;
            });
    },
});



export const { resetSelectedProduct, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;

export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectProducts = (state) => state.products?.products?.products;
export const selectAdminProducts = (state) => state.products?.products.products;
export const selectProduct = (state) => state.products?.product?.product;
export const selectProductIsOwner = (state) => state.products?.product?.isOwner;
export const selectTotalPages = (state) => state.products?.products?.totalPages;
export const selectTotalDocuments = (state) => state.products?.products?.totalProducts;
export const selectCurrentPage = (state) => state.products?.products?.meta?.currentPage;
export const selectLimit = (state) => state.products?.products?.meta?.limit;
export const selectProductIsLoading = (state) => state.products?.isLoading;
export const selectProductError = (state) => state.products?.error;
export const selectStatus = (state) => state.products?.status;