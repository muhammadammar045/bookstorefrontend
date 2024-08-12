import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./user/userAuthSlice";
import productsReducer from "./products/productSlice";
import modalReducer from "./modal/modalSlice";
import roleReducer from "./role/roleSlice";
import permissionReducer from "./permission/permissionSlice";
import categoryReducer from "./category/categorySlice";
import dashboardReducer from "./dashboard/dashboardSlice";

const store = configureStore({
    reducer: {
        UserSlice: userAuthReducer,
        ProductSlice: productsReducer,
        ModalSlice: modalReducer,
        RoleSlice: roleReducer,
        PermissionSlice: permissionReducer,
        CategorySlice: categoryReducer,
        dashboardSlice: dashboardReducer,
    },
});

export default store;
