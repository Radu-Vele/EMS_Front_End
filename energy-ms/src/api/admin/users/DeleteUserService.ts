import { AxiosResponse } from "axios";
import { DELETE_USER } from "../../../constants/UsersRequestEndpoints";
import axiosUsersInstance from "../../axiosConfig/AxiosUsersConfig";

export const  DeleteUserService = async (emailAddress: string): Promise<AxiosResponse>  => {    
    return axiosUsersInstance.delete(DELETE_USER + "?emailAddress=" + emailAddress)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}