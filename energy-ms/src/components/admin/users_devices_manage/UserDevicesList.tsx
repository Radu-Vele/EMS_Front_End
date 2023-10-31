import { LoadingButton } from "@mui/lab"
import { Box, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { FormEvent, useState } from "react"
import { DeviceInfo } from "../../user/DevicesTable"
import { UserDeviceListService } from "../../../api/users/UserDeviceListService"
import { UserIdByEmailService } from "../../../api/admin/users/UserIdByEmailService"

export function UserDevicesList(): React.JSX.Element {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [retrievedUserDevices, setRetrievedUserDevices] = useState(false)
    const [devicesList, setDevicesList] = useState([])

    const handleSubmit = async (e: FormEvent) => {
        setRetrievedUserDevices(false)
        e.preventDefault()
        setLoading(true)
        const responseId = await UserIdByEmailService(email)
        const response = await UserDeviceListService(responseId.data)
        if (response.status === 200) {
            setDevicesList(response.data)
            setRetrievedUserDevices(true)
        }
        setLoading(false)
    }

    return (
    <Paper elevation={1} style={{ padding: '10px'}}>
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={loading}
                    >
                        See devices
                    </LoadingButton>
                </Grid>
            </Grid>
            <Grid item xs={12} hidden={!retrievedUserDevices}>
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
            </Grid>
        </Box>
    </Paper>
    )
}