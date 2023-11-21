import { createContext, useContext, useState } from "react";
import useWebSocket from "react-use-websocket";

const WebSocketContext = createContext(undefined)

export const WebSocketProvider = ({children}) => {
    const [socketUrl, setSocketUrl] = useState('')
    const webSocket = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log("Opening the socket", socketUrl)
        },
        onClose: () => {
            console.log("Closing the socket", socketUrl)
        },
    }, true)

    const contextValue = {
        socketUrl,
        setSocketUrl,
        webSocket
    }

    return (
        <WebSocketContext.Provider value = {contextValue}>
            {children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocketContext = () => {
    return useContext(WebSocketContext)
}