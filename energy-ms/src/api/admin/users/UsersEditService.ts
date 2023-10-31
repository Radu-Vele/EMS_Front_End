import { AxiosResponse } from "axios";
import { EDIT_USER } from "../../../constants/UsersRequestEndpoints";
import axiosUsersInstance from "../../axiosConfig/AxiosUsersConfig";

export const  UserEditService = async (user): Promise<AxiosResponse>  => {    
    return axiosUsersInstance.put(EDIT_USER, {
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    })
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}