import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { UserDetailsBox } from "../../components/user/UserDetailsBox";
import { DevicesTable } from "../../components/user/DevicesTable";
import { NotificationBox } from "../../components/user/NotificationsBox";
import { ConsumptionChart } from "../../components/user/ConsumptionChart";

export default function UserHome(): React.JSX.Element {
    const [showDevices, setShowDevices] = useState(false)
    const [showConsumptionChart, setShowConsumptionChart] = useState(false)

    const toggleShowDevices = (): void => {
        setShowDevices(!showDevices)
    }

    return (
    <Grid container p={2} spacing={2}>
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
        <Grid item xs={12} >
            <NotificationBox/>
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" onClick={() => setShowConsumptionChart(!showConsumptionChart)}>
                View Daily Consumption
            </Button>
            <ConsumptionChart visible={showConsumptionChart}/>
        </Grid>
    </Grid>
    )
}