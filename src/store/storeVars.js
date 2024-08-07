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
    selectUserIsLoading,
    selectUserError,
    selectAccessToken,
    selectRefreshToken,
    selectUserId
} from "@store/user/userAuthSlice";

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
} from "@store/role/roleSlice"

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
} from "@store/permission/permissionSlice"


import {
    addBookThunk,
    fetchBooksThunk,
    fetchAllUsersBooksThunk,
    fetchBookThunk,
    updateBookThunk,
    updateBookThumbnailThunk,
    deleteBookThunk,
    selectBook,
    selectBooks,
    selectBookIsLoading,
    selectCurrentPage,
    selectBookError,
    selectStatus,
    selectLimit,
    selectTotalPages,
    selectTotalDocuments
} from "@store/book/bookSlice"

import {
    selectShowModal,
    selectModalContext,
    openModal,
    closeModal,
} from "@store/modal/modalSlice"

export {
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