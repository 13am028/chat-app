import { auth, db } from '../init'
import { doc, updateDoc, collection } from 'firebase/firestore'

const addFriendToGroup = async (groupId: string, toAddUID: string) => {
    try {
        if (!auth.currentUser) return
        const myUID = auth.currentUser.uid

        const groupRef = doc(db, 'groups', groupId)

        const usersRef = collection(groupRef, 'users')
        
        await updateDoc(groupRef, {
            [`users.${toAddUID}`]: true,
        })

        return true;
 
    } catch (error: any) {
        console.error(error)
    }
}

export { addFriendToGroup }
