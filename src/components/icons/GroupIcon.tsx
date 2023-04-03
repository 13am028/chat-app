import React, { useEffect, useRef, useState } from 'react'
import styles from './icons.module.css'
import { CloseButton, Modal } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search'
import { getFriends } from '../../firebase/friends/getFriends'
import { addFriendToGroup } from '../../firebase/groups/addFriendToGroup'
import { deleteGroup } from '../../firebase/groups/deleteGroup'
import { leaveGroup } from '../../firebase/groups/leaveGroup'
import { db, auth } from '../../firebase/init'
import { doc, getDoc } from 'firebase/firestore'

const GroupIcon = ({
    groupId,
    imageUrl,
    adminUID,
}: {
    groupId?: string
    imageUrl?: string
    adminUID?: string
}) => {
    const [showMenu, setShowMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const menuRef = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [getFriendList, setFriendList] = useState<any>([])

    const [shouldRender, setShouldRender] = useState(true)

    const handleRemoveComponent = () => {
        setShouldRender(false)
    }

    const handleContextMenu = (event: any) => {
        event.preventDefault()
        setShowMenu(true)
        setMenuPosition({ x: event.clientX, y: event.clientY })
    }

    const handleClick = (event: any) => {
        // @ts-ignore
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false)
        }
    }

    const fetchFriendList = async () => {
        try {
            const friends = await getFriends()
            if (!friends) return

            if (!groupId) return
            const groupRef = await doc(db, 'groups', groupId)
            const groupData = await (await getDoc(groupRef)).data()

            if (!groupData) return

            const groupUsers = Object.keys(groupData.users)
            const friendList = friends.filter(
                (friend: any) => !groupUsers.includes(friend.uid),
            )

            setFriendList(friendList)
        } catch (error) {
            console.log(error)
        }
    }

    const inviteFriendsModal = () => {
        setShowModal(true)
        setShowMenu(false) // close the menu when modal is opened
        fetchFriendList()
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const inviteFriendToGroup = async (index: number) => {
        // ! mean trust me it not null
        const bool = await addFriendToGroup(groupId!, getFriendList[index].uid)
        if (bool) {
            // After success invite friend to group, stop show that friend in invite modal
            const friendList = [...getFriendList]
            friendList.splice(index, 1)
            setFriendList(friendList)
        }
    }

    const deleteTheGroup = async () => {
        await deleteGroup(groupId!)
        handleRemoveComponent()
    }

    const leaveTheGroup = async () => {
        if (!auth.currentUser) return
        await leaveGroup(auth.currentUser?.uid, groupId!)
        handleRemoveComponent()
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return shouldRender ? (
        <div
            className={styles.groupIcon}
            onContextMenu={handleContextMenu}
            data-testid="group-icon"
        >
            {imageUrl !== '' ? (
                <img
                    src={imageUrl}
                    alt="profile avatar"
                    className={styles.groupIcon}
                    style={{ margin: '0px' }}
                />
            ) : (
                <div />
            )}

            {showMenu && (
                <div
                    className={styles.customContextMenu}
                    ref={menuRef}
                    style={{ top: menuPosition.y, left: menuPosition.x }}
                >
                    <div
                        className={styles.menuOptionInvite}
                        onClick={inviteFriendsModal}
                        data-testid="invite-friends-option"
                    >
                        Invite people
                    </div>
                    <hr className={styles.menuOptionLine} />
                    {adminUID === auth.currentUser?.uid ? (
                        <div
                            className={styles.menuOptionLeave}
                            onClick={deleteTheGroup}
                        >
                            Delete server
                        </div>
                    ) : (
                        <div
                            className={styles.menuOptionLeave}
                            onClick={leaveTheGroup}
                        >
                            Leave server
                        </div>
                    )}
                </div>
            )}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header className={styles.addServerModalHeader}>
                    <CloseButton onClick={handleClose} />
                    <h1 className={styles.addServerModalTitle}>
                        Invite Friends
                    </h1>
                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Search for friends"
                            data-testid="search-input"
                        />
                        <SearchIcon />
                    </div>
                </Modal.Header>
                <Modal.Body className={styles.inviteFriendsModalBody}>
                    <div
                        style={{
                            height: '100%',
                            overflowY: 'hidden',
                            overflow: 'auto',
                        }}
                    >
                        {getFriendList.map((item: any, index: number) => (
                            <div
                                className={styles.serverFriend}
                                key={index}
                                style={{ position: 'relative' }}
                            >
                                <div
                                    className={styles.friendIconAddServer}
                                    data-testid={`friend-icon-${index}`}
                                ></div>
                                <div className={styles.serverFriendName}>
                                    <p className={styles.inviteFriendsName}>
                                        {item.displayName}
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    className={styles.inviteButton}
                                    onClick={() => inviteFriendToGroup(index)}
                                    data-testid={`invite-button-${index}`}
                                >
                                    Invite
                                </button>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    ) : null
}

export default GroupIcon
