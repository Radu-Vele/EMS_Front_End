import { Box, Button, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CHAT_USERVICE_WEBSOCKET } from "../../constants/WebSocketConstants";
import { ChatBoxProps } from "../../types/ChatBoxProps";
import { UserChatService } from "../../api/users/UserChatService";
import { Client, Message } from '@stomp/stompjs';
import { Frame } from "stompjs";
import { ChatMessage } from "../../types/ChatMessage";
import { SettingsPower } from "@mui/icons-material";

export default function ChatBox(props: ChatBoxProps): React.JSX.Element {
    const stompClientRef = useRef(null);
    const [isChatInit, setIsChatInit] = useState(false)
    const [isChatVisible, setIsChatVisible] = useState(false)
    const [pairedAdmin, setPairedAdmin] = useState('') // for user
    const [pairedUserList, setPairedUserList] = useState<String[]>([]) // for admin
    const [pairedUser, setPairedUser] = useState('') // for user
    const [currentlyWrittenMessage, setCurrentlyWrittenMessage] = useState('')
    const [inboundMessages, setInboundMessages] = useState<ChatMessage[]>([])
    const [outboundMessages, setOutboundMessages] = useState<ChatMessage[]>([])
    const listRef = useRef(null);

    const onMessageReceived = (payload: Message) => {
        let receivedMessage: ChatMessage = JSON.parse(payload.body);
        setInboundMessages(state => [...state, receivedMessage]);
    }

    const onConnect = (frame: Frame) => {
        console.log("Client connected to websocket: ", frame)
        if (stompClientRef.current) {
            let stomp = stompClientRef.current;
            stomp.subscribe(`/queue/${sessionStorage.getItem("authUser")}/messages`, onMessageReceived)
            console.log("Successfully subscribed to its own queue")
        }
        else {
            console.log("Cannot connect to socket")
        }
    }

    const onError = (frame: Frame) => {
        console.log("Error encountered while connecting to ws ", frame);
    }

    const socketOpen = () => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
            console.log("Client was previously connected. Creating a new connection")
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
        stomp.onStompError = onError
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
                console.log("Disconnected from socket")
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
        setIsChatVisible(isChatInit)
        if (isChatInit && props.isUser) {
            socketOpen();
            (async () => {
                    await findAnAdmin();
            })()
        }
        else {
            if (stompClientRef.current && props.isUser) {
                stompClientRef.current.deactivate();
                console.log("Disconnecting from socket")
                setPairedAdmin(null);
                setInboundMessages([]);
                setOutboundMessages([]);
            }
        }
    }, [isChatInit])    

    const sendMessage = (destinationEmail: String) => {
        if (stompClientRef.current && destinationEmail !== '' && currentlyWrittenMessage !== '') {
            let message: ChatMessage = {
                senderEmailAddress: sessionStorage.getItem("authUser"),
                receiverEmailAddress: destinationEmail,
                messageBody: currentlyWrittenMessage,
                timestamp: new Date().getTime()
            }
            let stompClient: Client = stompClientRef.current
            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify(message)
            })
            setOutboundMessages(state => [...state, message])
            setCurrentlyWrittenMessage('')
        }
        else {
            console.log("Cannot send message")
        }
    }

    const formatTimeHhMm = (timestamp) => {
        const date = new Date(timestamp)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const paddedHours = hours < 10 ? `0${hours}` : hours;
        const paddedMin = minutes < 10 ? `0${minutes}` : minutes;
        return `${paddedHours}:${paddedMin}`
    }

    useEffect(() => {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }, [inboundMessages, outboundMessages]);
    
    useEffect(() => {
        if (inboundMessages.length !== 0) {
            if(!props.isUser) {
                if (!pairedUserList.includes(inboundMessages[inboundMessages.length - 1].senderEmailAddress)) {
                    setPairedUserList(state => [...state, inboundMessages[inboundMessages.length - 1].senderEmailAddress])
                }
            }
        }
      }, [inboundMessages]);

    const renderMessages = () => {
        if (!props.isUser && pairedUser === "") {
            return (
            <ListItem>
                <ListItemText primary="Select a user to get to a conversation"/>
            </ListItem>)
        }

        let inboundEnhanced = inboundMessages.map(m => {
            return {
                ...m,
                type: 'in'
            }
        })
        let outboundEnhanced = outboundMessages.map(m => {
            return {
                ...m,
                type: 'out'
            }
        })
        let allMessagesByTimestamp = [...inboundEnhanced, ...outboundEnhanced].slice().sort((el1, el2) => {
            return el1.timestamp - el2.timestamp;
        })

        if (props.isUser) {
            return allMessagesByTimestamp.map(message => {
                return(
                    <ListItemButton
                        key={message.timestamp}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <ListItemText primary={message.messageBody} style={{
                                        textAlign: (message.type === 'in') ? 'left' : 'right'
                                    }}/>
                            </Grid>
                            <Grid item xs={2}>
                                <ListItemText primary=
                                {`[${formatTimeHhMm(message.timestamp)}]`}/>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                )
            })
        }
        else {
            let filteredMessagesByUser = allMessagesByTimestamp.filter(m => {
                return (m.senderEmailAddress === pairedUser || m.receiverEmailAddress === pairedUser)
            })
            return filteredMessagesByUser.map(message => {
                return(
                    <ListItemButton
                        key={message.timestamp}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <ListItemText primary={message.messageBody} style={{textAlign: (message.type === 'in') ? 'left' : 'right'}}/>
                            </Grid>
                            <Grid item xs={2}>
                                <ListItemText primary={`[${formatTimeHhMm(message.timestamp)}]`}/>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                )
            })
        }
    }

    const renderPairedUserOptions = () => {
        return pairedUserList.map(user => {
            return (
               <MenuItem key={user as string} value={user as string}>
                {user}
               </MenuItem>
            )
        })
    }

    return (
        <div>
            <Button onClick={() => setIsChatInit(!isChatInit)} variant="contained"> Toggle Chat </Button>
            <Box
                sx={{
                    width: 600,
                    height: 300,
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    m: 2,
                    boxShadow: 3,
                    visibility: isChatVisible? 'visible' : 'hidden'
                }}
            >
                <Grid container p={2} spacing={2}>
                {props.isUser ? 
                <>
                    <Grid item xs={10}>
                        <Typography>
                            Chat with admin: {pairedAdmin ? pairedAdmin: 'No admin online. You\'re on your own, bro'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ overflow: 'auto', maxHeight: '150px'}} ref={listRef}>
                        <List ref={listRef}>
                            {renderMessages()}
                        </List>
                    </Grid>
                    <Grid item xs={10}>
                            <TextField
                                label="message"
                                value={currentlyWrittenMessage}
                                onChange={(e) => setCurrentlyWrittenMessage(e.target.value)}
                                fullWidth
                            />                    
                        </Grid>
                        <Grid item xs = {2}>
                        <Button variant="contained" onClick={() => sendMessage(pairedAdmin)}>Send</Button>
                    </Grid>
                </>
                : 
                <>
                    <Grid xs = {12} item>
                        <FormControl fullWidth>
                            <InputLabel id="label">Talk to...</InputLabel>
                            <Select
                                labelId="label"
                                value={pairedUser}
                                label="Talk to..."
                                onChange={(e) => {setPairedUser(e.target.value)}}
                            >
                                {renderPairedUserOptions()}
                            </Select>
                        </FormControl>     
                    </Grid>
                    <Grid item xs={12} style={{ overflow: 'auto', maxHeight: '150px'}} ref={listRef}>
                        <List>
                            {renderMessages()}
                        </List>                 
                    </Grid>
                    <Grid item xs={10}>
                            <TextField
                                label="message"
                                value={currentlyWrittenMessage}
                                onChange={(e) => setCurrentlyWrittenMessage(e.target.value)}
                                fullWidth
                            />                    
                        </Grid>
                        <Grid item xs = {2}>
                        <Button variant="contained" onClick={() => sendMessage(pairedUser)}>Send</Button>
                    </Grid>
                </>
                }
                </Grid>
            </Box>
        </div>
    )

}