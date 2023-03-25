import React, { useContext, useEffect, useRef } from 'react'
import './Message.css'
import FriendIcon from './icons/FriendIcon'
import { AuthContext } from './context/AuthContext'

function Message(props: any) {
    const { currentUser } = useContext(AuthContext)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [props.messages])
    return (
        <div>
            {props.messages.map((message: any) => (
                <div
                    className={`messageGrid ${
                        message.senderId === currentUser?.uid &&
                        'messageGridOwner'
                    }`}
                >
                    <FriendIcon></FriendIcon>
                    <p className="message">{message.text}</p>
                </div>
            ))}
            <div ref={ref} />
        </div>
    )
}

export default Message
