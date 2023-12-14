import { AxiosResponse } from "axios";
import { GET_DETAILS_BY_ID } from "../../../constants/DevicesRequestEndpoints";
import axiosDevicesInstance from "../../axiosConfig/AxiosDevicesConfig";

export const  DeviceDetailsByIdService = async (id: string): Promise<AxiosResponse>  => {    
    return axiosDevicesInstance.get(GET_DETAILS_BY_ID + "?id=" + id)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}