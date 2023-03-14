import React from 'react';
import Nav from "../../components/nav/Nav";
import DirectMessageNav from "../../components/nav/DirectMessageNav";
import styles from "../../components/nav/nav.module.css";
import Conversation from "../../components/Conversation";
import { useLocation } from 'react-router-dom'

const DMPage = () => {
    const location = useLocation();
    const state = location.state
    return (
        <div className='navbar-group'>
            <div className='navbar-left'>
                <Nav />
                <DirectMessageNav />
            </div>
            <div className='navbar-right'>
                <div className={styles.navTopSecond}>
                    <h4>{state.displayName}</h4>
                </div>
                <Conversation></Conversation>
            </div>
        </div>
    );
};


export default DMPage;