import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';
import {
    apiFetchAllRoles, apiFetchRole, apiAddRole, apiDeleteRole, apiUpdateRole, apiAssignRoleToUser
} from './roleApi';
import { assignPermissionsToRoleThunk } from '../permission/permissionSlice';
import { apiFetchUser } from '../user/userApi';

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
    async ({ userId, roleName }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            await apiAssignRoleToUser(userId, roleName, accessToken);

            const response = await apiFetchUser(userId, accessToken);

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
    reducers: {
        resetSelectedRole: (state) => {
            state.role = null;
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

        builder

            // Add Role
            .addCase(addRoleThunk.pending, handlePending)
            .addCase(addRoleThunk.rejected, handleRejected)
            .addCase(addRoleThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles.push(action.payload.data);
                state.status = 'succeeded';
            })

            // Fetch Role
            .addCase(fetchRoleThunk.pending, handlePending)
            .addCase(fetchRoleThunk.rejected, handleRejected)
            .addCase(fetchRoleThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.role = action.payload.data;
                state.status = 'succeeded';
            })

            // Fetch All Roles
            .addCase(fetchAllRolesThunk.pending, handlePending)
            .addCase(fetchAllRolesThunk.rejected, handleRejected)
            .addCase(fetchAllRolesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles = action.payload.data;
                state.status = 'succeeded';
            })

            // Update Role
            .addCase(updateRoleThunk.pending, handlePending)
            .addCase(updateRoleThunk.rejected, handleRejected)
            .addCase(updateRoleThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles = state.roles.map(role => role._id === action.payload.data._id ? action.payload.data : role);
                state.status = 'succeeded';
                state.role = null;
            })

            // Assign Permissions to Role
            .addCase(assignPermissionsToRoleThunk.pending, handlePending)
            .addCase(assignPermissionsToRoleThunk.rejected, handleRejected)
            .addCase(assignPermissionsToRoleThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles = state.roles.map(role => role._id === action.payload.data._id ? action.payload.data : role);
                state.status = 'succeeded';
                state.role = null
            })

            // Delete Role
            .addCase(deleteRoleThunk.pending, handlePending)
            .addCase(deleteRoleThunk.rejected, handleRejected)
            .addCase(deleteRoleThunk.fulfilled, (state, action) => {
                state.roles = state.roles.filter(role => role._id !== action.payload.data._id);
                state.isLoading = false;
                state.status = 'succeeded';
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});

export const { resetSelectedRole } = rolesSlice.actions;
export default rolesSlice.reducer;

export const selectAllRoles = (state) => state.RoleSlice.roles;
export const selectRole = (state) => state.RoleSlice.role;
export const selectRoleIsLoading = (state) => state.RoleSlice.isLoading;
export const selectRoleError = (state) => state.RoleSlice.error;
export const selectRoleStatus = (state) => state.RoleSlice.status;
