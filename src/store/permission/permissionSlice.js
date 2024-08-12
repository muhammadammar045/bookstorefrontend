import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiFetchAllPermissions,
    apiFetchPermission,
    apiAddPermission,
    apiDeletePermission,
    apiUpdatePermission,
    apiAssignPermissionsToRole
} from './permissionApi';
import { logoutUserThunk, selectAccessToken } from '../user/userAuthSlice';
import { apiFetchRole } from '../role/roleApi';


export const addPermissionThunk = createAsyncThunk(
    'permission/add',
    async (permissionData, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiAddPermission(permissionData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchPermissionThunk = createAsyncThunk(
    'permission/fetch',
    async (permissionId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchPermission(permissionId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchAllPermissionsThunk = createAsyncThunk(
    'permission/fetchAll',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiFetchAllPermissions(accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePermissionThunk = createAsyncThunk(
    'permission/update',
    async ({ permissionId, permissionData }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiUpdatePermission(permissionId, permissionData, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const assignPermissionsToRoleThunk = createAsyncThunk(
    'permission/assignToRole',
    async ({ roleId, permissionsName }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            await apiAssignPermissionsToRole(roleId, permissionsName, accessToken);

            const response = await apiFetchRole(roleId, accessToken);

            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePermissionThunk = createAsyncThunk(
    'permission/delete',
    async (permissionId, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiDeletePermission(permissionId, accessToken);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    permissions: [],
    permission: null,
    isLoading: false,
    error: null,
    status: 'idle',
};

const permissionsSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        resetSelectedPermission: (state) => {
            state.permission = null;
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

            // Add Permission
            .addCase(addPermissionThunk.pending, handlePending)
            .addCase(addPermissionThunk.rejected, handleRejected)
            .addCase(addPermissionThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions.push(action.payload.data);
                state.status = 'succeeded';
            })

            // Fetch Permission
            .addCase(fetchPermissionThunk.pending, handlePending)
            .addCase(fetchPermissionThunk.rejected, handleRejected)
            .addCase(fetchPermissionThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permission = action.payload.data;
                state.status = 'succeeded';
            })

            // Fetch All Permissions
            .addCase(fetchAllPermissionsThunk.pending, handlePending)
            .addCase(fetchAllPermissionsThunk.rejected, handleRejected)
            .addCase(fetchAllPermissionsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions = action.payload.data;
                state.status = 'succeeded';
            })

            // Update Permission
            .addCase(updatePermissionThunk.pending, handlePending)
            .addCase(updatePermissionThunk.rejected, handleRejected)
            .addCase(updatePermissionThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions = state.permissions.map(permission => permission._id === action.payload.data._id ? action.payload.data : permission);
                state.status = 'succeeded';
                state.permission = null
            })

            // Delete Permission
            .addCase(deletePermissionThunk.pending, handlePending)
            .addCase(deletePermissionThunk.rejected, handleRejected)
            .addCase(deletePermissionThunk.fulfilled, (state, action) => {
                state.permissions = state.permissions.filter(permission => permission?._id !== action.payload?.data?._id);
                state.isLoading = false;
                state.status = 'succeeded';
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => initialState);
    },
});


export const { resetSelectedPermission } = permissionsSlice.actions;
export default permissionsSlice.reducer;

export const selectAllPermissions = (state) => state.PermissionSlice.permissions;
export const selectPermission = (state) => state.PermissionSlice.permission;
export const selectPermissionIsLoading = (state) => state.PermissionSlice.isLoading;
export const selectPermissionError = (state) => state.PermissionSlice.error;
export const selectPermissionStatus = (state) => state.PermissionSlice.status;