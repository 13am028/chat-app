import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Nav from '../../components/nav/Nav'
import FriendStatusNav from '../../components/nav/FriendStatusNav'
import DirectMessageNav from '../../components/nav/DirectMessageNav'
import FriendStatus from '../../components/icons/FriendStatus'
import { getFriends } from '../../firebase/friends/getFriends'
import { db } from '../../firebase/init'
import { doc, onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../../components/context/AuthContext'

const Home = (props: any) => {
    const { theme } = props
    const { currentUser } = useContext(AuthContext)

    /* Disable default context menu */
    const handleContextMenu = (event: any) => {
        event.preventDefault()
    }

    const [friends, setFriends] = useState<any>(null)

    useEffect(() => {
        if (!currentUser) return
        return onSnapshot(doc(db, 'friends', currentUser.uid), async () => {
            const users = await getFriends()
            setFriends(users)
        })
    }, [currentUser])

    let friendList: any = []
    if (friends) {
        friends.forEach((user: any) => {
            friendList.push(
                <FriendStatus
                    theme={theme}
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
                <Nav
                    theme={theme}
                    data-testid="nav"
                />
                <DirectMessageNav data-testid="dm-nav" />
            </div>
            <div className="navbar-right">
                <FriendStatusNav
                    theme={theme}
                    data-testid="friend-status-nav"
                />
                <div className="bg" data-testid="friend-list-items">
                    {friendList}
                </div>
            </div>
        </div>
    )
}

export default Home
