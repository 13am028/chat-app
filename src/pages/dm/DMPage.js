import React from 'react';
import Nav from "../../components/nav/Nav";
import DirectMessageNav from "../../components/nav/DirectMessageNav";
import styles from "../../components/nav/nav.module.css";
import Conversation from "../../components/Conversation";

const DMPage = () => {
    return (
        <div className='navbar-group'>
            <div className='navbar-left'>
                <Nav />
                <DirectMessageNav />
            </div>
            <div className='navbar-right'>
                <div className={styles.navTopSecond}>
                    <h4>John Doe</h4>
                </div>
                <Conversation></Conversation>
            </div>
        </div>
    );
};


export default DMPage;