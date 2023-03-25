import { auth, db } from '../init'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'

const removeFriend = async (toRemoveUsername: string): Promise<string> => {
    try {
        const currentUser = auth.currentUser
        if (!currentUser) {
            throw new Error('User not authenticated')
        }

        const userQuery = query(
            collection(db, 'users'),
            where('username', '==', toRemoveUsername),
        )
        const userDocs = await getDocs(userQuery)
        let toRemoveUID = ''
        userDocs.forEach(doc => {
            if (doc.data().username === toRemoveUsername) {
                toRemoveUID = doc.data().uid
            }
        })

        if (toRemoveUID === '') {
            return 'not_found'
        }

        const myUID = currentUser.uid
        const myFriendsDoc = await getDoc(doc(db, 'friends', myUID))
        const myFriendsData = myFriendsDoc.data()

        const toRemoveFriendsDoc = await getDoc(doc(db, 'friends', toRemoveUID))
        const toRemoveFriendsData = toRemoveFriendsDoc.data()

        if (!myFriendsData || !toRemoveFriendsData) {
            return 'not_found'
        }

        let myFriends = myFriendsData.friends
        if (!myFriends.includes(toRemoveUID)) {
            return 'not_friends'
        }

        myFriends = myFriends.filter((uid: string) => uid !== toRemoveUID)
        await setDoc(doc(db, 'friends', myUID), {
            friends: myFriends,
        })

        let toRemoveFriends = toRemoveFriendsData.friends
        toRemoveFriends = toRemoveFriends.filter((uid: string) => uid !== myUID)
        await setDoc(doc(db, 'friends', toRemoveUID), {
            friends: toRemoveFriends,
        })

        return 'success'
    } catch (err: any) {
        console.error(err)
        return 'error'
    }
}

export { removeFriend }
