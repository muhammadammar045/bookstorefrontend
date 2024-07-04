// userApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import envVars from "../../../envexport";
import { selectAccessToken } from "./userAuthSlice";


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
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const accessToken = selectAccessToken(state);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await axios.post(`${envVars.backend_uri}/user/logout`, {}, config);
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
