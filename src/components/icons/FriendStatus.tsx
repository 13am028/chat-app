import React, { useContext } from 'react'
import styles from './icons.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore'
import { db } from '../../firebase/init'
import { ChatContext } from '../context/ChatContext'

import RemoveFriendModal from '../modal/RemoveFriendModal'
import BlockFriendModal from '../modal/BlockFriendModal'

const FriendStatus = (user: any) => {
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }
    let navigate = useNavigate()
    const routeChange = () => {
        let path = '/dm'
        navigate(path, {
            state: { displayName: user.displayName, uid: user.uid },
        })
    }

    const handleOnSelect = async () => {
        const combinedId =
            (currentUser?.uid ?? '') > user.uid
                ? currentUser?.uid + user.uid
                : user.uid + (currentUser?.uid ?? '')
        try {
            const response = await getDoc(doc(db, 'chats', combinedId))
            if (!response.exists()) {
                await setDoc(doc(db, 'chats', combinedId), { messages: [] })
                await updateDoc(doc(db, 'userChats', currentUser?.uid ?? ''), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                })
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser?.uid,
                        displayName: currentUser?.displayName,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                })
            }
            dispatch({
                type: 'CHANGE_USER',
                payload: { uid: user.uid, displayName: user.displayName },
            })
            routeChange()
        } catch (err) {}
    }

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div
            className={styles.friend}
            onClick={handleOnSelect}
            data-testid="friend-status"
        >
            <div className={styles.friendIcon} data-testid="friend-icon"></div>
            <div className={styles.friendName} data-testid="friend-name">
                <p className={styles.name} data-testid="friend-display-name">
                    {user.displayName}
                </p>
                <strong>status</strong>
            </div>
            <div style={{ display: 'inline-block' }}>
                <RemoveFriendModal
                    user={{ displayName: user.displayName, uid: user.uid }}
                    onClick={handleModalClick}
                />
                <BlockFriendModal
                    user={{ displayName: user.displayName, uid: user.uid }}
                    onClick={stopPropagation}
                />
            </div>
        </div>
    )
}

export default FriendStatus
