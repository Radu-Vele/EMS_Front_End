import { TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import React, { useEffect, useState } from "react"
import { UsersListService } from "../../../api/admin/users/UsersListService"

export function UsersTable(): React.JSX.Element {
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        let unmounted = false
        const fetchData = async () => {
            const response = await UsersListService()
            setUsersList(response.data)
        }
        if (unmounted == false) {
            fetchData()
            unmounted = true
        }
    }, [])

    return (
        <TableContainer>
            <TableHead> 
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email Address</TableCell>
                    <TableCell>Role</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {usersList.map((user) => ( //TODO: fix type errors
                    <TableRow>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.emailAddress}</TableCell>
                        <TableCell>{user.role}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
    )
}