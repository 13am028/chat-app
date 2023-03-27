import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import { auth, db } from '../init'

const addFriend = async (toAddUsername: string) => {
    const q = query(
        collection(db, 'users'),
        where('username', '==', toAddUsername),
    )
    const docs = await getDocs(q)
    let toAddUID = ''
    docs.forEach(doc => {
        if (doc.data().username === toAddUsername) {
            toAddUID = doc.data().uid
        }
    })

    if (toAddUID === '' || !auth.currentUser) {
        return 'not_found'
    }

    const myUID = auth.currentUser.uid
    let friendsData = (await getDoc(doc(db, 'friends', myUID))).data()
    let toAddFriendsData = (await getDoc(doc(db, 'friends', toAddUID))).data()

    if (!friendsData || !toAddFriendsData) {
        return 'not_found'
    }

    let myFriends = friendsData.friends
    if (myFriends.includes(toAddUID)) {
        return 'already_friends'
    }

    myFriends.push(toAddUID)
    await setDoc(doc(db, 'friends', myUID), {
        friends: myFriends,
    })

    let toAddFriends = toAddFriendsData.friends
    toAddFriends.push(myUID)
    await setDoc(doc(db, 'friends', toAddUID), {
        friends: toAddFriends,
    })

    return 'success'
}

export { addFriend }
