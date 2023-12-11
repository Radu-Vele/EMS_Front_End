import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CHAT_USERVICE_WEBSOCKET } from "../../constants/WebSocketConstants";
import { ChatBoxProps } from "../../types/ChatBoxProps";
import { UserChatService } from "../../api/users/UserChatService";
import { Client, Message } from '@stomp/stompjs';
import { Frame } from "stompjs";

export default function ChatBox(props: ChatBoxProps): React.JSX.Element {
    const stompClientRef = useRef(null);
    const [receivedMessages, setReceivedMessages] = useState([])
    const [sentMessages, setSentMessages] = useState([])
    const [isChatInit, setIsChatInit] = useState(false)
    const [pairedAdmin, setPairedAdmin] = useState(null) // for user
    const [pairedUserList, setPairedUserList] = useState(null) // for admin
    const [currentlyWrittenMessage, setCurrentlyWrittenMessage] = useState('')

    const onMessageReceived = (payload) => {
        console.log("Received message", payload);
    }

    const onConnect = (frame: Frame) => {
        console.log("Client connected to websocket: ", frame)
        // // reference the stomp client connection
        if (stompClientRef.current) {
            let stomp = stompClientRef.current;
            stomp.subscribe(`/queue/${sessionStorage.getItem("authUser")}/messages`, onMessageReceived)
            console.log("Successfully subscribed to its own queue")
        }
        else {
            console.log("Messed up, bro")
        }

        // // subscribe to its own queue
        // //stomp.subscribe(`/queue/${sessionStorage.getItem("authUser")}/messages`, onMessageReceived);
        // console.log("successfully subscribed to its own queue")
    }

    const onError = () => {
        console.log("Error encountered while connecting to ws");
    }

    const socketOpen = () => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect();
        }

        let stomp = new Client({  
            brokerURL: `${CHAT_USERVICE_WEBSOCKET}?name=${sessionStorage.getItem("authUser")}&role=${sessionStorage.getItem("role")}`,
            connectHeaders: {
                login: 'dummy',
                passcode: 'dummy',
            },
            reconnectDelay: 5000,
        }); 

        stomp.onConnect = onConnect
        stomp.activate();        
        stompClientRef.current = stomp;
    }

    useEffect(() => {
        if (!props.isUser) {
            socketOpen();
        }

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
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
                stompClientRef.current.deactivate();
                setPairedAdmin(null);
            }
        }
    }, [isChatInit])    

    const sendMessage = (destinationEmail) => {
        if (stompClientRef.current && destinationEmail !== '') {
            let message = {
                senderEmailAddress: sessionStorage.getItem("authUser"),
                receiverEmailAddress: destinationEmail,
                messageBody: currentlyWrittenMessage,
                timestamp: new Date()
            }
            //stompClientRef.current.send("/app/chat");
            setCurrentlyWrittenMessage("");
        }
    }

    return (
        <Box>
            {props.isUser ? 
            <>
                <Button onClick={() => setIsChatInit(!isChatInit)} variant="contained"> Toggle Chat </Button> 
                <TextField
                    label="message"
                    value={currentlyWrittenMessage}
                    onChange={(e) => setCurrentlyWrittenMessage(e.target.value)}
                    fullWidth
                />                    
                <Button variant="contained" onClick={() => sendMessage(pairedAdmin)}>Send message</Button>
            </>
            : <></>}
        </Box>
    )

}