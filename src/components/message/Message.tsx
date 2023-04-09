import React, { useEffect, useRef } from 'react'
import './Message.css'
import FriendIcon from '../icons/FriendIcon'

// @ts-ignore
function Message({
    messages,
    currentUser,
}: {
    messages: any
    currentUser: any
}) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    return (
        <div data-testid="message-container">
            {messages.map((message: any) => (
                <div
                    className={`messageGrid ${
                        message.senderId === currentUser?.uid &&
                        'messageGridOwner'
                    }`}
                    key={message.id}
                >
                    <FriendIcon uid={message.senderId}></FriendIcon>
                    <p className="message">{message.text}</p>
                </div>
            ))}
            <div ref={ref} data-testid="bottom-div" />
        </div>
    )
}

export default Message
