import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userAuthSlice.js"

const store = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default store;