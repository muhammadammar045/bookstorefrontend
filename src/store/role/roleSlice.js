import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';

import {
    apiFetchAllRoles, apiFetchRole, apiAddRole, apiDeleteRole, apiUpdateRole, apiAssignRoleToUser
} from './roleApi';

export const fetchAllRolesThunk = createAsyncThunk(
    'role/fetchAll',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllRoles(accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchRoleThunk = createAsyncThunk(
    'role/fetch',
    async (roleId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchRole(roleId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addRoleThunk = createAsyncThunk(
    'role/add',
    async (roleData, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiAddRole(roleData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteRoleThunk = createAsyncThunk(
    'role/delete',
    async (roleId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiDeleteRole(roleId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateRoleThunk = createAsyncThunk(
    'role/update',
    async ({ roleId, roleData }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiUpdateRole(roleId, roleData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const assignRoleToUserThunk = createAsyncThunk(
    'role/assignToUser',
    async ({ userId, roleId }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiAssignRoleToUser(userId, roleId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    roles: [],
    role: null,
    isLoading: false,
    error: null,
    status: 'idle',
};

const rolesSlice = createSlice({
    name: 'role',
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
            // Fetch All Roles
            .addCase(fetchAllRolesThunk.pending, handlePending)
            .addCase(fetchAllRolesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles = action.payload.data;
                state.status = 'succeeded';
            })
            .addCase(fetchAllRolesThunk.rejected, handleRejected)

            // Fetch Role
            .addCase(fetchRoleThunk.pending, handlePending)
            .addCase(fetchRoleThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.role = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchRoleThunk.rejected, handleRejected)

            // Add Role
            .addCase(addRoleThunk.pending, handlePending)
            .addCase(addRoleThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles.push(action.payload.data);
                state.status = 'succeeded';
            })
            .addCase(addRoleThunk.rejected, handleRejected)

            // Delete Role
            .addCase(deleteRoleThunk.pending, handlePending)
            .addCase(deleteRoleThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles = state.roles.filter(role => role._id !== action.payload._id);
                state.status = 'succeeded';
            })
            .addCase(deleteRoleThunk.rejected, handleRejected)

            // Update Role
            .addCase(updateRoleThunk.pending, handlePending)
            .addCase(updateRoleThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.roles.findIndex(role => role._id === action.payload.data._id);
                if (index !== -1) {
                    state.roles[index] = action.payload.data;
                }
                state.status = 'succeeded';
            })
            .addCase(updateRoleThunk.rejected, handleRejected)

            // Assign Role to User
            .addCase(assignRoleToUserThunk.pending, handlePending)
            .addCase(assignRoleToUserThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.status = 'succeeded';
            })
            .addCase(assignRoleToUserThunk.rejected, handleRejected)

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});
export default rolesSlice.reducer;

export const selectAllRoles = (state) => state.role.roles;
export const selectRole = (state) => state.role.role;
export const selectRoleIsLoading = (state) => state.role.isLoading;
export const selectRoleError = (state) => state.role.error;
export const selectRoleStatus = (state) => state.role.status;
