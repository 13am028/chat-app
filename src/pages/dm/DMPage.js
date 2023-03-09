import React from 'react';
import Nav from "../../components/nav/Nav";
import DirectMessageNav from "../../components/nav/DirectMessageNav";
import './DMPage.css'
import Conversation from "../../components/Conversation";
const DMPage = () => {
    return (
        <div>
            <Nav/>
            <DirectMessageNav/>
            <div className='DMContainer'>
                <h4>John Doe</h4>
            </div>
            <Conversation></Conversation>
        </div>
    );
};


export default DMPage;