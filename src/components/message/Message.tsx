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
                    <FriendIcon uid={message.senderId} />
                    <div
                        className={
                            message.senderId === currentUser.uid
                                ? 'messageContentOwner'
                                : 'messageContent'
                        }
                    >
                        <p
                            className={
                                message.senderId === currentUser.uid
                                    ? 'senderDisplayNameOwner'
                                    : 'senderDisplayName'
                            }
                        >
                            {message.senderDisplayName}
                        </p>
                        <p
                            className={
                                message.senderId === currentUser.uid
                                    ? 'messageOwner'
                                    : 'message'
                            }
                        >
                            {message.text}
                        </p>
                    </div>
                </div>
            ))}
            <div ref={ref} data-testid="bottom-div" />
        </div>
    )
}

export default Message
