import React, { useContext, useEffect, useRef } from 'react'
import './Message.css'
import FriendIcon from '../icons/FriendIcon'
import { AuthContext } from '../context/AuthContext'

function Message(props: any) {
    const { currentUser } = useContext(AuthContext)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [props.messages])
    return (
        <div data-testid="message-container">
            {props.messages.map((message: any) => (
                <div
                    className={`messageGrid ${
                        message.senderId === currentUser?.uid &&
                        'messageGridOwner'
                    }`}
                    key={message.id}
                >
                    <FriendIcon></FriendIcon>
                    <p className="message">{message.text}</p>
                </div>
            ))}
            <div ref={ref} data-testid="bottom-div" />
        </div>
    )
}

export default Message
