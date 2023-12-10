import axios from "axios";
import { CHAT_USERVICE_URL } from "../../constants/AxiosConstants";

export const axiosChatInstance = axios.create({
    baseURL: CHAT_USERVICE_URL
})