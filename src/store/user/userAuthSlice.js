import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userApi";

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
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default userAuthSlice.reducer;

export const selectUser = (state) => state.userAuth.user;
export const selectIsLoading = (state) => state.userAuth.isLoading;
export const selectError = (state) => state.userAuth.error;
