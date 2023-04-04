import React, { useEffect, useState } from 'react'
import FriendStatusNav from "../nav/FriendStatusNav";
import FriendStatus from './FriendStatus'
import BlockedFriendStatus from './BlockedFriendStatus'
import { getFriends} from "../../firebase/friends/getFriends";
import { getBlockFriend} from "../../firebase/friends/getBlockFriend";

const FriendsContainer = () => {
    const [selectedTab, setSelectedTab] = useState('friends')
    const [friends, setFriends] = useState<any[]>([])
    const [blockedFriends, setBlockedFriends] = useState<any[]>([])

    useEffect(() => {
        const fetchFriends = async () => {
            const friendsData = await getFriends()
            setFriends(friendsData || [])
        }

        const fetchBlockedFriends = async () => {
            const blockedFriendsData = await getBlockFriend()
            setBlockedFriends(blockedFriendsData || [])
        }

        fetchFriends()
        fetchBlockedFriends()
    }, [])

    return (
        <>
            <FriendStatusNav setSelectedTab={setSelectedTab} />
            {selectedTab === 'friends' &&
                friends.map((friend) => (
                    <FriendStatus key={friend.uid} {...friend} />
                ))}
            {selectedTab === 'blocked' &&
                blockedFriends.map((blockedFriend) => (
                    <BlockedFriendStatus key={blockedFriend.uid} {...blockedFriend} />
                ))}
        </>
    )
}

export default FriendsContainer