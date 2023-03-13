import React from 'react';
import Nav from "../../components/nav/Nav";
import DirectMessageNav from "../../components/nav/DirectMessageNav";
import './DMPage.css'
import Conversation from "../../components/Conversation";
import { useLocation } from 'react-router-dom'

const DMPage = () => {
    const location = useLocation();
    const state = location.state
    return (
        <div>
            <Nav/>
            <DirectMessageNav/>
            <div className='DMContainer'>
                <h4>{state.displayName}</h4>
            </div>
            <Conversation></Conversation>
        </div>
    );
};


export default DMPage;