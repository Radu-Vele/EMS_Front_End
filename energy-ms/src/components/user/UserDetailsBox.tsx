import { Box, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PersonIcon  from "@mui/icons-material/Person" 
import React, { useEffect, useState } from "react";
import { UserDetailsService } from "../../api/users/UserDetailsService";
import { EmailRounded } from "@mui/icons-material";

export function UserDetailsBox(): React.JSX.Element {
    const [userDetails, setUserDetails] = useState({
        firstName : "",
        lastName: "",
        emailAddress: "",
        role: ""
    })

    useEffect(() => {
        let unmounted = false

        const fetchData = async () => {
            const response = await UserDetailsService()
            setUserDetails(response.data)
        }
        
        if (!unmounted) {
            fetchData()
            unmounted = true
        }

    }, [])

    return (
        <Box>
            <Typography variant="h4">
                Account info
            </Typography>   
            <Divider />
            <ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={userDetails.firstName + " " + userDetails.lastName}/>
                </ListItem>
            </ListItem>      
            <ListItem>
                <ListItem>
                    <ListItemIcon>
                        <EmailRounded />
                    </ListItemIcon>
                    <ListItemText primary={userDetails.emailAddress}/>
                </ListItem>
            </ListItem>      
        </Box>
    )
}