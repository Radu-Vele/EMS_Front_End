import { LoadingButton } from "@mui/lab";
import { Paper, Box, Grid, TextField } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { SignUpService } from "../api/guest/SignUpService";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({isAdmin=false, goToLoginOnSubmit=true}:{isAdmin?:boolean, goToLoginOnSubmit?:boolean}): React.JSX.Element {
    const [loading, setLoading] = useState(false)
    const [newUserInfo, setNewUserInfo] = useState({
        emailAddress: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordRepeated: "",
        isAdmin: isAdmin
    })

    useEffect(() => {
        setNewUserInfo({...newUserInfo, isAdmin: isAdmin})
    }, [isAdmin])
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent) => {
        console.log(isAdmin)
        event.preventDefault()

        setLoading(true);
        const response = await SignUpService(newUserInfo)
        if(response.status !== 201) {
            setLoading(false)
        }
        else {
            setLoading(false)
            if(goToLoginOnSubmit) {
                navigate("/login")
            }
        }
        setLoading(false)
    }

    return (
        <Paper elevation={1} style={{ padding: '10px'}}>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={11}>
                        <TextField
                            label="Email"
                            type="email" 
                            value={newUserInfo.emailAddress}
                            onChange={(e) => setNewUserInfo({...newUserInfo, emailAddress: e.target.value})}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label="First Name"
                            type="name"
                            value={newUserInfo.firstName}
                            onChange={(e) => setNewUserInfo({...newUserInfo, firstName: e.target.value})}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label="Last Name"
                            type="name"
                            value={newUserInfo.lastName}
                            onChange={(e) => setNewUserInfo({...newUserInfo, lastName: e.target.value})}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label="Password"
                            type="password"
                            value={newUserInfo.password}
                            onChange={(e) => setNewUserInfo({...newUserInfo, password: e.target.value})}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label="Repeat Password"
                            type="password"
                            value={newUserInfo.passwordRepeated}
                            onChange={(e) => setNewUserInfo({...newUserInfo, passwordRepeated: e.target.value})}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <LoadingButton
                            variant="contained"
                            type="submit"
                            loading={loading}
                        >
                            Sign up
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Paper>)
}