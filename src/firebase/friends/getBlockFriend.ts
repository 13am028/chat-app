import { auth, db } from '../init'
import { doc, getDoc } from 'firebase/firestore'

const getBlockFriend = async ():Promise<string[] | undefined> => {
    const currentUser = auth.currentUser
    if(!currentUser) {
        console.error('User not authenticated')
        return
    }

    const myUID = currentUser.uid
    const myFriendsDoc = await getDoc(doc(db, `friends`, myUID))

    if (!myFriendsDoc.exists()) {
        console.error('Friends document not found')
        return
    }

    const myFriendsData = myFriendsDoc.data()
    const myBlocked = myFriendsData.blocked || []

    let blockedFriendsData: any[] = []

    for (const uid of myBlocked) {
        let temp = (await getDoc(doc(db, 'users', uid))).data()
        blockedFriendsData.push(temp)
    }

    return blockedFriendsData
}

export {getBlockFriend}