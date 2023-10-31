import { LoadingButton } from "@mui/lab"
import { Box, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { FormEvent, useState } from "react"
import { UserDeviceListService } from "../../../api/users/UserDeviceListService"
import { UserIdByEmailService } from "../../../api/admin/users/UserIdByEmailService"
import { AddRemoveDeviceUserService } from "../../../api/admin/user-devices/AddRemoveDeviceUserService"

export function AddRemoveDevice(): React.JSX.Element {
    const [email, setEmail] = useState("")
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [loadingRemove, setLoadingRemove] = useState(false)
    const [deviceId, setDeviceId] = useState("")

    const handleAddRemove = async (remove: boolean) => {
        setLoadingAdd(!remove)
        setLoadingRemove(remove)
        const responseId = await UserIdByEmailService(email)
        const id = responseId.data
        const response = await AddRemoveDeviceUserService(id, deviceId, remove)
        setLoadingAdd(false)
        setLoadingRemove(false)
    }



    return (
    <Paper elevation={1} style={{ padding: '10px'}}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        label="User Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="Device Id"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <LoadingButton
                        variant="contained"
                        loading={loadingAdd}
                        onClick={() => handleAddRemove(false)}
                    >
                        Add device to user
                    </LoadingButton>
                </Grid>
                <Grid item xs={11}>
                    <LoadingButton
                        variant="contained"
                        loading={loadingRemove}
                        onClick={() => handleAddRemove(true)}
                    >
                        Remove device from user
                    </LoadingButton>
                </Grid>
            </Grid>
    </Paper>
    )
}