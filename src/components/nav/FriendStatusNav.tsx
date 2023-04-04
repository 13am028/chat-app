import React from 'react'
import styles from './nav.module.css'
import AddFriendModal from '../modal/AddFriendModal'
import AccountDropdownMenu from '../icons/AccountDropdownMenu'

const FriendStatusNav = (props: any) => {
    const { theme } = props
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
                    <AddFriendModal
                        theme={theme}
                    />
                </li>
            </ul>
            <AccountDropdownMenu />
        </div>
    )
}

export default FriendStatusNav
