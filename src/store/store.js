import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./user/userAuthSlice";
import booksReducer from "./book/bookSlice";

const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        booksData: booksReducer,
    },
});

export default store;
