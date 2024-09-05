// store.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchAllUsers, apiFetchUser, apiLoginUser, apiLogoutUser, apiRegisterUser, apiUpdateUser, apiDeleteUser } from "./userApi";
import { assignRoleToUserThunk } from "../role/roleSlice";

export const registerUserThunk = createAsyncThunk(
    "user/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("firstName", credentials.firstName);
            formData.append("lastName", credentials.lastName);
            formData.append("userName", credentials.userName);
            formData.append("email", credentials.email);
            formData.append("password", credentials.password);
            formData.append("address", credentials.address);
            if (credentials.profileImage && credentials.profileImage.length > 0) {
                formData.append("profileImage", credentials.profileImage[0]);
            }
            if (credentials.coverImage && credentials.coverImage.length > 0) {
                formData.append("coverImage", credentials.coverImage[0]);
            }

            const data = await apiRegisterUser(formData);

            return data;
        } catch (err) {
            console.error('Error in registration:', err);
            return rejectWithValue(err.response ? err.response.data : 'An error occurred');
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
    reducers: {
        resetSelectedUser: (state) => {
            state.fetchedUser = null;
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

        const handleFulfilled = (state, action, successCallback) => {
            state.isLoading = false;
            successCallback(state, action);
            state.status = 'succeeded';
        };

        builder
            // REGISTER USER
            .addCase(registerUserThunk.pending, handlePending)
            .addCase(registerUserThunk.rejected, handleRejected)
            .addCase(registerUserThunk.fulfilled, (state) => {
                handleFulfilled(state, null, () => {
                    state.error = null;
                });
            })

            // LOGIN USER
            .addCase(loginUserThunk.pending, handlePending)
            .addCase(loginUserThunk.rejected, handleRejected)
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, () => {
                    state.user = action.payload.data;
                    state.permissions = action.payload.permissions;
                });
            })

            // LOGOUT USER
            .addCase(logoutUserThunk.pending, handlePending)
            .addCase(logoutUserThunk.rejected, handleRejected)
            .addCase(logoutUserThunk.fulfilled, (state) => {
                handleFulfilled(state, null, () => {
                    state.user = null;
                });
            })

            // FETCH USER
            .addCase(fetchUserThunk.pending, handlePending)
            .addCase(fetchUserThunk.rejected, handleRejected)
            .addCase(fetchUserThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, () => {
                    state.fetchedUser = action.payload.data;
                });
            })

            // FETCH ALL USERS
            .addCase(fetchAllUserThunk.pending, handlePending)
            .addCase(fetchAllUserThunk.rejected, handleRejected)
            .addCase(fetchAllUserThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, () => {
                    state.users = action.payload.data;
                });
            })

            // UPDATE USER
            .addCase(updateUserThunk.pending, handlePending)
            .addCase(updateUserThunk.rejected, handleRejected)
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, () => {
                    state.users = state.users.map(user =>
                        user._id === action.payload.data._id ? action.payload.data : user
                    );
                    state.fetchedUser = null;
                });
            })

            // Assign Role to User
            .addCase(assignRoleToUserThunk.pending, handlePending)
            .addCase(assignRoleToUserThunk.rejected, handleRejected)
            .addCase(assignRoleToUserThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, () => {
                    state.users = state.users.map(user =>
                        user._id === action.payload.data._id ? action.payload.data : user
                    );
                    state.fetchedUser = null;
                });
            })

            // DELETE USER
            .addCase(deleteUserThunk.pending, handlePending)
            .addCase(deleteUserThunk.rejected, handleRejected)
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                handleFulfilled(state, action, () => {
                    state.users = state.users.filter(user =>
                        user._id !== action.payload.data._id
                    );
                    state.fetchedUser = null;
                });
            });
    },
});


export const { resetSelectedUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;

const getUsersState = (state) => state.users;

export const selectUsers = (state) => getUsersState(state)?.users;
export const selectUser = (state) => getUsersState(state)?.user?.user;
export const selectFetchedUser = (state) => getUsersState(state)?.fetchedUser;
export const selectUserRole = (state) => getUsersState(state)?.user?.user?.roleName;
export const selectUserId = (state) => getUsersState(state)?.user?.user?._id;
export const selectUserPermissions = (state) => getUsersState(state)?.user?.user.permissions;
export const selectAccessToken = (state) => getUsersState(state)?.user?.accessToken;
export const selectRefreshToken = (state) => getUsersState(state)?.user?.refreshToken;
export const selectUserIsLoading = (state) => getUsersState(state)?.isLoading;
export const selectUserError = (state) => getUsersState(state)?.error;
