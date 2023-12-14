import axios, { InternalAxiosRequestConfig } from "axios";
import { CHAT_USERVICE_URL } from "../../constants/AxiosConstants";

const axiosChatInstance = axios.create({
    baseURL: CHAT_USERVICE_URL
})

axiosChatInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers["Authorization"] = localStorage.getItem("token")
    return config
})

export default axiosChatInstance
