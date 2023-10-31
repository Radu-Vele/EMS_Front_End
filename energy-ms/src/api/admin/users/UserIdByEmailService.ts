import { AxiosResponse } from "axios";
import { GET_USER_ID_BY_EMAIL } from "../../../constants/UsersRequestEndpoints";
import axiosUsersInstance from "../../axiosConfig/AxiosUsersConfig";

export const  UserIdByEmailService = async (email: string): Promise<AxiosResponse>  => {    
    return axiosUsersInstance.get(GET_USER_ID_BY_EMAIL + "?emailAddress=" + email)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}
