import React, { useContext, useState } from 'react'
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
import FriendIcon from './FriendIcon'
import { Button, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const FriendStatus = (user: any) => {
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = (e: React.MouseEvent) => {
        e.stopPropagation()
        setAnchorEl(null)
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
            <FriendIcon
                data-testid="friend-icon"
                imgURL={user.avatar}
            ></FriendIcon>
            <div className={styles.friendName} data-testid="friend-name">
                <p className={styles.name} data-testid="friend-display-name">
                    {user.displayName}
                </p>
                <strong>{user.status}</strong>
            </div>
            <div
                className={styles.dropdownContainer}
                data-testid="dropdown-button"
            >
                <Button
                    className={styles.dropdownButton}
                    onClick={handleOpenMenu}
                    style={{ color: 'var(--text)' }}
                >
                    <MoreVertIcon></MoreVertIcon>
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    onClick={stopPropagation}
                >
                    <MenuItem>
                        <RemoveFriendModal
                            theme={user.theme}
                            user={{
                                displayName: user.displayName,
                                uid: user.uid,
                            }}
                            onClick={handleModalClick}
                        />
                    </MenuItem>
                    <MenuItem>
                        <BlockFriendModal
                            theme={user.theme}
                            user={{
                                displayName: user.displayName,
                                uid: user.uid,
                            }}
                            onClick={stopPropagation}
                        />
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default FriendStatus
