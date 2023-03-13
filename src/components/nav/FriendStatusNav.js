import React from 'react';
import styles from './nav.module.css'
import AddFriendModal from "./AddFriendModal";
import AccountDropdownMenu from "../icons/AccountDropdownMenu";

const FriendStatusNav = () => {
    return (
        <div className={styles.navTopSecond}>
            <h4>Friends</h4>
            <h4>Online</h4>
            <h4>All</h4>
            <h4>Pending</h4>
            <h4>Blocked</h4>
            <AddFriendModal />
            <AccountDropdownMenu />
        </div>
    );
};

export default FriendStatusNav;