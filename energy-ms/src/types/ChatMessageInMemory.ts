import { ChatMessage } from "./ChatMessage"
import { MessageDirection } from "./MessageDirection"

export type ChatMessageInMemory = ChatMessage & {
    readByMe: boolean,
    readByThem: boolean,
    direction: MessageDirection
}