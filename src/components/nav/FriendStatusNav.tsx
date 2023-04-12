import React from 'react'
import styles from './nav.module.css'
import AddFriendModal from '../modal/AddFriendModal'
import AccountDropdownMenu from '../icons/AccountDropdownMenu'

interface FriendStatusNavProps {
    setSelectedTab: (tab: string) => void
    'data-testid'?: string
    theme?: string
}

const FriendStatusNav: React.FC<FriendStatusNavProps> = ({
    setSelectedTab,
    'data-testid': testId,
    theme,
}) => {
    const handleTabClick = (tab: string) => {
        setSelectedTab(tab)
    }

    return (
        <div className={styles.navTopSecond} data-testid={testId}>
            <ul className={styles.navTop_list}>
                <li
                    onClick={() => handleTabClick('friends')}
                    data-testid="friends-heading"
                >
                    <h4>Friends</h4>
                </li>
                <li
                    onClick={() => handleTabClick('blocked')}
                    data-testid="blocked-heading"
                >
                    <h4>Blocked</h4>
                </li>
                <li>
                    <AddFriendModal theme={theme} />
                </li>
            </ul>
            <AccountDropdownMenu />
        </div>
    )
}

export default FriendStatusNav
