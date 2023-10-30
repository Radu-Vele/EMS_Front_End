import { AxiosResponse } from "axios";
import axiosUsersInstance from "../axiosConfig/AxiosUsersConfig";
import { GET_SELF_ID } from "../../constants/UsersRequestEndpoints";

export const  UserIdService = async (): Promise<AxiosResponse>  => {    
    return axiosUsersInstance.get(GET_SELF_ID)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}
