import axios, { InternalAxiosRequestConfig } from "axios";
import { USERS_USERVICE_URL } from "../../constants/AxiosConstants";

const axiosInstance = axios.create({
    baseURL: USERS_USERVICE_URL
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers["Authorization"] = localStorage.getItem("token")
    return config
})

export default axiosInstance