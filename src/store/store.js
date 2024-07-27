import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./user/userAuthSlice";
import booksReducer from "./book/bookSlice";
import modalReducer from "./modal/modalSlice";
import roleReducer from "./role/roleSlice";
import permissionReducer from "./permission/permissionSlice";

const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        booksData: booksReducer,
        modal: modalReducer,
        role: roleReducer,
        permission: permissionReducer,

    },
});

export default store;
