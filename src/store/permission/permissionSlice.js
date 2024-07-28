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
    async ({ roleId, permissionIds }, { getState, rejectWithValue }) => {
        const state = getState();
        const accessToken = selectAccessToken(state);
        try {
            const response = await apiAssignPermissionsToRole(roleId, permissionIds, accessToken);
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All Permissions
            .addCase(fetchAllPermissionsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(fetchAllPermissionsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions = action.payload.data;
                state.status = 'succeeded';
            })
            .addCase(fetchAllPermissionsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = 'failed';
            })

            // Fetch Permission
            .addCase(fetchPermissionThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(fetchPermissionThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permission = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchPermissionThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = 'failed';
            })

            // Add Permission
            .addCase(addPermissionThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(addPermissionThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions.push(action.payload.data);
                state.status = 'succeeded';
            })
            .addCase(addPermissionThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = 'failed';
            })

            // Delete Permission
            .addCase(deletePermissionThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(deletePermissionThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions = state.permissions.filter(permission => permission._id !== action.payload._id);
                state.status = 'succeeded';
            })
            .addCase(deletePermissionThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = 'failed';
            })

            // Update Permission
            .addCase(updatePermissionThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(updatePermissionThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions = action.payload.data;
                state.status = 'succeeded';
            })
            .addCase(updatePermissionThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = 'failed';
            })

            // Assign Permission to Role
            .addCase(assignPermissionsToRoleThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = 'loading';
            })

            .addCase(assignPermissionsToRoleThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions = action.payload.data;
                state.status = 'succeeded';
            })

            .addCase(assignPermissionsToRoleThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = 'failed';
            })

            // Handle Logout
            .addCase(logoutUserThunk.fulfilled, () => {
                return initialState;
            });
    },

})




export default permissionsSlice.reducer;

export const selectAllPermissions = (state) => state.permission.permissions;
export const selectPermission = (state) => state.permission.permission;
export const selectPermissionIsLoading = (state) => state.permission.isLoading;
export const selectPermissionError = (state) => state.permission.error;
export const selectPermissionStatus = (state) => state.permission.status;