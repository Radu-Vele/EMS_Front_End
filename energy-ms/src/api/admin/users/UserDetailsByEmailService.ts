import { AxiosResponse } from "axios";
import axiosUsersInstance from "../../axiosConfig/AxiosUsersConfig";
import { EDIT_USER, GET_USER_DETAILS } from "../../../constants/UsersRequestEndpoints";

export const  UserDetailsByEmailService = async (emailAddress:string): Promise<AxiosResponse>  => {    
    return axiosUsersInstance.get(GET_USER_DETAILS + "?emailAddress=" + emailAddress)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}