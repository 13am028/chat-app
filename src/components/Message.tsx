import React from 'react';
import './Message.css'
import FriendIcon from "./icons/FriendIcon";


function Message(props: any) {
    return (
        <div>
            {props.messages.map((message: any) => (
                <div className='messageGrid'>
                    <FriendIcon></FriendIcon>
                    <p className='message'>{message.text}</p>
                </div>
            ))}
        </div>
    );
}

export default Message;