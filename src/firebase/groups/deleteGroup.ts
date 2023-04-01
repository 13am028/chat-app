import { auth, db } from '../init'
import { doc, deleteDoc } from 'firebase/firestore'

const deleteGroup = async (groupId: string) => {
    try {
        if (!auth.currentUser) return
        const myUID = auth.currentUser.uid

        const groupRef = doc(db, 'groups', groupId)
        await deleteDoc(groupRef)
 
    } catch (error: any) {
        console.error(error)
    }
}

export { deleteGroup }
