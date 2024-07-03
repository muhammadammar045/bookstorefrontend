import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./user/userAuthSlice";  // Adjust the path as needed

const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
    },
});

export default store;
