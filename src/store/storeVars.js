//=============================================================== STORE ===============================================================
import store from "./store";


//============================================================= DASHBOARD ==========================================================
import {
    fetchDashboardStatsThunk, selectDashboardStats, selectDashboardIsLoading, selectDashboardError
} from "./dashboard/dashboardSlice";



//================================================================= LIKES =============================================================
import {
    toggleProductLikeThunk, toggleReviewLikeThunk, fetchAllLikedProductsThunk, selectIsLiked, selectLikedProducts, selectLikeError, selectLikeIsLoading
} from "./like/likeSlice";



//=============================================================== ORDERS =============================================================
import {
    createOrderThunk, fetchAllOrdersAdminThunk, fetchCurrentUserOrdersThunk, cancelOrderThunk, fetchOrderThunk, resetSelectedOrder, selectAllOrders, selectOrder, selectOrderError, selectOrderIsLoading, selectOrderStatus, updateOrderStatusThunk
} from "./order/orderSlice";



//============================================================= PAYMENTS =============================================================
import {
    createStripePaymentThunk, selectStripePayment
} from "./payment/paymentSlice";



//================================================================= CART =============================================================
import {
    addProductToCartThunk, fetchUserCartThunk, removeProductFromCartThunk, resetSelectedCart, selectedCartIsLoading, selectedCartItem, selectedCartItems, selectedCartStatus, selectedCartTotal
} from "./cart/cartSlice";



//============================================================= FILTERS =============================================================
import {
    setFilterShow, setCurrentPage, setPageSize, setSort, setSortOrder, setPriceRange, setSelectedCategory, setSearchQuery, selectPaginationCurrentPage, selectFilterShow, selectPageSize, selectSort, selectSortOrder, selectPriceRange, selectSelectedCategory, selectSearchQuery
} from "./filter/filterSlice";



//=============================================================== USER ==============================================================
import {
    registerUserThunk, fetchUserThunk, fetchAllUserThunk, loginUserThunk, logoutUserThunk, updateUserThunk, deleteUserThunk, resetSelectedUser, selectUser, selectUsers, selectFetchedUser, selectUserRole, selectUserPermissions, selectUserIsLoading, selectUserError, selectAccessToken, selectRefreshToken, selectUserId
} from "./user/userAuthSlice";



//================================================================ ROLE ==============================================================
import {
    addRoleThunk, fetchRoleThunk, fetchAllRolesThunk, updateRoleThunk, deleteRoleThunk, assignRoleToUserThunk, resetSelectedRole, selectRole, selectAllRoles, selectRoleError, selectRoleStatus, selectRoleIsLoading
} from "./role/roleSlice";



//============================================================ PERMISSION ============================================================
import {
    addPermissionThunk, fetchPermissionThunk, fetchAllPermissionsThunk, updatePermissionThunk, deletePermissionThunk, assignPermissionsToRoleThunk, resetSelectedPermission, selectPermission, selectAllPermissions, selectPermissionError, selectPermissionStatus, selectPermissionIsLoading
} from "./permission/permissionSlice";



//============================================================= PRODUCT =============================================================
import {
    addProductThunk, fetchCurrentUserProductsThunk, fetchAllUsersProductsThunk, fetchAllUsersProductsAdminThunk, fetchProductThunk, updateProductThunk, updateProductThumbnailThunk, deleteProductThunk, resetSelectedProduct, selectProduct, selectProductId, selectProducts, selectAdminProducts, selectProductIsLoading, selectProductError, selectCurrentPage, selectStatus, selectTotalPages, selectTotalDocuments
} from "./products/productSlice";



//============================================================== CATEGORY ===========================================================
import {
    addCategoryThunk, fetchCategoryThunk, fetchCategoryProductsThunk, fetchAllCategoriesThunk, updateCategoryThunk, deleteCategoryThunk, resetSelectedCategory, selectCategory, selectCategoryProducts, selectAllCategories, selectCategoryError, selectCategoryStatus, selectCategoryIsLoading
} from "./category/categorySlice";



//=============================================================== MODAL =============================================================
import {
    selectShowModal, openModal, closeModal
} from "./modal/modalSlice";

import { fetchAllProductReviewsThunk, addReviewThunk, fetchReviewThunk, updateReviewThunk, deleteReviewThunk, resetSelectedReview, selectAllReviews, selectAllProductReviews, selectReview, selectReviewIsLoading, selectReviewError, selectReviewStatus, selectProductReviewsCount, selectProductReviewsAverageRating, selectProductReviewsIndividualStarCount }
    from "./review/reviewSlice"

//=============================================================== EXPORTS ============================================================
export {
    store,

    // Dashboard
    fetchDashboardStatsThunk, selectDashboardStats, selectDashboardIsLoading, selectDashboardError,

    // Likes
    toggleProductLikeThunk, toggleReviewLikeThunk, fetchAllLikedProductsThunk, selectIsLiked, selectLikedProducts, selectLikeError, selectLikeIsLoading,

    // Orders
    createOrderThunk, fetchAllOrdersAdminThunk, fetchCurrentUserOrdersThunk, cancelOrderThunk, fetchOrderThunk, resetSelectedOrder, selectAllOrders, selectOrder, selectOrderError, selectOrderIsLoading, selectOrderStatus, updateOrderStatusThunk,

    // Payments
    createStripePaymentThunk, selectStripePayment,

    // Cart
    addProductToCartThunk, fetchUserCartThunk, removeProductFromCartThunk, resetSelectedCart, selectedCartIsLoading, selectedCartItem, selectedCartItems, selectedCartStatus, selectedCartTotal,

    // Filters
    setFilterShow, setCurrentPage, setPageSize, setSort, setSortOrder, setPriceRange, setSelectedCategory, setSearchQuery, selectPaginationCurrentPage, selectFilterShow, selectPageSize, selectSort, selectSortOrder, selectPriceRange, selectSelectedCategory, selectSearchQuery,

    // User
    registerUserThunk, fetchUserThunk, fetchAllUserThunk, loginUserThunk, logoutUserThunk, updateUserThunk, deleteUserThunk, resetSelectedUser, selectUser, selectUsers, selectFetchedUser, selectUserRole, selectUserPermissions, selectUserIsLoading, selectUserError, selectAccessToken, selectRefreshToken, selectUserId,

    // Role
    addRoleThunk, fetchRoleThunk, fetchAllRolesThunk, updateRoleThunk, deleteRoleThunk, assignRoleToUserThunk, resetSelectedRole, selectRole, selectAllRoles, selectRoleError, selectRoleStatus, selectRoleIsLoading,

    // Permission
    addPermissionThunk, fetchPermissionThunk, fetchAllPermissionsThunk, updatePermissionThunk, deletePermissionThunk, assignPermissionsToRoleThunk, resetSelectedPermission, selectPermission, selectAllPermissions, selectPermissionError, selectPermissionStatus, selectPermissionIsLoading,

    // Product
    addProductThunk, fetchCurrentUserProductsThunk, fetchAllUsersProductsThunk, fetchAllUsersProductsAdminThunk, fetchProductThunk, updateProductThunk, updateProductThumbnailThunk, deleteProductThunk, resetSelectedProduct, selectProduct, selectProductId, selectProducts, selectAdminProducts, selectProductIsLoading, selectProductError, selectCurrentPage, selectStatus, selectTotalPages, selectTotalDocuments,

    // Category
    addCategoryThunk, fetchCategoryThunk, fetchCategoryProductsThunk, fetchAllCategoriesThunk, updateCategoryThunk, deleteCategoryThunk, resetSelectedCategory, selectCategory, selectCategoryProducts, selectAllCategories, selectCategoryError, selectCategoryStatus, selectCategoryIsLoading,

    // Modal
    selectShowModal, openModal, closeModal,

    //Reviews
    fetchAllProductReviewsThunk, addReviewThunk, fetchReviewThunk, updateReviewThunk, deleteReviewThunk, resetSelectedReview, selectAllReviews, selectAllProductReviews, selectReview, selectReviewIsLoading, selectReviewError, selectReviewStatus, selectProductReviewsCount, selectProductReviewsAverageRating, selectProductReviewsIndividualStarCount
};
