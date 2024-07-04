// userApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import envVars from "../../../envexport";

export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${envVars.backend_uri}/user/login`, credentials);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const logoutUser = createAsyncThunk(
    "user/logout",
    async ({ rejectWithValue }) => {
        try {
            const response = await axios.post(`${envVars.backend_uri}/user/logout`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const registerUser = createAsyncThunk(
    "user/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${envVars.backend_uri}/user/register`, credentials);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
