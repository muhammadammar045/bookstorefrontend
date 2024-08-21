// STORE
import store from "./store"

//DASHBOARD
import {
    fetchDashboardStatsThunk,
    selectDashboardStats,
    selectDashboardIsLoading,
    selectDashboardError,
} from "./dashboard/dashboardSlice"


// USER
import {
    registerUserThunk,
    fetchUserThunk,
    fetchAllUserThunk,
    loginUserThunk,
    logoutUserThunk,
    updateUserThunk,
    deleteUserThunk,
    resetSelectedUser,
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
    fetchCurrentUserProductsThunk,
    fetchAllUsersProductsThunk,
    fetchAllUsersProductsAdminThunk,
    fetchProductThunk,
    updateProductThunk,
    updateProductThumbnailThunk,
    deleteProductThunk,
    resetSelectedProduct,
    setSearchQuery,
    selectSearchQuery,
    selectProduct,
    selectProducts,
    selectAdminProducts,
    selectProductIsLoading,
    selectProductError,
    selectCurrentPage,
    selectStatus,
    selectLimit,
    selectTotalPages,
    selectTotalDocuments,
} from "./products/productSlice"


// PERMISSION
import {
    addCategoryThunk,
    fetchCategoryThunk,
    fetchAllCategoriesThunk,
    updateCategoryThunk,
    deleteCategoryThunk,
    resetSelectedCategory,
    selectCategory,
    selectAllCategories,
    selectCategoryError,
    selectCategoryStatus,
    selectCategoryIsLoading,
} from "./category/categorySlice"


// MODEL
import {
    selectShowModal,
    openModal,
    closeModal,
} from "./modal/modalSlice"

export {
    //STORE
    store,

    // DASHBOARD SLICE
    fetchDashboardStatsThunk,
    selectDashboardStats,
    selectDashboardIsLoading,
    selectDashboardError,

    // USER SLICE
    registerUserThunk,
    fetchUserThunk,
    fetchAllUserThunk,
    loginUserThunk,
    logoutUserThunk,
    updateUserThunk,
    deleteUserThunk,
    resetSelectedUser,
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
    fetchCurrentUserProductsThunk,
    fetchAllUsersProductsThunk,
    fetchAllUsersProductsAdminThunk,
    fetchProductThunk,
    updateProductThunk,
    updateProductThumbnailThunk,
    deleteProductThunk,
    resetSelectedProduct,
    setSearchQuery,
    selectSearchQuery,
    selectProduct,
    selectProducts,
    selectAdminProducts,
    selectProductIsLoading,
    selectProductError,
    selectCurrentPage,
    selectStatus,
    selectLimit,
    selectTotalPages,
    selectTotalDocuments,

    // CATEGORY SLICE
    addCategoryThunk,
    fetchCategoryThunk,
    fetchAllCategoriesThunk,
    updateCategoryThunk,
    deleteCategoryThunk,
    resetSelectedCategory,
    selectCategory,
    selectAllCategories,
    selectCategoryError,
    selectCategoryStatus,
    selectCategoryIsLoading,

    // MODAL SLICE
    selectShowModal,
    openModal,
    closeModal,
}