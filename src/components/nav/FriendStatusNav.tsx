import React from 'react'
// @ts-ignore
import styles from './nav.module.css'
import AddFriendModal from './AddFriendModal'
import AccountDropdownMenu from '../icons/AccountDropdownMenu'
import RemoveFriendModal from './RemoveFriend'

const FriendStatusNav = () => {
    return (
        <div className={styles.navTopSecond}>
            <ul className={styles.navTop_list}>
                <li>
                    <h4>Friends</h4>
                </li>
                <li>
                    <h4>Pending</h4>
                </li>
                <li>
                    <h4>Blocked</h4>
                </li>
                <li>
                    <AddFriendModal />
                </li>
                <li>
                    <RemoveFriendModal />
                </li>
            </ul>
            <AccountDropdownMenu />
        </div>
    )
}

export default FriendStatusNav
