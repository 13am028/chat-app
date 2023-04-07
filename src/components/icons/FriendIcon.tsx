import React, { useEffect, useState } from 'react'
import styles from './icons.module.css'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/init'

const FriendIcon = (props: any) => {
    const uid = props.uid
    const [imgURL, setImgUrl] = useState(props.imgURL)
    useEffect(() => {
        if (uid) {
            const unSub = onSnapshot(doc(db, 'users', uid), doc => {
                doc.exists() && setImgUrl(doc.data().avatar)
            })
            return unSub
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
    }
    return (
        <div className={styles.friendIcon} data-testid="friend-icon">
            {img()}
        </div>
    )
}

export default FriendIcon
