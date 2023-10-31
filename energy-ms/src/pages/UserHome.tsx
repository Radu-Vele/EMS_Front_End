import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { UserDetailsBox } from "../components/UserDetailsBox";
import { DevicesTable } from "../components/DevicesTable";

export default function UserHome(): React.JSX.Element {
    const [showDevices, setShowDevices] = useState(false)
    const [userId, setUserId] = useState('')
    
    const toggleShowDevices = (): void => {
        setShowDevices(!showDevices)
    }

    return (
    <Grid container p={2}>
        <Grid item xs={12}>
            <UserDetailsBox />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" onClick={toggleShowDevices}>
                View my devices
            </Button>
        </Grid>
        <Grid item xs={12} hidden={!showDevices}>
            <DevicesTable/>
        </Grid>
    </Grid>
    )
}