import React from 'react'
import styles from './icons.module.css'
import UnblockFriendModal from '../modal/UnblockFriendModal'
import FriendIcon from './FriendIcon'

const BlockedFriendStatus = (user: any) => {
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div className={styles.friend} data-testid="blocked-friend-status">
            <div data-testid="blocked-friend-icon">
                <FriendIcon imgURL={user.avatar}></FriendIcon>
            </div>
            <div
                className={styles.friendName}
                data-testid="blocked-friend-name"
            >
                <p
                    className={styles.name}
                    data-testid="blocked-friend-display-name"
                >
                    {user.displayName}
                </p>
                <strong>Blocked</strong>
            </div>
            <div style={{ display: 'inline-block' }}>
                <UnblockFriendModal
                    theme={user.theme}
                    user={{ displayName: user.displayName, uid: user.uid }}
                    onClick={handleModalClick}
                />
            </div>
        </div>
    )
}

export default BlockedFriendStatus
