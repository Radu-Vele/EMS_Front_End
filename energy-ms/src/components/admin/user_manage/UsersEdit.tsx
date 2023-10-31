import { LoadingButton } from "@mui/lab";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { UserEditService } from "../../../api/admin/users/UsersEditService";
import { UserDetailsService } from "../../../api/users/UserDetailsService";
import { UserDetailsByEmailService } from "../../../api/admin/users/UserDetailsByEmailService";

export function UsersEdit(): React.JSX.Element {

    const [loading, setLoading] = useState(false)
    const [userEditInfo, setUserEditInfo] = useState({
        emailAddress: "",
        firstName: "",
        lastName: "",
        role: ""
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const response = await UserDetailsByEmailService(userEditInfo.emailAddress)
        const currentUser = response.data
        const requestUser = {
            emailAddress: userEditInfo.emailAddress,
            firstName: userEditInfo.firstName,
            lastName: userEditInfo.lastName,
            role: userEditInfo.role
        }
        
        if (userEditInfo.firstName.length === 0) {
            requestUser.firstName = currentUser.firstName
        }
        if (userEditInfo.lastName.length === 0) {
            requestUser.lastName = currentUser.lastName
        }
        if (userEditInfo.role.length === 0) {
            requestUser.role = currentUser.role
        }

        await UserEditService(requestUser)
        setLoading(false)
        setUserEditInfo({
            emailAddress: "",
            firstName: "",
            lastName: "",
            role: ""
        })
    }

    return (
    <Paper elevation={1} style={{ padding: '10px'}}>
        <Typography>
            Unfortunately at the moment you can not edit the email address. Changes coming 🔜
 !       </Typography>
        <br></br>
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        label="Email"
                        type="email" 
                        value={userEditInfo.emailAddress}
                        onChange={(e) => setUserEditInfo({...userEditInfo, emailAddress: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="First Name"
                        type="name"
                        value={userEditInfo.firstName}
                        onChange={(e) => setUserEditInfo({...userEditInfo, firstName: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="Last Name"
                        type="name"
                        value={userEditInfo.lastName}
                        onChange={(e) => setUserEditInfo({...userEditInfo, lastName: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        label="Role (ADMIN/USER)"
                        type="name"
                        value={userEditInfo.role}
                        onChange={(e) => setUserEditInfo({...userEditInfo, role: e.target.value})}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={11}>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={loading}
                    >
                        Edit the user with the given email address
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    </Paper>)
}