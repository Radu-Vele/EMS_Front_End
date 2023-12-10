import { Box, Typography } from "@mui/material";
import React from "react";
import ChatBox from "../../components/system/ChatBox";
import { CHAT_USERVICE_WEBSOCKET } from "../../constants/WebSocketConstants";

export default function AdminHome(): React.JSX.Element {
    return (        
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="60vh"
        >
            <Typography variant="h5">
                Welcome, admin!
            </Typography>
            <ChatBox isUser={false}/>
        </Box>
    )
}