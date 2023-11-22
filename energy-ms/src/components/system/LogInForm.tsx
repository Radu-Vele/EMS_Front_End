import { Grid, Paper, TextField, Box, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { FormEvent, useEffect, useState } from "react"
import { AuthenticateUser } from "../../api/auth/AuthenticateUser"
import { AuthenticationUtils } from "../../utils/auth/AuthenticationUtils"
import { useNavigate } from "react-router-dom"
import { UserIdService } from "../../api/users/UserIdService"
import useWebSocket from "react-use-websocket"

export default function LogInForm(): React.JSX.Element {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        const response = await AuthenticateUser(email, password)
        if (response.status !== 200) {
            setLoading(false)
        }
        else {
            const jwtToken = response.data.token
            AuthenticationUtils.setToken('Bearer ' + jwtToken)
            const tokenPayload = AuthenticationUtils.extractJwtPayload(jwtToken)
            const userIdResponse = await UserIdService()
            if (userIdResponse.status !== 200) {
                AuthenticationUtils.setLoggedInUserData(tokenPayload.sub, tokenPayload.role, '')                
            }
            else {
                AuthenticationUtils.setLoggedInUserData(tokenPayload.sub, tokenPayload.role, userIdResponse.data)
            }
            
            navigate(
                tokenPayload.role.toUpperCase() === "ADMIN" ? "/adminHome" : "/userHome"
            )
        }
        setLoading(false)
    }

    return (
        <Paper elevation={1} style={{ padding: '10px'}}>
            <Box component="form" onSubmit={handleLogin}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={11}>
                        <Typography variant="h5">
                            Log in to the Energy Management System
                        </Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label="Email"
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <LoadingButton
                            variant="contained"
                            type="submit"
                            loading={loading}
                        >
                            Log In
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}