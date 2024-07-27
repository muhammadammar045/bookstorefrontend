import axios from "../axiosInstance";

const apiAddRole = async (RoleData, accessToken) => {
    try {
        const response = await axios
            .post(
                '/roles/add-role',
                RoleData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiFetchAllRoles = async (accessToken) => {
    try {
        const response = await axios
            .get(`/roles/get-all-roles`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiFetchRole = async (roleId, accessToken) => {
    try {
        const response = await axios
            .get(`/roles/get-role/${roleId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiDeleteRole = async (roleId, accessToken) => {
    try {
        const response = await axios
            .delete(
                `/roles/delete-role/${roleId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiUpdateRole = async (roleId, roleData, accessToken) => {
    try {
        const response = await axios
            .patch(
                `/roles/update-role/${roleId}`,
                roleData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiAssignRoleToUser = async (userId, roleId, accessToken) => {
    try {
        const response = await axios
            .post(
                '/roles/assign-role',
                {
                    userId,
                    roleId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                }
            );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export {
    apiFetchAllRoles,
    apiFetchRole,
    apiAddRole,
    apiDeleteRole,
    apiUpdateRole,
    apiAssignRoleToUser
};



