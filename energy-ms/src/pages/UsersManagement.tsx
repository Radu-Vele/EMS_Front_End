import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { UserRegister } from "../components/UserRegister";
import { UsersTable } from "../components/UsersTable";
import { UsersEdit } from "../components/UsersEdit";
import { UsersDelete } from "../components/UsersDelete";

export function UsersManagement(): React.JSX.Element {
    const [listAll, setListAll] = useState(false)
    const [editUser, setEditUser] = useState(false)
    const [registerUser, setRegisterUser] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)

    return (
        <Grid container p ={2}>
            <Grid item xs={3}>
                <Button onClick={() => {
                    setListAll(!setListAll)
                    setEditUser(false)
                    setRegisterUser(false)
                    setDeleteUser(false)
                }}>
                    List all users
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={() => {
                    setListAll(false)
                    setEditUser(!editUser)
                    setRegisterUser(false)
                    setDeleteUser(false)
                }}>
                    Edit user details
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={() => {
                    setListAll(false)
                    setEditUser(false)
                    setRegisterUser(!registerUser)
                    setDeleteUser(false)
                }}>
                    Register user
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={() => {
                    setListAll(false)
                    setEditUser(false)
                    setRegisterUser(false)
                    setDeleteUser(!deleteUser)
                }}>
                    Delete user
                </Button>
            </Grid>
            <Grid item hidden={!listAll}>
                <UsersTable />
            </Grid>
            <Grid item hidden={!editUser}>
                <UsersEdit />
            </Grid>
            <Grid item hidden={!registerUser}>
                <UserRegister />
            </Grid>
            <Grid item hidden={!deleteUser}>
                <UsersDelete />
            </Grid>
        </Grid>
    )
}