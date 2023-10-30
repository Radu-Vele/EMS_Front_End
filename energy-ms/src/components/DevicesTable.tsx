import { TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import React, { useEffect, useState } from "react"
import { UserDeviceListService } from "../api/users/UserDeviceListService"
import { UserIdService } from "../api/users/UserIdService"

export type DeviceInfo = {
    id: string,
    description: string,
    address: string,
    maxEnergyConsumption: string
}

export function DevicesTable(): React.JSX.Element {
    const [devicesList, setDevicesList] = useState([])
    //TODO: optimize calls (save user ID in local storage or so)
    useEffect(() => {
        let unmounted = false
        const fetchData = async () => {
            const responseId = await UserIdService()
            const response = await UserDeviceListService(responseId.data)
            setDevicesList(response.data)
        }
        if (unmounted == false) {
            fetchData()
            unmounted = true
        }
    }, [])

    return (
        <TableContainer>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Max. energy consumption (kW/hour)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {devicesList.map((device) => (
                    <TableRow>
                        <TableCell>{device.id}</TableCell>
                        <TableCell>{device.description}</TableCell>
                        <TableCell>{device.address}</TableCell>
                        <TableCell>{device.maxHourlyEnergyConsumption}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
    )
}