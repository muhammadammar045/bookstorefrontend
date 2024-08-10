// STORE
import store from "./store"


// USER
import {
    registerUserThunk,
    fetchUserThunk,
    fetchAllUserThunk,
    loginUserThunk,
    logoutUserThunk,
    updateUserThunk,
    deleteUserThunk,
    selectUser,
    selectUsers,
    selectFetchedUser,
    selectUserRole,
    selectUserPermissions,
    selectUserIsLoading,
    selectUserError,
    selectAccessToken,
    selectRefreshToken,
    selectUserId
} from "./user/userAuthSlice";


// ROLE
import {
    addRoleThunk,
    fetchRoleThunk,
    fetchAllRolesThunk,
    updateRoleThunk,
    deleteRoleThunk,
    assignRoleToUserThunk,
    resetSelectedRole,
    selectRole,
    selectAllRoles,
    selectRoleError,
    selectRoleStatus,
    selectRoleIsLoading,
} from "./role/roleSlice"


// PERMISSION
import {
    addPermissionThunk,
    fetchPermissionThunk,
    fetchAllPermissionsThunk,
    updatePermissionThunk,
    deletePermissionThunk,
    assignPermissionsToRoleThunk,
    resetSelectedPermission,
    selectPermission,
    selectAllPermissions,
    selectPermissionError,
    selectPermissionStatus,
    selectPermissionIsLoading,
} from "./permission/permissionSlice"


// PRODUCT
import {
    addProductThunk,
    fetchProductsThunk,
    fetchAllUsersProductsThunk,
    fetchProductThunk,
    updateProductThunk,
    updateProductThumbnailThunk,
    deleteProductThunk,
    resetSelectedProduct,
    setSearchQuery,
    selectSearchQuery,
    selectProduct,
    selectProducts,
    selectProductIsLoading,
    selectProductError,
    selectCurrentPage,
    selectStatus,
    selectLimit,
    selectTotalPages,
    selectTotalDocuments,
} from "./products/productSlice"


// MODEL
import {
    selectShowModal,
    selectModalContext,
    openModal,
    closeModal,
} from "./modal/modalSlice"

export {
    //STORE
    store,

    // USER SLICE
    registerUserThunk,
    fetchUserThunk,
    fetchAllUserThunk,
    loginUserThunk,
    logoutUserThunk,
    updateUserThunk,
    deleteUserThunk,
    selectUser,
    selectUsers,
    selectFetchedUser,
    selectUserRole,
    selectUserPermissions,
    selectUserIsLoading,
    selectUserError,
    selectAccessToken,
    selectRefreshToken,
    selectUserId,

    // ROLE SLICE
    addRoleThunk,
    fetchRoleThunk,
    fetchAllRolesThunk,
    updateRoleThunk,
    deleteRoleThunk,
    assignRoleToUserThunk,
    resetSelectedRole,
    selectRole,
    selectAllRoles,
    selectRoleError,
    selectRoleStatus,
    selectRoleIsLoading,

    // PERMISSION SLICE
    addPermissionThunk,
    fetchPermissionThunk,
    fetchAllPermissionsThunk,
    updatePermissionThunk,
    deletePermissionThunk,
    assignPermissionsToRoleThunk,
    resetSelectedPermission,
    selectPermission,
    selectAllPermissions,
    selectPermissionError,
    selectPermissionStatus,
    selectPermissionIsLoading,

    // PRODUCT SLICE
    addProductThunk,
    fetchProductsThunk,
    fetchAllUsersProductsThunk,
    fetchProductThunk,
    updateProductThunk,
    updateProductThumbnailThunk,
    deleteProductThunk,
    resetSelectedProduct,
    setSearchQuery,
    selectSearchQuery,
    selectProduct,
    selectProducts,
    selectProductIsLoading,
    selectProductError,
    selectCurrentPage,
    selectStatus,
    selectLimit,
    selectTotalPages,
    selectTotalDocuments,


    // MODAL SLICE
    selectShowModal,
    selectModalContext,
    openModal,
    closeModal,
}