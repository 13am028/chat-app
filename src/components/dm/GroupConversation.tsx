import React, { useState } from 'react'
import GroupMessageTextField from '../message/GroupMessageTextField'

function GroupConversation() {
    const [messages, setMessages] = useState<any[]>([])

    const handleSendMessage = (message: string) => {
        setMessages([...messages, message])
    }

    return (
        <div className="bg">
            {/*@ts-ignore*/}
            <GroupMessageTextField onSendMessage={handleSendMessage} />
        </div>
    )
}

export default GroupConversation
