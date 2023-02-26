import React from 'react';
import Nav from "../../components/nav/Nav";
import DirectMessageNav from "../../components/nav/DirectMessageNav";
import './DMPage.css'
import Message from "../../components/Message";
import MessageTextField from "../../components/MessageTextField";

const DMPage = () => {
    return (
        <div>
            <Nav/>
            <DirectMessageNav/>
            <div className='DMContainer'>
                <h4>John Doe</h4>
            </div>
            <div className='bg'>
                <Message/>
            </div>
            <div className='bg'>
                <MessageTextField/>
            </div>
        </div>
    );
};

export default DMPage;