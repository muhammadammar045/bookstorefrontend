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


// BOOK
import {
    addBookThunk,
    fetchBooksThunk,
    fetchAllUsersBooksThunk,
    fetchBookThunk,
    updateBookThunk,
    updateBookThumbnailThunk,
    deleteBookThunk,
    resetSelectedBook,
    setSearchQuery,
    selectSearchQuery,
    selectBook,
    selectBooks,
    selectBookIsLoading,
    selectCurrentPage,
    selectBookError,
    selectStatus,
    selectLimit,
    selectTotalPages,
    selectTotalDocuments
} from "./book/bookSlice"


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

    // BOOK SLICE
    addBookThunk,
    fetchBooksThunk,
    fetchAllUsersBooksThunk,
    fetchBookThunk,
    updateBookThunk,
    updateBookThumbnailThunk,
    deleteBookThunk,
    resetSelectedBook,
    setSearchQuery,
    selectSearchQuery,
    selectBook,
    selectBooks,
    selectBookIsLoading,
    selectCurrentPage,
    selectBookError,
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