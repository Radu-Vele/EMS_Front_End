import axios, { InternalAxiosRequestConfig } from "axios";
import { USERS_USERVICE_URL } from "../../constants/AxiosConstants";

const axiosUsersInstance = axios.create({
    baseURL: USERS_USERVICE_URL
})

axiosUsersInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers["Authorization"] = localStorage.getItem("token")
    return config
})

export default axiosUsersInstance