import React, { useContext, useEffect, useState } from 'react'
import Message from '../message/Message'
import MessageTextField from '../message/MessageTextField'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/init'

function Conversation() {
    const [messages, setMessages] = useState<any[]>([])
    const handleSendMessage = (message: string) => {
        setMessages([...messages, message])
    }

    const { data } = useContext(ChatContext)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
            doc.exists() && setMessages(doc.data().messages)
        })
        return unSub
    }, [data.chatId])

    console.log(messages)

    return (
        <div className="bg">
            <Message messages={messages} />
            {/*@ts-ignore*/}
            <MessageTextField onSendMessage={handleSendMessage} />
        </div>
    )
}

export default Conversation
