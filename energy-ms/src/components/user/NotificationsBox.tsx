import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { MEASUREMENTS_USERVICE_WEBSOCKET } from "../../constants/WebSocketConstants";

export function NotificationBox(): React.JSX.Element {
    const [notificationArray, setNotificationArray] = useState([])
    const [visible, setVisible] = useState(false)
    const { lastMessage } = useWebSocket(
        `${MEASUREMENTS_USERVICE_WEBSOCKET}?userId=${sessionStorage.getItem("userId")}`, {
            share: true,            
            shouldReconnect: (closeEvent) => true,
        }
    )

    useEffect(() => {
        if (lastMessage != null) {
            setNotificationArray(prevArray => [...prevArray, lastMessage.data]);
        }
    }, [lastMessage])

    return (
        <div>
            <Button variant="contained" onClick={() => setVisible(!visible)}>
                Notifications ({notificationArray.length})
            </Button>
            <Grid item xs={12} hidden={!visible}>
                <List>
                    { notificationArray.map((body, index) => {
                        console.log(body)
                        return (
                        <ListItem key={index}>
                            <ListItemButton>
                                <ListItemText primary={body} />
                            </ListItemButton>
                        </ListItem>
                        )
                    })}
                </List>
            </Grid>
        </div>
    )
}