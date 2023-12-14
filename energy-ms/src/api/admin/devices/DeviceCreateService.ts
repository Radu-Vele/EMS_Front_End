import { CREATE_DEVICE } from "../../../constants/DevicesRequestEndpoints";
import { AxiosResponse } from "axios";
import axiosDevicesInstance from "../../axiosConfig/AxiosDevicesConfig";

export const  DeviceCreateService = async (deviceInfo): Promise<AxiosResponse>  => {    
    return axiosDevicesInstance.post(CREATE_DEVICE, deviceInfo)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}
