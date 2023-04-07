import React from 'react'
import styles from './icons.module.css'
import FriendIcon from './FriendIcon'

const FriendInvite = (props: any) => {
    const item = props.item
    return (
        <div>
            <div
                className={styles.serverFriend}
                key={item.uid}
                style={{ position: 'relative' }}
            >
                <FriendIcon imgURL={item.avatar}></FriendIcon>
                <div className={styles.serverFriendName}>
                    <p className={styles.inviteFriendsName}>
                        {item.displayName}
                    </p>
                </div>
                <button
                    type="submit"
                    className={styles.inviteButton}
                    onClick={() => props.onInvite(item.uid)}
                    data-testid={`invite-button-${item.uid}`}
                >
                    Invite
                </button>
            </div>
        </div>
    )
}

export default FriendInvite
