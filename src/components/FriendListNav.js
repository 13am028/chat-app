import React from 'react';
import styles from './nav.module.css'
import FriendIcon from "./FriendIcon";

const FriendListNav = () => {
    return (
        <div>
            <div className={styles.navTopFirst}>
                <h4>Friends</h4>
                <div className={styles.shadowLine}></div>
                <h5>DIRECT MESSAGES</h5>
                <FriendIcon />
            </div>
        </div>
    );
};

export default FriendListNav;