import { GET_ALL_USER_DEVICES } from "../../constants/DevicesRequestEndpoints";
import { AxiosResponse } from "axios";
import { axiosDevicesInstance } from "../axiosConfig/AxiosDevicesConfig";

export const  UserDeviceListService = async (id: string): Promise<AxiosResponse>  => {    
    return axiosDevicesInstance.get(GET_ALL_USER_DEVICES + "?id=" + id)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}
