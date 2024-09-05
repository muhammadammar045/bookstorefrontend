import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./user/userAuthSlice";
import productsReducer from "./products/productSlice";
import modalReducer from "./modal/modalSlice";
import roleReducer from "./role/roleSlice";
import permissionReducer from "./permission/permissionSlice";
import categoryReducer from "./category/categorySlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import filterReducer from "./filter/filterSlice";
import orderReducer from "./order/orderSlice";
import cartReducer from "./cart/cartSlice";
import likeReducer from "./like/likeSlice";
import reviewReducer from "./review/reviewSlice";

const store = configureStore({
    reducer: {
        users: userAuthReducer,
        products: productsReducer,
        modals: modalReducer,
        roles: roleReducer,
        permissions: permissionReducer,
        categories: categoryReducer,
        dashboard: dashboardReducer,
        filter: filterReducer,
        likes: likeReducer,
        cart: cartReducer,
        orders: orderReducer,
        reviews: reviewReducer
    },
});

export default store;
