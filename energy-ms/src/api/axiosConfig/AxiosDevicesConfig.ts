import axios from "axios";
import { DEVICES_USERVICE_URL } from "../../constants/AxiosConstants";

export const axiosDevicesInstance = axios.create({
    baseURL: DEVICES_USERVICE_URL
})