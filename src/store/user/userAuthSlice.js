// store.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLoginUser, apiLogoutUser, apiRegisterUser } from "./userApi";

export const loginUserThunk = createAsyncThunk(
    "user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await apiLoginUser(credentials);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const logoutUserThunk = createAsyncThunk(
    "user/logout",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = selectAccessToken(state);
            const data = await apiLogoutUser(accessToken);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const registerUserThunk = createAsyncThunk(
    "user/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await apiRegisterUser(credentials);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUserThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
            .addCase(registerUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUserThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
            .addCase(logoutUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(logoutUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            });
    },
});

export default userAuthSlice.reducer;

export const selectUser = (state) => state.userAuth?.user;
export const selectUserId = (state) => state.userAuth?.user?.user?._id;
export const selectAccessToken = (state) => state.userAuth?.user?.accessToken;
export const selectRefreshToken = (state) => state.userAuth?.user?.refreshToken;
export const selectIsLoading = (state) => state.userAuth?.isLoading;
export const selectError = (state) => state.userAuth?.error;
