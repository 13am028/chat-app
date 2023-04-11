import React, { useEffect, useState } from 'react'
import styles from './icons.module.css'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/init'

const FriendIcon = (props: any) => {
    const uid = props.uid
    const [imgURL, setImgUrl] = useState(props.imgURL)
    useEffect(() => {
        if (uid) {
            return onSnapshot(doc(db, 'users', uid), doc => {
                doc.exists() && setImgUrl(doc.data().avatar)
            })
        }
    }, [uid])
    const img = () => {
        if (imgURL)
            return (
                <img
                    src={imgURL}
                    className={styles.friendIcon}
                    alt="user avatar"
                />
            )
        else {
            return (
                <img
                    src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                    className={styles.friendIcon}
                    alt="user avatar"
                />
            )
        }
    }
    return (
        <div className={styles.friendIcon} data-testid="friend-icon">
            {img()}
        </div>
    )
}

export default FriendIcon
