import React, { useContext, useEffect, useMemo, useState } from 'react'
import './Home.css'
import FriendStatusNav from '../../components/nav/FriendStatusNav'
import DirectMessageNav from '../../components/nav/DirectMessageNav'
import FriendStatus from '../../components/icons/FriendStatus'
import BlockedFriendStatus from '../../components/icons/BlockedFriendStatus'
import { getFriends } from '../../firebase/friends/getFriends'
import { getBlockFriend } from '../../firebase/friends/getBlockFriend'
import { db } from '../../firebase/init'
import { doc, onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../../components/context/AuthContext'
import ReactSearchBox from 'react-search-box'
import SearchIcon from '@mui/icons-material/Search'

const Home = (props: any) => {
    const { theme } = props
    const { currentUser } = useContext(AuthContext)

    /* Disable default context menu */
    const handleContextMenu = (event: any) => {
        event.preventDefault()
    }

    const [friends, setFriends] = useState<any>(null)
    const [filteredFriends, setFilteredFriends] = useState<any>([])
    const [blockedFriends, setBlockedFriends] = useState<any>(null)
    const [selectedTab, setSelectedTab] = useState<string>('friends')
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        if (!currentUser) return
        return onSnapshot(doc(db, 'friends', currentUser.uid), async () => {
            const users = await getFriends()
            setFriends(users)
            const blockedUsers = await getBlockFriend()
            setBlockedFriends(blockedUsers)
        })
    }, [currentUser])

    const friendList = useMemo(() => {
        let list: any = []
        if (friends && selectedTab === 'friends') {
            friends.forEach((user: any) => {
                list.push({
                    displayName: user.displayName,
                    value: (
                        <FriendStatus
                            key={user.uid}
                            displayName={user.displayName}
                            uid={user.uid}
                            avatar={user.avatar}
                            status={user.status}
                            theme={theme}
                        />
                    ),
                })
            })
        } else if (blockedFriends && selectedTab === 'blocked') {
            blockedFriends.forEach((user: any) => {
                list.push({
                    displayName: user.displayName,
                    value: (
                        <BlockedFriendStatus
                            key={user.uid}
                            displayName={user.displayName}
                            uid={user.uid}
                            avatar={user.avatar}
                            theme={theme}
                        />
                    ),
                })
            })
        }
        return list
    }, [friends, blockedFriends, selectedTab])

    useEffect(() => {
        setFilteredFriends(friendList)
        setFilteredFriends(
            friendList.filter((friend: any) => {
                const friendKey = friend.displayName.toLowerCase()
                const search = searchString.toLowerCase()
                return friendKey.includes(search)
            }),
        )
    }, [searchString, friendList])

    const func = (string: any) => {
        setSearchString(string)
    }

    return (
        <div
            onContextMenu={handleContextMenu}
            className="navbar-group"
            data-testid="friend-list"
        >
            <div className="navbar-left">
                <DirectMessageNav data-testid="dm-nav" />
            </div>
            <div className="navbar-right">
                <FriendStatusNav
                    setSelectedTab={setSelectedTab}
                    data-testid="friend-status-nav"
                    theme={theme}
                />
                <div className="bg" data-testid="friend-list-items">
                    <div className="search">
                        <ReactSearchBox
                            placeholder="Search for friends"
                            data={filteredFriends}
                            onSelect={func}
                            onChange={func}
                            inputBackgroundColor="var(--search-bar)"
                        />
                        <SearchIcon fontSize="medium" />
                    </div>
                    {filteredFriends.map((friend: any) => friend.value)}
                </div>
            </div>
        </div>
    )
}

export default Home
