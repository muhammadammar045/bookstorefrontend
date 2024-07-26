import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./user/userAuthSlice";
import booksReducer from "./book/bookSlice";
import modalReducer from "./modal/modalSlice";

const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        booksData: booksReducer,
        modal: modalReducer,

    },
});

export default store;
