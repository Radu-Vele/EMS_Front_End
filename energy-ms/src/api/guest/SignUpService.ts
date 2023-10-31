import { AxiosResponse } from "axios";
import { USERS_USERVICE_URL } from "../../constants/AxiosConstants";
import { REGISTER_ADMIN, REGISTER_USER } from "../../constants/UsersRequestEndpoints";
import { NewUserData, UserSignupData } from "../../types/UserData";
import axiosUsersInstance from "../axiosConfig/AxiosUsersConfig";

function createNewUserBody(user: UserSignupData): NewUserData {
    return user
}

export const  SignUpService = async (newUserData: UserSignupData): Promise<AxiosResponse>  => {    
    return axiosUsersInstance.post(USERS_USERVICE_URL + (newUserData.isAdmin? REGISTER_ADMIN : REGISTER_USER), 
        createNewUserBody(newUserData))
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}