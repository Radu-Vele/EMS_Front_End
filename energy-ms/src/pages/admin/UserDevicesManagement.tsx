import { Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { UserDevicesList } from "../../components/admin/users_devices_manage/UserDevicesList";
import { AddRemoveDevice } from "../../components/admin/users_devices_manage/AddRemoveDevice";

export function UserDevicesManagement(): React.JSX.Element {
    const [seeUserDevices, setSeeUserDevices] = useState(false)
    const [addRemoveDevices, setAddRemoveDevices] = useState(false)

    return (
        <Grid container p ={2}>
            <Grid item xs={3}>
                <Button onClick={() => {
                    setSeeUserDevices(!seeUserDevices)
                    setAddRemoveDevices(false)
                }}>
                    See user devices
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={() => {
                    setSeeUserDevices(false)
                    setAddRemoveDevices(!addRemoveDevices)
                }}>
                    Add/Remove Devices
                </Button>
            </Grid>
            <Grid item xs = {12}>
                <Divider />
            </Grid>
            <Grid item xs={12} hidden={!seeUserDevices}>
                <UserDevicesList />
            </Grid>
            <Grid item xs={12} hidden={!addRemoveDevices}>
                <AddRemoveDevice />
            </Grid>
            <Grid item xs={12} hidden={!(!seeUserDevices && !addRemoveDevices)}>
                <Typography>
                    Take user-devices mapping-related actions by clicking on the buttons above
                </Typography>
            </Grid>
        </Grid>
    )
}