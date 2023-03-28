import { auth, db } from '../init'
import { doc, getDoc } from 'firebase/firestore'

const getFriends = async () => {
    if (!auth.currentUser) return
    const myFriendsDoc = await getDoc(doc(db, 'friends', auth.currentUser.uid))

    if (!myFriendsDoc.exists()) {
        return []
    }

    const myFriendsData: any = myFriendsDoc.data()
    const friendUIDs = myFriendsData.friends || []
    const myBlocked = myFriendsData.blocked || []

    let friendsData = []
    for (const uid of friendUIDs) {
        if (!myBlocked.includes(uid)) {
            let temp = (await getDoc(doc(db, 'users', uid))).data()
            friendsData.push(temp)
        }
    }
    return friendsData
}

export { getFriends }
