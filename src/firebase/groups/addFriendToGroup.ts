import { auth, db } from '../init'
import { doc, updateDoc, collection } from 'firebase/firestore'

const addFriendToGroup = async (groupId: string, toAddUID: string) => {
    try {

        const groupRef = doc(db, 'groups', groupId)
        
        await updateDoc(groupRef, {
            [`users.${toAddUID}`]: true,
        })

        return true;
 
    } catch (error: any) {
        console.error(error)
    }
}

export { addFriendToGroup }
