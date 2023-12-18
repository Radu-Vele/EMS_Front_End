import axios, { InternalAxiosRequestConfig } from "axios";
import { USERS_USERVICE_URL } from "../../constants/AxiosConstants";

const axiosUsersGuestInstance = axios.create({
    baseURL: USERS_USERVICE_URL
})

export default axiosUsersGuestInstance