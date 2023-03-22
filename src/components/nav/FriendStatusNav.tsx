import React from 'react';
import styles from './nav.module.css'
import AddFriendModal from "./AddFriendModal";
import AccountDropdownMenu from "../icons/AccountDropdownMenu";
import RemoveFriendModal from "./RemoveFriend";

const FriendStatusNav = () => {
    return (
        <div className={styles.navTopSecond}>
            <ul className={styles.navTop_list}>
                <li><h4><a>Friends</a></h4></li>
                <li><h4><a>Online</a></h4></li>
                <li><h4><a>All</a></h4></li>
                <li><h4><a>Pending</a></h4></li>
                <li><h4><a>Blocked</a></h4></li>
                <li><AddFriendModal /></li>
                <li><RemoveFriendModal /></li>
            </ul>
            <AccountDropdownMenu />
        </div>
    );
};

export default FriendStatusNav;