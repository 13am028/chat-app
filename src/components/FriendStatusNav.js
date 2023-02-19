import React from 'react';
import styles from './nav.module.css'

const FriendStatusNav = () => {
    return (
        <div>
            <div className={styles.navTopSecond}>
                <h4>Friends</h4>
                <h4>Online</h4>
                <h4>All</h4>
                <h4>Pending</h4>
                <h4>Blocked</h4>
                <button>Add Friend</button>
            <div className={styles.shadowLine}></div>
            </div>
        </div>
    );
};

export default FriendStatusNav;