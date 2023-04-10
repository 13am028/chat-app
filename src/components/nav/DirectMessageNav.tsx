import React, { useContext, useEffect, useState } from 'react'
import styles from '../icons/icons.module.css'
import {
    doc,
    onSnapshot,
    Timestamp,
    getDoc,
    updateDoc,
} from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
import { db } from '../../firebase/init'
import { ChatContext } from '../context/ChatContext'
import { useNavigate } from 'react-router-dom'
import nstyles from './nav.module.css'
import FriendIcon from '../icons/FriendIcon'
import { getUser } from '../../firebase/utils'

const DirectMessageNav = () => {
    type Chat = {
        chatId: string
        userInfo: {
            displayName: string
            uid: string
            avatar: string
        }
        lastMessage: {
            message: string | null
        }
        date: Timestamp
        unreadCount: number
    }

    const { currentUser } = useContext(AuthContext)
    const [chats, setChats] = useState<Chat[]>([])
    const { dispatch } = useContext(ChatContext)
    let navigate = useNavigate()

    useEffect(() => {
        const getChats = () => {
            if (currentUser?.uid) {
                const unsub = onSnapshot(
                    doc(db, 'userChats', currentUser.uid),
                    async doc => {
                        const chatsData = doc.data()
                        const chatsArray = chatsData
                            ? Object.values(chatsData)
                            : []
                        const sortedChats = chatsArray.sort(
                            (a, b) => b.date - a.date,
                        )
                        // get avatar
                        for (const chat of Object.entries(sortedChats)) {
                            chat[1].userInfo.avatar = (
                                await getUser(chat[1].userInfo.uid)
                            )?.avatar
                        }
                        setChats(sortedChats)
                    },
                )
                return () => unsub()
            }
        }
        currentUser?.uid && getChats()
    }, [currentUser?.uid])

    const handleOnSelect = async (u: any) => {
        dispatch({ type: 'CHANGE_USER', payload: u })
        navigate('/dm')

        let combinedId = u.uid + currentUser?.uid

        // @ts-ignore
        const response = await getDoc(doc(db, 'userChats', currentUser?.uid))

        if (response.get(combinedId) === undefined) {
            combinedId = currentUser?.uid + u.uid
        }

        // @ts-ignore
        await updateDoc(doc(db, 'userChats', currentUser?.uid), {
            [combinedId + '.unreadCount']: 0,
        })
    }

    return (
        <div data-testid="direct-message-nav" className={nstyles.navTopFirst}>
            <div className={nstyles.nav_head}>
                <h4>DIRECT MESSAGES</h4>
            </div>
            {chats &&
                Object.entries(chats)?.map(chat => (
                    <div
                        className={styles.friend}
                        key={chat[0]}
                        onClick={() => handleOnSelect(chat[1].userInfo)}
                        data-testid={`chat-${chat[0]}`}
                    >
                        <FriendIcon
                            imgURL={chat[1].userInfo.avatar}
                        ></FriendIcon>
                        <div className={styles.friendName}>
                            <p className={styles.name}>
                                {chat[1].userInfo.displayName}
                            </p>
                            <p>{chat[1].lastMessage?.message}</p>
                        </div>
                        {chat[1].unreadCount > 0 && (
                            <div className={styles.notificationBadge}>
                                {chat[1].unreadCount}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    )
}

export default DirectMessageNav
