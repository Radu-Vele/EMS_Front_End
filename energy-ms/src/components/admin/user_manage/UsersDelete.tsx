import { LoadingButton } from "@mui/lab";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { DeleteUserService } from "../../../api/admin/users/DeleteUserService";

export function UsersDelete(): React.JSX.Element {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await DeleteUserService(email)
        setLoading(false)
    }

    return (
    <Paper elevation={1} style={{ padding: '10px'}}>
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        label="Email Address"
                        type="email" 
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
                        Delete user permanently
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    </Paper>
    )
}