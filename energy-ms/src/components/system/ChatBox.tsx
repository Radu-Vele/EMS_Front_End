import { Box, Button, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CHAT_USERVICE_WEBSOCKET } from "../../constants/WebSocketConstants";
import { ChatBoxProps } from "../../types/ChatBoxProps";
import { UserChatService } from "../../api/users/UserChatService";
import { Client, Message } from '@stomp/stompjs';
import { Frame, client } from "stompjs";
import { ChatMessage } from "../../types/ChatMessage";
import { ChatMessageInMemory } from "../../types/ChatMessageInMemory";
import { MessageDirection } from "../../types/MessageDirection";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PairedUser } from "../../types/PairedUser";


export default function ChatBox(props: ChatBoxProps): React.JSX.Element {
    const stompClientRef = useRef(null);
    const [isChatInit, setIsChatInit] = useState(false)
    const [isChatVisible, setIsChatVisible] = useState(false)
    const [pairedAdmin, setPairedAdmin] = useState('') // for user
    const [pairedUserList, setPairedUserList] = useState<PairedUser[]>([]) // for admin
    const [pairedUser, setPairedUser] = useState<PairedUser>(null) // for user
    const [currentlyWrittenMessage, setCurrentlyWrittenMessage] = useState('')
    const [inboundMessages, setInboundMessages] = useState<ChatMessageInMemory[]>([])
    const [outboundMessages, setOutboundMessages] = useState<ChatMessageInMemory[]>([])
    const [seenSubscriptionList, setSeenSubscriptionList] = useState([])
    const [receivedSeenNotificationTimestamp, setReceivedSeenNotificationTimestamp] = useState(-1)
    const listRef = useRef(null);
    const [startTypingEmail, setStartTypingEmail] = useState('')
    const [stopTypingEmail, setStopTypingEmail] = useState('')

    const onMessageReceived = (payload: Message) => {
        let receivedMessage: ChatMessage = JSON.parse(payload.body);
        setInboundMessages(state => [...state, {
            ...receivedMessage,
            readByMe: false,
            readByThem: false,
            direction: MessageDirection.in
        }]);
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

    const onSeenNotificationReceive = (payload: Message) => {
        let messageTimestamp = JSON.parse(payload.body).messageTimestamp
        setReceivedSeenNotificationTimestamp(messageTimestamp)
    }

    useEffect(() => {
        if (receivedSeenNotificationTimestamp !== -1) {
            let messageIndex = outboundMessages.findIndex(elem => elem.timestamp == receivedSeenNotificationTimestamp)

            if (messageIndex !== -1) {
                let updateOutboundList = [...outboundMessages]
                updateOutboundList[messageIndex].readByThem = true;
                setOutboundMessages(updateOutboundList)

                let indexOfSubscription = seenSubscriptionList.findIndex(elem => elem.timestamp == receivedSeenNotificationTimestamp)
                if (indexOfSubscription != -1) {
                    seenSubscriptionList[indexOfSubscription].subscriptionObject.unsubscribe()
                    console.log("unsubscribed from seen for message ", receivedSeenNotificationTimestamp)
                    let seenSubscriptionListNew = [...seenSubscriptionList]
                    seenSubscriptionList.splice(indexOfSubscription, 1); //remove element
                    setSeenSubscriptionList(seenSubscriptionListNew)
                }
            }
        }
    }, [receivedSeenNotificationTimestamp])

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
            setOutboundMessages(state => [...state, {
                ...message,
                readByMe: false,
                readByThem: false,
                direction: MessageDirection.out
            }])
            setCurrentlyWrittenMessage('')
            let subscription = stompClient.subscribe(`/seen/${message.timestamp}`, onSeenNotificationReceive)

            let subscriptionListItem = {
                subscriptionObject: subscription,
                timestamp: message.timestamp
            }
            setSeenSubscriptionList(state => [...state, subscriptionListItem])
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
    
    const onStartTyping = (payload: Message) => {
        let pairedUserEmail = JSON.parse(payload.body).senderEmailAddress;
        console.log("received start typing notification")
        setStartTypingEmail(pairedUserEmail);
        setStopTypingEmail('')
    }

    const onStopTyping = (payload: Message) => {
        let pairedUserEmail = JSON.parse(payload.body).senderEmailAddress;
        console.log("received stop typing notification", pairedUserEmail)
        setStartTypingEmail('')
        setStopTypingEmail(pairedUserEmail);
    }

    useEffect(() => {
        if (startTypingEmail !== '') {
            let newPairedUserList = pairedUserList.map((element) => {
                if (element.email === startTypingEmail) {
                    return {...element, isTyping: true}
                }
                else {
                    return element
                }
            })
            setPairedUserList(newPairedUserList)
        }
    }, [startTypingEmail])

    useEffect(() => {
        if (stopTypingEmail !== '') {
            let newPairedUserList = pairedUserList.map((element) => {
                if (element.email === stopTypingEmail) {
                    return {...element, isTyping: false}
                }
                else {
                    return element
                }
            })
            setPairedUserList(newPairedUserList)
        }
    }, [stopTypingEmail])

    useEffect(() => {
        if (inboundMessages.length !== 0) {
            if(!props.isUser) {
                let senderEmailAddress = inboundMessages[inboundMessages.length - 1].senderEmailAddress
                if (!pairedUserList.find(el => el.email === senderEmailAddress)) {
                    let newPairedUser: PairedUser = {
                        email: senderEmailAddress,
                        isTyping: false
                    }
                    setPairedUserList(state => [...state, newPairedUser])
                    let stompClient: Client = stompClientRef.current;
                    stompClient.subscribe(`/startTyping/${senderEmailAddress}`, onStartTyping);
                    stompClient.subscribe(`/stopTyping/${senderEmailAddress}`, onStopTyping);
                }
            }
        }
      }, [inboundMessages]);

    useEffect(() => {
        let stompClient: Client = stompClientRef.current
        if (stompClient) {
            if (stompClient.connected) {
                let myEmailAddress = sessionStorage.getItem("authUser")
                let message = {
                    senderEmailAddress: myEmailAddress
                }
                let destination = ''
                if (currentlyWrittenMessage === '') {
                    destination = `/app/stopTyping`
                }
                else {
                    destination = `/app/startTyping`
                }
                stompClient.publish({
                    destination: destination, 
                    body: JSON.stringify(message)
                })
                console.log("published to", stompClient, destination)
            }
        }
    }, [currentlyWrittenMessage]);

    const markAsSeen = (event, messageTimestamp: number) => {
        let messageIndexInList = inboundMessages.findIndex(message => message.timestamp == messageTimestamp);
        if (messageIndexInList === -1) {
            // Message to mark as read not from inbound
            return;
        }
        let updateMessagesList = [...inboundMessages];
        if(updateMessagesList[messageIndexInList].readByMe === true) { 
            // won't mark again as read
            return;
        }
        updateMessagesList[messageIndexInList] = {...updateMessagesList[messageIndexInList], readByMe: true}; //mark message as read
        setInboundMessages(updateMessagesList); // triggers useEffect?
        // send to seen topic of message
        
        let seenNotification = {
            messageTimestamp: messageTimestamp // assume the timestamp is unique
        }

        let stompClient: Client = stompClientRef.current
            stompClient.publish({
                destination: '/app/seen',
                body: JSON.stringify(seenNotification)
        })

        console.log("Sent seen notification", JSON.stringify(seenNotification));
    }

    const renderMessages = () => {
        if (!props.isUser && !pairedUser) {
            return (
            <ListItem
                key={0}
            >
                <ListItemText primary="Select a user to get to a conversation"/>
            </ListItem>)
        }

        let allMessagesByTimestamp = [...inboundMessages, ...outboundMessages].slice().sort((el1, el2) => {
            return el1.timestamp - el2.timestamp;
        })
        
        let finalMessagesArray = allMessagesByTimestamp

        if (!props.isUser && pairedUser) {
            let filteredMessagesByUser = allMessagesByTimestamp.filter(m => {
                return (m.senderEmailAddress === pairedUser.email || m.receiverEmailAddress === pairedUser.email)
            })
            finalMessagesArray = filteredMessagesByUser
            
        }

        return finalMessagesArray.map((message: ChatMessageInMemory) => {
            return(
                <>
                    <ListItemButton
                        key={message.timestamp}
                        onClick={(event) => markAsSeen(event, message.timestamp)}
                        style = {{
                            background: (message.direction == MessageDirection.in && message.readByMe == false) ? 'lightGray' : 'none'
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <ListItemText primary={message.messageBody} style={{
                                        textAlign: (message.direction == MessageDirection.in) ? 'left' : 'right',
                                    }}/>
                                
                            </Grid>
                            <Grid item xs={2}>
                                {message.direction == MessageDirection.out && 
                                        <ListItemIcon 
                                        style={{
                                            textAlign: 'right',
                                            color: message.readByThem ? 'green' : 'none'
                                        }}>
                                            <VisibilityIcon />
                                        </ListItemIcon>
                                }
                                <ListItemText primary={`[${formatTimeHhMm(message.timestamp)}]`}/>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                    <Divider />
                </>
            )
        })
        
    }

    const renderPairedUserOptions = () => {
        return pairedUserList.map(user => {
            console.log(user)
            return (
               <MenuItem key={user.email as string} value={user.email as string}>
                {user.email}
               </MenuItem>
            )
        })
    }

    return (
        <div>
            <Button onClick={() => setIsChatInit(!isChatInit)} variant="contained"> Toggle Chat </Button>
            <Box
                sx={{
                    width: 800,
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
                        <List ref={listRef} dense>
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
                    <Grid xs = {9} item>
                        <FormControl fullWidth>
                            <InputLabel id="label">Talk to...</InputLabel>
                            <Select
                                labelId="label"
                                value={pairedUser? pairedUser.email : ''}
                                label="Talk to..."
                                onChange={(e) => {setPairedUser(pairedUserList.find(el => el.email === e.target.value))}}
                            >
                                {renderPairedUserOptions()}
                            </Select>
                        </FormControl>     
                    </Grid>
                    <Grid item xs={3}>
                        {pairedUser && <Typography>
                            {pairedUser.isTyping && <>Typing...</>}
                        </Typography>
                        }
                    </Grid>
                    <Grid item xs={12} style={{ overflow: 'auto', maxHeight: '150px'}} ref={listRef}>
                        <List ref={listRef} dense>
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
                        <Button variant="contained" onClick={() => sendMessage(pairedUser.email)}>Send</Button>
                    </Grid>
                </>
                }
                </Grid>
            </Box>
        </div>
    )

}