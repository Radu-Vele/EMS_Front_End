import { AxiosResponse } from "axios";
import { GET_ALL_USERS } from "../../../constants/UsersRequestEndpoints";
import axiosUsersInstance from "../../axiosConfig/AxiosUsersConfig";

export const  UsersListService = async (): Promise<AxiosResponse>  => {    
    return axiosUsersInstance.get(GET_ALL_USERS)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}