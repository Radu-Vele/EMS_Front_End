import { Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { AllDevicesTable } from "../../components/admin/devices_manage/AllDevicesTable";
import { DeviceDelete } from "../../components/admin/devices_manage/DeviceDelete";
import { DeviceCreate } from "../../components/admin/devices_manage/DeviceCreate";
import { DeviceEdit } from "../../components/admin/devices_manage/DeviceEdit";

export function DevicesManagement(): React.JSX.Element {
    const [listAll, setListAll] = useState(false)
    const [editDevice, setEditDevice] = useState(false)
    const [createDevice, setCreateDevice] = useState(false)
    const [deleteDevice, setDeleteDevice] = useState(false)

    return (
        <Grid container p ={2}>
            <Grid item xs={3}>
                <Button onClick={() => { // TODO turn into toggle buttons
                    setListAll(!listAll)
                    setEditDevice(false)
                    setCreateDevice(false)
                    setDeleteDevice(false)
                }}>
                    List all devices
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={() => {
                    setListAll(false)
                    setEditDevice(!editDevice)
                    setCreateDevice(false)
                    setDeleteDevice(false)
                }}>
                    Edit device
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={() => {
                    setListAll(false)
                    setEditDevice(false)
                    setCreateDevice(!createDevice)
                    setDeleteDevice(false)
                }}>
                    Create device
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={() => {
                    setListAll(false)
                    setEditDevice(false)
                    setCreateDevice(false)
                    setDeleteDevice(!deleteDevice)
                }}>
                    Delete device
                </Button>
            <Divider />
            </Grid>
            <Grid xs = {12}>
                <Divider />
            </Grid>
            <Grid item hidden={!listAll}>
                <AllDevicesTable />
            </Grid>
            <Grid item hidden={!editDevice}>
                <DeviceEdit />
            </Grid>
            <Grid item hidden={!createDevice}>
                <DeviceCreate />
            </Grid>
            <Grid item hidden={!deleteDevice}>
                <DeviceDelete />
            </Grid>
            <Grid item hidden={!(!deleteDevice && !createDevice && !listAll && !editDevice)}>
                <Typography>
                    Take devices-related actions by clicking on the buttons above
                </Typography>
            </Grid>
        </Grid>
    )
}