import React from 'react';
import './Message.css'
import FriendIcon from "./icons/FriendIcon";

const Message = () => {
    return (
        <div className='messageGrid'>
            <FriendIcon />
            <p className='message'>Hello !</p>
        </div>
    );
};

export default Message;