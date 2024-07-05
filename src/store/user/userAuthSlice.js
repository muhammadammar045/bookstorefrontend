import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./userApi";

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
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || "Something went wrong";
            });
    },
});

export default userAuthSlice.reducer;

export const selectUser = (state) => state.userAuth?.user;
export const selectAccessToken = (state) => state.userAuth?.user?.accessToken;
export const selectRefreshToken = (state) => state.userAuth?.user?.refreshToken;
export const selectIsLoading = (state) => state.userAuth?.isLoading;
export const selectError = (state) => state.userAuth?.error;
