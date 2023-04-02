import React from 'react'
import styles from './icons.module.css'

const FriendIcon = (props: any) => {
    const imgURL = props.imgURL
    const img = () => {
        if (imgURL)
            return (
                <img
                    src={imgURL}
                    className={styles.friendIcon}
                    alt="user avatar"
                />
            )
    }
    return (
        <div className={styles.friendIcon} data-testid="friend-icon">
            {img()}
        </div>
    )
}

export default FriendIcon
