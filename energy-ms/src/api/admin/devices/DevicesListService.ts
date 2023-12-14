import { GET_ALL_DEVICES } from "../../../constants/DevicesRequestEndpoints";
import { AxiosResponse } from "axios";
import axiosDevicesInstance from "../../axiosConfig/AxiosDevicesConfig";

export const  DevicesListService = async (): Promise<AxiosResponse>  => {    
    return axiosDevicesInstance.get(GET_ALL_DEVICES)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}
