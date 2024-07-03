import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import envVars from "../../../envexport";

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        const response = await axios.get(`${envVars.backend_uri}/api/user`);
        return response.data;
    }
)