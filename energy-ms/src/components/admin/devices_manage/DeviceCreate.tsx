import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { DeviceCreateService } from "../../../api/admin/devices/DeviceCreateService";

export function DeviceCreate(): React.JSX.Element {

    const [loading, setLoading] = useState(false)
    const [newDeviceInfo, setNewDeviceInfo] = useState({
        description: "",
        address: "",
        maxHourlyEnergyConsumption: "",
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await DeviceCreateService(newDeviceInfo)
        setLoading(false)
        setNewDeviceInfo(
            {
                description: "",
                address: "",
                maxHourlyEnergyConsumption: ""
            }
        )
    }

    return (
    <Paper elevation={1} style={{ padding: '10px'}}>
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        label="Description"
                        value={newDeviceInfo.description}
                        onChange={(e) => setNewDeviceInfo({...newDeviceInfo, description: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="Address"
                        value={newDeviceInfo.address}
                        onChange={(e) => setNewDeviceInfo({...newDeviceInfo, address: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="Maximum hourly energy consumption"
                        value={newDeviceInfo.maxHourlyEnergyConsumption}
                        onChange={(e) => setNewDeviceInfo({...newDeviceInfo, maxHourlyEnergyConsumption: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={loading}
                    >
                        Create device
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    </Paper>)
}