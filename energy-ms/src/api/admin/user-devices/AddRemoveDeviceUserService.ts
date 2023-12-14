import { AxiosResponse } from "axios";
import axiosDevicesInstance from "../../axiosConfig/AxiosDevicesConfig";
import { ADD_DEVICE_TO_USER, REMOVE_DEVICE_FROM_USER } from "../../../constants/DevicesRequestEndpoints";

export function AddRemoveDeviceUserService(userId: string, deviceId: string, remove: boolean): Promise<AxiosResponse> {
    return axiosDevicesInstance.put(remove ? REMOVE_DEVICE_FROM_USER : ADD_DEVICE_TO_USER, { userId, deviceId })
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}