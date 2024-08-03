// store.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchAllUsers, apiFetchUser, apiLoginUser, apiLogoutUser, apiRegisterUser, apiUpdateUser } from "./userApi";

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

export const updateUserThunk = createAsyncThunk(
    "user/updateUser",
    async ({ userId, userData }, { getState, rejectWithValue }) => {
        try {
            console.log(userId, userData)
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
    });

const initialState = {
    users: [],
    user: null,
    fetchedUser: null,
    isLoading: false,
    permissions: [],
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
                state.permissions = action.payload.permissions;
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
            })
            .addCase(fetchUserThunk.pending, (state) => {
                state.isLoading = true;
                state.fetchedUser = null
            })
            .addCase(fetchUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fetchedUser = action.payload.data;
            })
            .addCase(fetchUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllUserThunk.pending, (state) => {
                state.isLoading = true;
                state.users = []
            })
            .addCase(fetchAllUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data;
            })
            .addCase(fetchAllUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUserThunk.pending, (state) => {
                state.isLoading = true;
                state.fetchedUser = null;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fetchedUser = action.payload.data;
                state.users = state.users.map(user => {
                    if (user._id === action.payload.data._id) {
                        return action.payload.data
                    }
                    return user
                })

            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

    },
});

export default userAuthSlice.reducer;

export const selectUsers = (state) => state.userAuth?.users;
export const selectUser = (state) => state.userAuth?.user?.user;
export const selectFetchedUser = (state) => state.userAuth?.fetchedUser;
export const selectUserRole = (state) => state.userAuth?.user?.user?.roleName;
export const selectUserId = (state) => state.userAuth?.user?.user?._id;
export const selectUserPermissions = (state) => state.userAuth?.user?.user.permissions;
export const selectAccessToken = (state) => state.userAuth?.user?.accessToken;
export const selectRefreshToken = (state) => state.userAuth?.user?.refreshToken;
export const selectUserIsLoading = (state) => state.userAuth?.isLoading;
export const selectError = (state) => state.userAuth?.error;
