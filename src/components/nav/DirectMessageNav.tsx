import React from 'react';
import styles from './nav.module.css'
import FriendStatus from "../icons/FriendStatus";

const DirectMessageNav = () => {
    const items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    return (
        <div className={styles.navTopFirst}>
            <div className={styles.nav_head}>
                <h4>DIRECT MESSAGES</h4>
            </div>
            <div className={styles.nav_content}>
                {items.map((item, index) => {
                    return <FriendStatus key={index}></FriendStatus>
                })}
            </div>
        </div>
    );
};

export default DirectMessageNav;