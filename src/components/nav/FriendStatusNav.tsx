import React from 'react'
import styles from './nav.module.css'
import AddFriendModal from '../modal/AddFriendModal'
import AccountDropdownMenu from '../icons/AccountDropdownMenu'

interface FriendStatusNavProps {
    setSelectedTab: (tab: string) => void
    'data-testid'?: string
}

const FriendStatusNav: React.FC<FriendStatusNavProps> = ({
    setSelectedTab,
    'data-testid': testId,
}) => {
    const handleTabClick = (tab: string) => {
        setSelectedTab(tab)
    }

    return (
        <div className={styles.navTopSecond} data-testid={testId}>
            <ul className={styles.navTop_list}>
                <li onClick={() => handleTabClick('friends')}>
                    <h4 data-testid="friends-heading">Friends</h4>
                </li>
                <li onClick={() => handleTabClick('blocked')}>
                    <h4 data-testid="blocked-heading">Blocked</h4>
                </li>
                <li>
                    <AddFriendModal />
                </li>
            </ul>
            <AccountDropdownMenu />
        </div>
    )
}

export default FriendStatusNav
