import { db } from '../init'
import { doc, getDoc, updateDoc, deleteField  } from 'firebase/firestore'

const leaveGroup = async (userUID: string, groupId: string) => {
    try {
        const groupRef = doc(db, 'groups', groupId)

        await updateDoc(groupRef, {
            [`users.${userUID}`]: deleteField(),
          });

    } catch (error: any) {
        console.error(error)
    }
}

export { leaveGroup }
