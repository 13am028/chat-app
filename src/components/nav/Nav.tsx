import React, { useContext, useEffect, useState } from 'react'
import GroupIcon from '../icons/GroupIcon'
import AddServerIcon from '../addServer/AddServerIcon'
import styles from './nav.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getGroups } from '../../firebase/groups/getGroups'
import { listenToGroupMessages } from '../../firebase/utils'
import { AuthContext } from '../context/AuthContext'
import {
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore'
import { db } from '../../firebase/init'

const Nav = (props: any) => {
    const { theme } = props
    let navigate = useNavigate()
    let location = useLocation()

    const { currentUser } = useContext(AuthContext)
    const [newMessage, setNewMessage] = useState<{
        [groupId: string]: boolean
    }>({})
    const [groups, setGroups] = useState<any>([])
    const [show, setShow] = useState<boolean>(true)

    const toHome = () => {
        let path = '/home'

        navigate(path)
    }
    const toGroup = (groupId: string, groupName: string, groupMembers: any) => {
        let path = '/server-chat'

        navigate(path, { state: { groupId, groupName, groupMembers } })

        if (currentUser && currentUser.uid) {
            updateLastReadTimestamp(groupId, currentUser.uid)
        }
    }
    const updateLastReadTimestamp = async (groupId: string, userId: string) => {
        const lastReadDocRef = doc(
            collection(db, 'groups', groupId, 'lastRead'),
            userId,
        )
        await setDoc(
            lastReadDocRef,
            { timestamp: serverTimestamp() },
            { merge: true },
        )
    }
    const listenToNewMessages = (
        groupId: string,
        userId: string | undefined,
    ) => {
        const getLastReadTimestamp = async () => {
            const lastReadDocRef = doc(
                collection(db, 'groups', groupId, 'lastRead'),
                userId,
            )
            const snapshot = await getDoc(lastReadDocRef)
            return snapshot.exists() ? snapshot.data().timestamp : null
        }

        listenToGroupMessages(groupId, userId, async (messages: any) => {
            const newMessage = messages[messages.length - 1]
            const lastReadTimestamp = await getLastReadTimestamp()

            if (
                newMessage &&
                newMessage.senderId !== userId &&
                (!lastReadTimestamp || newMessage.timestamp > lastReadTimestamp)
            ) {
                console.log(`New message in group ${groupId}: ${newMessage}`)
                setNewMessage(prevState => ({ ...prevState, [groupId]: true }))
            }
        })
    }

    const clearNewMessage = (groupId: string) => {
        setNewMessage(prevState => ({ ...prevState, [groupId]: false }))
    }

    useEffect(() => {
        ;(async () => {
            const userGroups = await getGroups()
            setGroups(userGroups)
            if (userGroups) {
                const userId = currentUser?.uid
                // @ts-ignore
                userGroups.forEach(group => {
                    if (location.pathname !== `/server-chat/${group.id}`) {
                        listenToNewMessages(group.id, userId)
                    }
                })
            }
        })()
        if (['/login', '/signup', '/setting'].includes(location.pathname))
            setShow(false)
        else setShow(true)
    }, [location, currentUser?.uid])

    useEffect(() => {
        const pathParts = location.pathname.split('/')
        if (pathParts[1] === 'server-chat') {
            const groupId = pathParts[2]
            if (groupId) {
                clearNewMessage(groupId)
            }
        }
    }, [location])

    const handleNewGroupRender = async () => {
        const userGroups = await getGroups()
        setGroups(userGroups)
    }

    let groupList: any = []
    if (groups) {
        groups.forEach((group: any) => {
            groupList.push(
                <div
                    onClick={() => {
                        toGroup(group.id, group.groupName, group.groupMembers)
                        clearNewMessage(group.id)
                    }}
                >
                    <GroupIcon
                        theme={theme}
                        groupId={group.id}
                        imageUrl={group.groupPic}
                        adminUID={group.adminUID}
                        hasNewMessage={newMessage[group.id]}
                        onClearNewMessage={() => clearNewMessage(group.id)}
                    />
                </div>,
            )
        })
    }

    return show ? (
        <div className={styles.navLeft} data-testid="nav">
            <div
                className={styles.nav_head}
                onClick={toHome}
                data-testid="nav-head"
            >
                <img
                    src="/favicon.png"
                    alt="logo"
                    style={{
                        width: '8vh',
                        marginLeft: '3px',
                        cursor: 'pointer',
                    }}
                />
            </div>
            <div className={styles.nav_content} data-testid="nav-content">
                {groupList}
                <AddServerIcon onGroupCreate={handleNewGroupRender} />
            </div>
        </div>
    ) : null
}

export default Nav
