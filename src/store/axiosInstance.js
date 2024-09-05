import axios from "axios";
import envVars from "../../envexport"

export const getAuthConfig = (accessToken, contentType = "application/json") => {
    const config = {
        headers: {
            "Content-Type": contentType,
        },
    };
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
};

export const axiosInstance = axios.create({
    baseURL: envVars.backend_uri,
    headers: {
        'Content-Type': 'application/json'
    }
})

