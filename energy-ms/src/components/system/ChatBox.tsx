import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CHAT_USERVICE_WEBSOCKET } from "../../constants/WebSocketConstants";
import Stomp from 'stompjs';

export default function ChatBox(): React.JSX.Element {
    const stompClientRef = useRef(null);

    const socketOpen = () => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect();
        }

        let stomp = Stomp.client(`${CHAT_USERVICE_WEBSOCKET}?name=${sessionStorage.getItem("authUser")}`);
        stomp.connect({}, () => {
            stompClientRef.current = stomp;
        });
    }

    useEffect(() => {
        socketOpen();

        return () => {
            console.log("unmounting", stompClientRef.current)
            if (stompClientRef.current) {
                console.log("with client connected previously");
                stompClientRef.current.disconnect();
            }
        }
    }, [])

    return (
        <Box>
        </Box>
    )

}