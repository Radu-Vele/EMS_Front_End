import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CHAT_USERVICE_WEBSOCKET } from "../../constants/WebSocketConstants";
import Stomp from 'stompjs';
import { ChatBoxProps } from "../../types/ChatBoxProps";
import { UserChatService } from "../../api/users/UserChatService";

export default function ChatBox(props: ChatBoxProps): React.JSX.Element {
    const stompClientRef = useRef(null);
    const [receivedMessages, setReceivedMessages] = useState([])
    const [sentMessages, setSentMessages] = useState([])
    const [isChatInit, setIsChatInit] = useState(false)
    const [pairedAdmin, setPairedAdmin] = useState(null) // for user
    const [pairedUserList, setPairedUserList] = useState(null) // for admin

    const onMessageReceive = (message) => {
        console.log("Received message");
    }

    const onConnect = (stomp) => {
        // reference the stomp client connection
        stompClientRef.current = stomp;

        // subscribe to its own queue
    }

    const socketOpen = () => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect();
        }

        let stomp = Stomp.client(`${CHAT_USERVICE_WEBSOCKET}?name=${sessionStorage.getItem("authUser")}&role=${sessionStorage.getItem("role")}`);
        stomp.connect({
            Authorization: `${localStorage.getItem("token")}`
        }, onConnect(stomp));
    }

    useEffect(() => {
        if (!props.isUser) {
            socketOpen();
        }

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        }
    }, [])

    const findAnAdmin = async () => {
        let response = await UserChatService();
        if (response.status === 200) {
            console.log("got admin: ", response.data)
            setPairedAdmin(response.data)
        }
        else {
            console.log("no admin available")
        }
    }

    useEffect(() => {
        if (isChatInit && props.isUser) {
        socketOpen();
        (async () => {
                await findAnAdmin();
        })()
        }
        else {
            if (stompClientRef.current && props.isUser) {
                stompClientRef.current.disconnect();
                setPairedAdmin(null);
            }
        }
    }, [isChatInit])    

    return (
        <Box>
            {props.isUser ? 
            <Button onClick={() => setIsChatInit(!isChatInit)} variant="contained"> Toggle Chat </Button> 
            : <></>}
        </Box>
    )

}