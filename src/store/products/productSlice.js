import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
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
            page,
            searchQuery,
            sort,
            sortOrder,
            limit,
            priceRange,
        },
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllUsersProducts(
                page,
                searchQuery,
                sort,
                sortOrder,
                limit,
                priceRange,
                accessToken,
            );
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
            page,
            searchQuery,
            sort,
            sortOrder,
            limit,
        },
        { getState, rejectWithValue }
    ) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchCurrentUserProducts(
                page,
                searchQuery,
                sort,
                sortOrder,
                limit,
                accessToken
            );
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
        const products = selectProducts(state);
        const accessToken = selectAccessToken(state);
        try {
            const product = products.find((product) => product._id === productId);
            if (product) {
                return product;
            }
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
    name: 'product',
    initialState,
    reducers: {
        resetSelectedProduct: (state) => {
            state.product = null;
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

        const handleFulfilled = (state, action, updateCallback) => {
            state.isLoading = false;
            updateCallback(state, action);
            state.status = 'succeeded';
        };

        builder
            // Add Product
            .addCase(addProductThunk.pending, handlePending)
            .addCase(addProductThunk.rejected, handleRejected)
            .addCase(addProductThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.products.products.push(action.payload.data);
                });
            })

            // Fetch All Users' Products
            .addCase(fetchAllUsersProductsThunk.pending, handlePending)
            .addCase(fetchAllUsersProductsThunk.rejected, handleRejected)
            .addCase(fetchAllUsersProductsThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.products = action.payload.data;
                });
            })

            // Fetch All Users Admin Products
            .addCase(fetchAllUsersProductsAdminThunk.pending, handlePending)
            .addCase(fetchAllUsersProductsAdminThunk.rejected, handleRejected)
            .addCase(fetchAllUsersProductsAdminThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.products = action.payload.data;
                });
            })

            // Fetch Current User Products
            .addCase(fetchCurrentUserProductsThunk.pending, handlePending)
            .addCase(fetchCurrentUserProductsThunk.rejected, handleRejected)
            .addCase(fetchCurrentUserProductsThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.products = action.payload.data;
                });
            })

            // Fetch Single Product
            .addCase(fetchProductThunk.pending, handlePending)
            .addCase(fetchProductThunk.rejected, handleRejected)
            .addCase(fetchProductThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.product = action.payload;
                });
            })

            // Update Product
            .addCase(updateProductThunk.pending, handlePending)
            .addCase(updateProductThunk.rejected, handleRejected)
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.products.products = state.products.products.map(product =>
                        product._id === action.payload.data._id ? action.payload.data : product
                    );
                    state.product = null;
                });
            })

            // Update Product Thumbnail
            .addCase(updateProductThumbnailThunk.pending, handlePending)
            .addCase(updateProductThumbnailThunk.rejected, handleRejected)
            .addCase(updateProductThumbnailThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.products.products = state.products.products.map(product =>
                        product._id === action.payload.data._id ? action.payload.data : product
                    );
                    state.product = null;
                });
            })

            // Delete Product
            .addCase(deleteProductThunk.pending, handlePending)
            .addCase(deleteProductThunk.rejected, handleRejected)
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.products.products = state.products.products.filter(product =>
                        product._id !== action.payload.data._id
                    );
                });
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});



export const { resetSelectedProduct, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;

const getProductsState = (state) => state.products;



export const selectProducts = (state) => getProductsState(state)?.products?.products;
export const selectAdminProducts = (state) => getProductsState(state)?.products?.products;
export const selectProduct = (state) => getProductsState(state)?.product;
export const selectProductId = (state) => getProductsState(state)?.product?.product._id;
export const selectProductIsOwner = (state) => getProductsState(state)?.product?.isOwner;
export const selectTotalPages = (state) => getProductsState(state)?.products?.totalPages;
export const selectTotalDocuments = (state) => getProductsState(state)?.products?.totalProducts;
export const selectCurrentPage = (state) => getProductsState(state)?.products?.meta?.currentPage;
export const selectProductIsLoading = (state) => getProductsState(state)?.isLoading;
export const selectProductError = (state) => getProductsState(state)?.error;
export const selectStatus = (state) => getProductsState(state)?.status;

export const selectSingleProduct = createSelector(
    [selectProducts, (_, productId) => productId], // Using a function to grab productId as a second argument
    (products, productId) => products?.find((product) => product._id === productId)
);
export const removeSingleProduct = (products, productId) => {
    return products.filter((product) => product._id !== productId);
}

export const addSingleProduct = (products, product) => {
    return [...products, product];
}