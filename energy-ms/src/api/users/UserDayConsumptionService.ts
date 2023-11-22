import axios, { AxiosResponse } from "axios";
import { GET_DAY_CONSUMPTION } from "../../constants/MeasurementsRequestEndpoints";
import axiosMeasurementsInstance from "../axiosConfig/AxiosMeasurementConfig";

export const  UserDayConsumptionService = async (day_timestamp: number): Promise<AxiosResponse>  => {    
    return axiosMeasurementsInstance.get(GET_DAY_CONSUMPTION+`?dayTimestamp=${day_timestamp}&userId=${sessionStorage.getItem("userId")}`)
    .then(response => {
        return response
    }).catch((error) => {
        console.log("Caught" + error)
        return error
    })
}