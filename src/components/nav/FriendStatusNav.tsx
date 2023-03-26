import React from 'react'
import styles from './nav.module.css'
import AddFriendModal from './AddFriendModal'
import AccountDropdownMenu from '../icons/AccountDropdownMenu'
import RemoveFriend from './RemoveFriend'

const FriendStatusNav = () => {
    return (
        <div className={styles.navTopSecond}>
            <ul className={styles.navTop_list}>
                <li>
                    <h4 data-testid="friends-heading">Friends</h4>
                </li>
                <li>
                    <h4 data-testid="pending-heading">Pending</h4>
                </li>
                <li>
                    <h4 data-testid="blocked-heading">Blocked</h4>
                </li>
                <li>
                    <AddFriendModal />
                </li>
                <li>
                    <RemoveFriend />
                </li>
            </ul>
            <AccountDropdownMenu />
        </div>
    )
}

export default FriendStatusNav
