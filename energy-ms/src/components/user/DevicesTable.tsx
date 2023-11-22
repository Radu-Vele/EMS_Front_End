import { TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import React, { useEffect, useState } from "react"
import { UserDeviceListService } from "../../api/users/UserDeviceListService"
import { UserIdService } from "../../api/users/UserIdService"

export type DeviceInfo = {
    id: string,
    description: string,
    address: string,
    maxHourlyEnergyConsumption: string
}

export function DevicesTable(): React.JSX.Element {
    const [devicesList, setDevicesList] = useState([])
    useEffect(() => {
        let unmounted = false
        const fetchData = async () => {
            const response = await UserDeviceListService(sessionStorage.getItem("userId"))
            setDevicesList(response.data)
        }
        if (unmounted == false) {
            fetchData()
            unmounted = true
        }
    }, [])

    return ( // TODO: fix table warning
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
                {devicesList !== undefined? devicesList.map((device: DeviceInfo, index) => ( // TODO: handle map error
                    <TableRow key={index}>
                        <TableCell>{device.id}</TableCell>
                        <TableCell>{device.description}</TableCell>
                        <TableCell>{device.address}</TableCell>
                        <TableCell>{device.maxHourlyEnergyConsumption}</TableCell>
                    </TableRow>
                )) : <></>}
            </TableBody>
        </TableContainer>
    )
}