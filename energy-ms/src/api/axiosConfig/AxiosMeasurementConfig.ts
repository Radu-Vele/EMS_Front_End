import axios, { InternalAxiosRequestConfig } from "axios";
import { MEASUREMENTS_USERVICE_URL } from "../../constants/AxiosConstants";

const axiosMeasurementsInstance = axios.create({
    baseURL: MEASUREMENTS_USERVICE_URL
})

axiosMeasurementsInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config
})

export default axiosMeasurementsInstance