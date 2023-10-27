import axios, { AxiosResponse } from "axios";
import { USERS_USERVICE_URL } from "../../constants/AxiosConstants";
import { AUTHENTICATE } from "../../constants/UsersRequestEndpoints";

export const  AuthenticateUser = async (username: string, password: string): Promise<AxiosResponse>  => {
    return axios.post(USERS_USERVICE_URL + AUTHENTICATE, {
        username,
        password
    }).then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}