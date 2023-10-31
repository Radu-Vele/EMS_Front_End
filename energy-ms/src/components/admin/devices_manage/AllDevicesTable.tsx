import { TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import React, { useEffect, useState } from "react"
import { DeviceInfo } from "../../user/DevicesTable"
import { DevicesListService } from "../../../api/admin/devices/DevicesListService"


export function AllDevicesTable(): React.JSX.Element {
    const [devicesList, setDevicesList] = useState([])
    //TODO: optimize calls (save user ID in local storage or so)
    useEffect(() => {
        let unmounted = false
        const fetchData = async () => {
            const response = await DevicesListService()
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
                {devicesList.map((device: DeviceInfo) => (
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