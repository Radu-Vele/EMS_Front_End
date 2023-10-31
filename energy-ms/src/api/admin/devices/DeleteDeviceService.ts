import { AxiosResponse } from "axios"
import { DELETE_DEVICE } from "../../../constants/DevicesRequestEndpoints"
import { axiosDevicesInstance } from "../../axiosConfig/AxiosDevicesConfig"

export function DeleteDeviceService(deviceId: string): Promise<AxiosResponse> {
    return axiosDevicesInstance.delete(DELETE_DEVICE + "?id=" + deviceId)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}