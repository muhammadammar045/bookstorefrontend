import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";

const apiAddPermission = async (permissionData, accessToken) => {
    try {
        const { data } = await axios.post('/permissions/add-permission', permissionData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchAllPermissions = async (accessToken) => {
    try {
        const { data } = await axios.get('/permissions/get-all-permissions', getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchPermission = async (permissionId, accessToken) => {
    try {
        const { data } = await axios.get(`/permissions/get-permission/${permissionId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiDeletePermission = async (permissionId, accessToken) => {
    try {
        const { data } = await axios.delete(`/permissions/delete-permission/${permissionId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiUpdatePermission = async (permissionId, permissionData, accessToken) => {
    try {
        const { data } = await axios.patch(`/permissions/update-permission/${permissionId}`, permissionData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiAssignPermissionsToRole = async (roleId, permissionsName, accessToken) => {
    try {
        const { data } = await axios.patch('/permissions/assign-permissions-to-role', { roleId, permissionsName }, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export {
    apiAssignPermissionsToRole,
    apiUpdatePermission,
    apiAddPermission,
    apiDeletePermission,
    apiFetchAllPermissions,
    apiFetchPermission
};
