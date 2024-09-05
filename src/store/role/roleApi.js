import { axiosInstance as axios, getAuthConfig } from "../axiosInstance";


const apiAddRole = async (roleData, accessToken) => {
    try {
        const { data } = await axios.post('/roles/add-role', roleData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchAllRoles = async (accessToken) => {
    try {
        const { data } = await axios.get('/roles/get-all-roles', getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiFetchRole = async (roleId, accessToken) => {
    try {
        const { data } = await axios.get(`/roles/get-role/${roleId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiDeleteRole = async (roleId, accessToken) => {
    try {
        const { data } = await axios.delete(`/roles/delete-role/${roleId}`, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiUpdateRole = async (roleId, roleData, accessToken) => {
    try {
        const { data } = await axios.patch(`/roles/update-role/${roleId}`, roleData, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

const apiAssignRoleToUser = async (userId, roleName, accessToken) => {
    try {
        const { data } = await axios.patch('/roles/assign-role-to-user', { userId, roleName }, getAuthConfig(accessToken));
        return data;
    } catch (error) {
        throw error;
    }
};

export {
    apiFetchAllRoles,
    apiFetchRole,
    apiAddRole,
    apiDeleteRole,
    apiUpdateRole,
    apiAssignRoleToUser,
};
