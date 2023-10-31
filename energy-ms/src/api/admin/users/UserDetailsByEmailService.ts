import { AxiosResponse } from "axios";
import axiosUsersInstance from "../../axiosConfig/AxiosUsersConfig";
import { EDIT_USER } from "../../../constants/UsersRequestEndpoints";

export const  UserDetailsByEmailService = async (user): Promise<AxiosResponse>  => {    
    return axiosUsersInstance.put(EDIT_USER, user)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}