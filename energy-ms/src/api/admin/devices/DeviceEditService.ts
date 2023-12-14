import { AxiosResponse } from "axios";
import { EDIT_DEVICE } from "../../../constants/DevicesRequestEndpoints";
import axiosDevicesInstance from "../../axiosConfig/AxiosDevicesConfig";

export const  DeviceEditService = async (deviceInfo): Promise<AxiosResponse>  => {    
    return axiosDevicesInstance.put(EDIT_DEVICE, deviceInfo)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}