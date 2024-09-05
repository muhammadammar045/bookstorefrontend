// store.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetDashboardStats } from "./dashboardApi";
import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';



export const fetchDashboardStatsThunk = createAsyncThunk(
    "dashboard/fetchDashboardStats",
    async (_, { getState, rejectWithValue }) => {
        try {
            console.log("fetchDashboardStatsThunk")
            const state = getState();
            const accessToken = selectAccessToken(state);
            const data = await apiGetDashboardStats(accessToken);
            return data;
        } catch (err) {
            return rejectWithValue(errorResponse);
        }
    }
);


const initialState = {
    stats: [],
    isLoading: false,
    error: null,
    status: 'idle',
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
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
            // FETCH DASHBOARD STATS
            .addCase(fetchDashboardStatsThunk.pending, handlePending)
            .addCase(fetchDashboardStatsThunk.rejected, handleRejected)
            .addCase(fetchDashboardStatsThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, (state) => {
                    state.stats = action.payload;
                });
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});



export default dashboardSlice.reducer;


const getDashboardState = (state) => state.dashboardSlice;

export const selectDashboardStats = (state) => getDashboardState(state)?.stats;
export const selectDashboardIsLoading = (state) => getDashboardState(state)?.isLoading;
export const selectDashboardError = (state) => getDashboardState(state)?.error;

