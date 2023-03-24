import { auth, db } from '../init'
import { doc, getDoc } from 'firebase/firestore'

const getFriends = async () => {
    if (!auth.currentUser) return
    const friends: any = (
        await getDoc(doc(db, 'friends', auth.currentUser.uid))
    ).data()
    const friendUIDs = friends.friends
    let friendsData = []
    for (const uid of friendUIDs) {
        let temp = (await getDoc(doc(db, 'users', uid))).data()
        friendsData.push(temp)
    }
    return friendsData
}

export { getFriends }
