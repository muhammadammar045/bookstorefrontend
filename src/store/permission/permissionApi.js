import axios from "../axiosInstance";

const apiAddPermission = async (permissionData, accessToken) => {
    try {
        const response = await axios
            .post(
                '/permissions/add-permission',
                permissionData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiFetchAllPermissions = async (accessToken) => {
    try {
        const response = await axios
            .get(`/permissions/get-all-permissions`,
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

const apiFetchPermission = async (permissionId, accessToken) => {
    try {
        const response = await axios
            .get(`/permissions/get-permission/${permissionId}`,
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

const apiDeletePermission = async (permissionId, accessToken) => {
    try {
        const response = await axios
            .delete(
                `/permissions/delete-permission/${permissionId}`,
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

const apiUpdatePermission = async (permissionId, permissionData, accessToken) => {
    try {
        const response = await axios
            .patch(
                `/permissions/update-permission/${permissionId}`,
                permissionData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
        return response.data;
    } catch (error) {
        throw error;
    }
}

const apiAssignPermissionsToRole = async (roleId, permissionsName, accessToken) => {
    try {
        const response = await axios
            .patch(
                '/permissions/assign-permissions-to-role',
                {
                    roleId,
                    permissionsName
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
    apiAssignPermissionsToRole,
    apiUpdatePermission,
    apiAddPermission,
    apiDeletePermission,
    apiFetchAllPermissions,
    apiFetchPermission

};



