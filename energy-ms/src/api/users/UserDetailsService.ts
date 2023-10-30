import axios, { AxiosResponse } from "axios";
import { USERS_USERVICE_URL } from "../../constants/AxiosConstants";
import { GET_SELF_DETAILS } from "../../constants/UsersRequestEndpoints";
import axiosUsersInstance from "../axiosConfig/AxiosUsersConfig";

export const  UserDetailsService = async (): Promise<AxiosResponse>  => {    
    return axiosUsersInstance.get(GET_SELF_DETAILS)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}