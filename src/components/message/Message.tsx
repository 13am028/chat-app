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

    function formatDate(timestamp: any) {
        const date = new Date(timestamp)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${day}/${month}/${year} ${hours}:${minutes}`
    }

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
                    <div>
                        <p
                            className={
                                message.senderId === currentUser.uid
                                    ? 'senderDisplayNameOwner'
                                    : 'senderDisplayName'
                            }
                        >
                            {message.senderId === currentUser.uid
                                ? 'Me'
                                : message.senderDisplayName}
                        </p>
                        <FriendIcon uid={message.senderId} />
                    </div>
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
                                    ? 'messageOwner'
                                    : 'message'
                            }
                        >
                            {message.text}
                        </p>
                        <p
                            className={
                                message.senderId === currentUser.uid
                                    ? 'timestampOwner'
                                    : 'timestamp'
                            }
                        >
                            {formatDate(message.timestamp?.toMillis())}
                        </p>
                    </div>
                </div>
            ))}
            <div ref={ref} data-testid="bottom-div" />
        </div>
    )
}

export default Message
