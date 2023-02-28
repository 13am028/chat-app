import React, {useState} from 'react';
import Message from "./Message";
import MessageTextField from "./MessageTextField";


function Conversation() {
    const [messages, setMessages] = useState([]);
    const handleSendMessage = (message) => {
        setMessages([...messages, message]);
    };

    return (
        <div className="bg">
            <Message messages={messages}/>
            <MessageTextField onSendMessage={handleSendMessage}/>
        </div>
    );
}


export default Conversation
