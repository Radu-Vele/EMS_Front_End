import { LoadingButton } from "@mui/lab";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { DeleteUserService } from "../../../api/admin/users/DeleteUserService";
import { DeleteDeviceService } from "../../../api/admin/devices/DeleteDeviceService";

export function DeviceDelete(): React.JSX.Element {

    const [id, setId] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await DeleteDeviceService(id)
        setLoading(false)
    }

    return (
    <Paper elevation={1} style={{ padding: '10px'}}>
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        label="Device Id"
                        type="" 
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={loading}
                    >
                        Delete device permanently
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    </Paper>
    )
}