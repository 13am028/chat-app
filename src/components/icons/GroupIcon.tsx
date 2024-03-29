import { useEffect, useRef, useState } from 'react'
import styles from './icons.module.css'
import { CloseButton, Modal } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search'
import { getFriends } from '../../firebase/friends/getFriends'
import { addFriendToGroup } from '../../firebase/groups/addFriendToGroup'
import { deleteGroup } from '../../firebase/groups/deleteGroup'
import { leaveGroup } from '../../firebase/groups/leaveGroup'
import { db, auth } from '../../firebase/init'
import { doc, getDoc } from 'firebase/firestore'
import FriendInvite from './FriendInvite'
import ReactSearchBox from 'react-search-box'

const GroupIcon = ({
    theme,
    groupId,
    imageUrl,
    adminUID,
    hasNewMessage,
    onClearNewMessage,
}: {
    theme: any
    groupId?: string
    imageUrl?: string
    adminUID?: string
    hasNewMessage?: boolean
    onClearNewMessage?: () => void
}) => {
    const [showMenu, setShowMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const menuRef = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [getFriendList, setFriendList] = useState<any>([])
    const [filteredList, setFilteredList] = useState<any>([])
    const [shouldRender, setShouldRender] = useState(true)
    const [searchString, setSearchString] = useState('')

    //console.log(`Group ${groupId}: hasNewMessage = ${hasNewMessage}`)

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

    const inviteFriendsModal = async () => {
        setShowModal(true)
        setShowMenu(false) // close the menu when modal is opened
        await fetchFriendList()
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const inviteFriendToGroup = async (uid: string) => {
        // ! mean trust me it not null
        const bool = await addFriendToGroup(groupId!, uid)
        if (bool) {
            // After success invite friend to group, stop show that friend in invite modal
            const friendList = getFriendList.filter(
                (item: any) => item.uid !== uid,
            )
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
    })

    useEffect(() => {
        setFilteredList(getFriendList)
        let tempList: any = []
        getFriendList.forEach((friend: any) => {
            if (friend.displayName.includes(searchString)) tempList.push(friend)
        })
        setFilteredList(tempList)
    }, [searchString, getFriendList])

    const func = (search: any) => {
        setSearchString(search)
    }

    return shouldRender ? (
        <div
            className={styles.groupIcon}
            onContextMenu={handleContextMenu}
            data-testid="group-icon"
            style={{ position: 'relative' }}
        >
            {imageUrl !== '' ? (
                <img
                    src={imageUrl}
                    alt="profile avatar"
                    className={styles.groupIcon}
                    style={{ margin: '0px' }}
                    onClick={onClearNewMessage}
                />
            ) : (
                <>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4389/4389432.png"
                        alt="profile avatar"
                        className={styles.groupIcon}
                        style={{ margin: '0px' }}
                    />
                    <div />
                </>
            )}
            {hasNewMessage && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: 'red',
                    }}
                ></div>
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
                    <hr
                        className={`styles.menuOptionLine ${
                            theme === 'dark' ? 'dark' : ''
                        }`}
                    />
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
                    <div
                        className={styles.searchBar}
                        data-testid="search-input"
                    >
                        <ReactSearchBox
                            placeholder="Search for friends"
                            data={filteredList}
                            onSelect={func}
                            onChange={func}
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
                        {filteredList.map((item: any) => (
                            <FriendInvite
                                key={item.uid}
                                item={item}
                                onInvite={inviteFriendToGroup}
                            />
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    ) : null
}

export default GroupIcon
