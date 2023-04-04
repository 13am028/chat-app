import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../init'

const updateFriendBlockStatus = async (
    user: {
        uid: string
        displayName: string
    },
    action: 'block' | 'unblock',
): Promise<string> => {
    try {
        const currentUser = auth.currentUser
        if (!currentUser) {
            throw new Error('User not authenticated')
        }

        if (!user.uid) {
            throw new Error('User UID not provided')
        }

        const myUID = currentUser.uid
        const myFriendsDoc = await getDoc(doc(db, 'friends', myUID))

        if (!myFriendsDoc.exists()) {
            return 'not_found'
        }

        const myFriendsData = myFriendsDoc.data()
        const myBlocked = myFriendsData.blocked || []

        if (action === 'block' && !myBlocked.includes(user.uid)) {
            myBlocked.push(user.uid)
        } else if (action === 'unblock') {
            const userIndex = myBlocked.indexOf(user.uid)
            if (userIndex !== -1) {
                myBlocked.splice(userIndex, 1)
            }
        }

        await setDoc(doc(db, 'friends', myUID), {
            ...myFriendsData,
            blocked: myBlocked,
        })

        return 'success'
    } catch (err: any) {
        console.error(err)
        return 'error'
    }
}

export const blockFriend = async (user: {
    uid: string
    displayName: string
}): Promise<string> => {
    return updateFriendBlockStatus(user, 'block')
}

export const unblockFriend = async (user: {
    uid: string
    displayName: string
}): Promise<string> => {
    return updateFriendBlockStatus(user, 'unblock')
}
