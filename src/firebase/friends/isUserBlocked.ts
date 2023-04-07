import { doc, getDoc } from 'firebase/firestore'
import { db } from '../init'

const isUserBlocked = async (
    user1Uid: string,
    user2Uid: string,
): Promise<boolean> => {
    const user1FriendsDocRef = doc(db, 'friends', user1Uid)
    const user1FriendsDoc = await getDoc(user1FriendsDocRef)

    const user2FriendsDocRef = doc(db, 'friends', user2Uid)
    const user2FriendsDoc = await getDoc(user2FriendsDocRef)

    const user1Blocked = user1FriendsDoc.exists()
        ? user1FriendsDoc.data().blocked || []
        : []
    const user2Blocked = user2FriendsDoc.exists()
        ? user2FriendsDoc.data().blocked || []
        : []

    return user1Blocked.includes(user2Uid) || user2Blocked.includes(user1Uid)
}

export default isUserBlocked
