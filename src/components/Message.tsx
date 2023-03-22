import React, {useContext} from 'react';
import './Message.css'
import FriendIcon from "./icons/FriendIcon";
import {AuthContext} from "./context/AuthContext";


function Message(props: any) {
    const { currentUser } = useContext(AuthContext);
    return (
        <div>
            {props.messages.map((message: any) => (
                <div className={`messageGrid ${message.senderId === currentUser?.uid && "messageGridOwner"}`}>
                    <FriendIcon></FriendIcon>
                    <p className='message'>{message.text}</p>
                </div>
            ))}
        </div>
    );
}

export default Message;