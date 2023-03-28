import React, { useEffect, useRef, useState } from 'react'
import styles from './icons.module.css'
import { CloseButton, Modal } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search'
import { getFriends } from '../../firebase/friends/getFriends'

type FriendData = {
    displayName: string;
    uid: string;
};

const GroupIcon = ({ imageUrl }: { imageUrl?: string }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const menuRef = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [getFriendList, setFriendList] = useState<any>([]);

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
            const friends = await getFriends();
            setFriendList(friends);
          } catch (error) {
            console.log(error);
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

    const inviteFriendToGroup = (index: number) => {
        console.log(getFriendList[index])
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])


    return (
        <div className={styles.groupIcon} onContextMenu={handleContextMenu}>
            {showMenu && (
                <div
                    className={styles.customContextMenu}
                    ref={menuRef}
                    style={{ top: menuPosition.y, left: menuPosition.x }}
                >
                    <div
                        className={styles.menuOptionInvite}
                        onClick={inviteFriendsModal}
                    >
                        Invite people
                    </div>
                    <hr className={styles.menuOptionLine} />
                    <div className={styles.menuOptionLeave}>Leave server</div>
                </div>
            )}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header className={styles.addServerModalHeader}>
                    <CloseButton onClick={handleClose} />
                    <h1 className={styles.addServerModalTitle}>
                        Invite Friends
                    </h1>
                    <div className={styles.searchBar}>
                        <input type="text" placeholder="Search for friends" />
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
                        {getFriendList.map((item: FriendData, index: number) => (
                            <div
                                className={styles.serverFriend}
                                key={index}
                                style={{ position: 'relative' }}
                            >
                                <div
                                    className={styles.friendIconAddServer}
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
                                >
                                    Invite
                                </button>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default GroupIcon
