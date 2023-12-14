import axios, { AxiosResponse } from "axios";
import { FIND_ADMIN } from "../../constants/ChatRequestEndpoints";
import axiosChatInstance from "../axiosConfig/AxiosChatConfig";

export const UserChatService = async (): Promise<AxiosResponse>  => {    
    return axiosChatInstance.get(FIND_ADMIN)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}