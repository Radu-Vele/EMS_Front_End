import axios, { InternalAxiosRequestConfig } from "axios";
import { DEVICES_USERVICE_URL } from "../../constants/AxiosConstants";

const axiosDevicesInstance = axios.create({
    baseURL: DEVICES_USERVICE_URL
})

axiosDevicesInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers["Authorization"] = localStorage.getItem("token")
    return config
})

export default axiosDevicesInstance