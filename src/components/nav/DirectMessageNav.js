import React from 'react';
import styles from './nav.module.css'
import FriendStatus from "../icons/FriendStatus";

const DirectMessageNav = () => {
    const items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    return (
        <div className={styles.navTopFirst}>
            <h4>DIRECT MESSAGES</h4>
            <div className={styles.shadowLine}></div>
            {items.map((item, index) => {
                return <FriendStatus key={index}></FriendStatus>
            })}
        </div>
    );
};

export default DirectMessageNav;