// store.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchAllUsers, apiFetchUser, apiLoginUser, apiLogoutUser, apiRegisterUser, apiUpdateUser, apiDeleteUser } from "./userApi";
import { assignRoleToUserThunk } from "../role/roleSlice";

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

export const fetchUserThunk = createAsyncThunk(
    "user/fetchUser",
    async (roleId, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = selectAccessToken(state);
            const data = await apiFetchUser(roleId, accessToken);
            return data;
        }
        catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchAllUserThunk = createAsyncThunk(
    "user/fetchAllUsers",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = selectAccessToken(state);
            const data = await apiFetchAllUsers(accessToken);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

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

export const updateUserThunk = createAsyncThunk(
    "user/updateUser",
    async ({ userId, userData }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = selectAccessToken(state);
            const data = await apiUpdateUser(userId, userData, accessToken);
            return data;
        }
        catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const deleteUserThunk = createAsyncThunk(
    "user/deleteUser",
    async (userId, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = selectAccessToken(state);
            const data = await apiDeleteUser(userId, accessToken);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    users: [],
    user: null,
    fetchedUser: null,
    isLoading: false,
    permissions: [],
    error: null,
    status: 'idle',
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {},
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
            // REGISTER USER
            .addCase(registerUserThunk.pending, handlePending)
            .addCase(registerUserThunk.rejected, handleRejected)
            .addCase(registerUserThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
                state.status = 'succeeded';
            })

            // LOGIN USER
            .addCase(loginUserThunk.pending, handlePending)
            .addCase(loginUserThunk.rejected, handleRejected)
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.permissions = action.payload.permissions;
                state.error = null;
                state.status = 'succeeded';
            })

            // LOGOUT USER
            .addCase(logoutUserThunk.pending, handlePending)
            .addCase(logoutUserThunk.rejected, handleRejected)
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.status = 'succeeded';
            })

            // FETCH USER
            .addCase(fetchUserThunk.pending, handlePending)
            .addCase(fetchUserThunk.rejected, handleRejected)
            .addCase(fetchUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fetchedUser = action.payload.data;
                state.status = 'succeeded';
            })

            // FETCH ALL USER
            .addCase(fetchAllUserThunk.pending, handlePending)
            .addCase(fetchAllUserThunk.rejected, handleRejected)
            .addCase(fetchAllUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data;
                state.status = 'succeeded';
            })

            // UPDATE USER
            .addCase(updateUserThunk.pending, handlePending)
            .addCase(updateUserThunk.rejected, handleRejected)
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.users.findIndex(user => user._id === action.payload.data._id);
                if (index !== -1) {
                    state.users[index] = action.payload.data;
                }
                state.status = 'succeeded';
                state.fetchedUser = null;
            })

            // Assign Role to User
            .addCase(assignRoleToUserThunk.pending, handlePending)
            .addCase(assignRoleToUserThunk.rejected, handleRejected)
            .addCase(assignRoleToUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.users.findIndex(user => user._id === action.payload.data._id);
                if (index !== -1) {
                    state.users[index] = action.payload.data;
                    // console.log(action.payload.data)
                }
                state.status = 'succeeded';
                state.fetchedUser = null
            })

            // DELETE USER
            .addCase(deleteUserThunk.pending, handlePending)
            .addCase(deleteUserThunk.rejected, handleRejected)
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = state.users.filter(user => user._id !== action.payload.data._id);
                state.status = 'succeeded';
                state.fetchedUser = null;
            })

    },
});

export default userAuthSlice.reducer;

export const selectUsers = (state) => state.UserSlice?.users;
export const selectUser = (state) => state.UserSlice?.user?.user;
export const selectFetchedUser = (state) => state.UserSlice?.fetchedUser;
export const selectUserRole = (state) => state.UserSlice?.user?.user?.roleName;
export const selectUserId = (state) => state.UserSlice?.user?.user?._id;
export const selectUserPermissions = (state) => state.UserSlice?.user?.user.permissions;
export const selectAccessToken = (state) => state.UserSlice?.user?.accessToken;
export const selectRefreshToken = (state) => state.UserSlice?.user?.refreshToken;
export const selectUserIsLoading = (state) => state.UserSlice?.isLoading;
export const selectUserError = (state) => state.UserSlice?.error;
