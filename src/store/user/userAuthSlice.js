import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./userApi";


const initialState = {
    user: null,
    isLoading: false,
    error: null,
}

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Something went wrong";
        })
    }
})

export default userAuthSlice.reducer;

export const user = (state) => state.userAuth.user;
export const isLoading = (state) => state.userAuth.isLoading;
export const error = (state) => state.userAuth.error;
