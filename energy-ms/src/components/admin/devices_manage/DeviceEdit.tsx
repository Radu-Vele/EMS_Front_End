import { LoadingButton } from "@mui/lab";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { UserEditService } from "../../../api/admin/users/UsersEditService";
import { UserDetailsService } from "../../../api/users/UserDetailsService";
import { UserDetailsByEmailService } from "../../../api/admin/users/UserDetailsByEmailService";
import { DeviceDetailsByIdService } from "../../../api/admin/devices/DeviceDetailsByIdService";
import { DeviceEditService } from "../../../api/admin/devices/DeviceEditService";

export function DeviceEdit(): React.JSX.Element {

    const [loading, setLoading] = useState(false)
    const [deviceEditInfo, setDeviceEditInfo] = useState({
        id: "",
        description: "",
        address: "",
        maxHourlyEnergyConsumption: ""
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const response = await DeviceDetailsByIdService(deviceEditInfo.id)
        const currentDevice = response.data
        const requestDevice = {
            id: deviceEditInfo.id,
            description: deviceEditInfo.description,
            address: deviceEditInfo.address,
            maxHourlyEnergyConsumption: deviceEditInfo.maxHourlyEnergyConsumption
        }
        
        if (deviceEditInfo.description.length === 0) {
            requestDevice.description = currentDevice.description
        }
        if (deviceEditInfo.address.length === 0) {
            requestDevice.address = currentDevice.address
        }
        if (deviceEditInfo.maxHourlyEnergyConsumption.length === 0) {
            requestDevice.maxHourlyEnergyConsumption = currentDevice.maxHourlyEnergyConsumption
        }

        await DeviceEditService(requestDevice)
        setLoading(false)
        setDeviceEditInfo({
            id: "",
            description: "",
            address: "",
            maxHourlyEnergyConsumption: ""
        })
    }

    return (
    <Paper elevation={1} style={{ padding: '10px'}}>
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        label="Id"
                        value={deviceEditInfo.id}
                        onChange={(e) => setDeviceEditInfo({...deviceEditInfo, id: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="Description"
                        value={deviceEditInfo.description}
                        onChange={(e) => setDeviceEditInfo({...deviceEditInfo, description: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="Address"
                        value={deviceEditInfo.address}
                        onChange={(e) => setDeviceEditInfo({...deviceEditInfo, address: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="Max hourly energy consumption (kW/hour)"
                        value={deviceEditInfo.maxHourlyEnergyConsumption}
                        onChange={(e) => setDeviceEditInfo({...deviceEditInfo, maxHourlyEnergyConsumption: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={loading}
                    >
                        Edit the device with the given id
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    </Paper>)
}