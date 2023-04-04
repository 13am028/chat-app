import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Nav from '../../components/nav/Nav'
import FriendStatusNav from '../../components/nav/FriendStatusNav'
import DirectMessageNav from '../../components/nav/DirectMessageNav'
import FriendStatus from '../../components/icons/FriendStatus'
import BlockedFriendStatus from '../../components/icons/BlockedFriendStatus'
import { getFriends } from '../../firebase/friends/getFriends'
import { getBlockFriend} from "../../firebase/friends/getBlockFriend";
import { db } from '../../firebase/init'
import { doc, onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../../components/context/AuthContext'

const Home = () => {
    const { currentUser } = useContext(AuthContext)

    /* Disable default context menu */
    const handleContextMenu = (event: any) => {
        event.preventDefault()
    }

    const [friends, setFriends] = useState<any>(null)
    const [blockedFriends, setBlockedFriends] = useState<any>(null)
    const [selectedTab, setSelectedTab] = useState<string>('friends')

    useEffect(() => {
        if (!currentUser) return
        return onSnapshot(doc(db, 'friends', currentUser.uid), async () => {
            const users = await getFriends()
            setFriends(users)
            const blockedUsers = await getBlockFriend()
            setBlockedFriends(blockedUsers)
        })
    }, [currentUser])

    let friendList: any = []
    if (friends && selectedTab === 'friends') {
        friends.forEach((user: any) => {
            friendList.push(
                <FriendStatus
                    key={user.uid}
                    displayName={user.displayName}
                    uid={user.uid}
                    avatar={user.avatar}
                />,
            )
        })
    } else if (blockedFriends && selectedTab === 'blocked') {
        blockedFriends.forEach((user: any) => {
            friendList.push(
                <BlockedFriendStatus
                    key={user.uid}
                    displayName={user.displayName}
                    uid={user.uid}
                    avatar={user.avatar}
                />,
            )
        })
    }

    return (
        <div
            onContextMenu={handleContextMenu}
            className="navbar-group"
            data-testid="friend-list"
        >
            <div className="navbar-left">
                <Nav data-testid="nav" />
                <DirectMessageNav data-testid="dm-nav" />
            </div>
            <div className="navbar-right">
                <FriendStatusNav setSelectedTab={setSelectedTab} data-testid="friend-status-nav" />
                <div className="bg" data-testid="friend-list-items">
                    {friendList}
                </div>
            </div>
        </div>
    )
}

export default Home
