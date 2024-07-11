import axios from "axios";
import envVars from "../../envexport"

const axiosInstance = axios.create({
    baseURL: envVars.backend_uri,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance;