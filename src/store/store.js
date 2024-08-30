import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./user/userAuthSlice";
import productsReducer from "./products/productSlice";
import modalReducer from "./modal/modalSlice";
import roleReducer from "./role/roleSlice";
import permissionReducer from "./permission/permissionSlice";
import categoryReducer from "./category/categorySlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import searchReducer from "./search/searchSlice";
import filterReducer from "./filter/filterSlice";

const store = configureStore({
    reducer: {
        users: userAuthReducer,
        products: productsReducer,
        modals: modalReducer,
        roles: roleReducer,
        permissions: permissionReducer,
        categories: categoryReducer,
        dashboard: dashboardReducer,
        search: searchReducer,
        filters: filterReducer,
    },
});

export default store;
