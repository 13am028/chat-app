import { auth, db } from '../init'
import { collection, doc, setDoc } from 'firebase/firestore'

const createGroup = async (groupName: string, imageUrl: string) => {
    try {
        if (!auth.currentUser) return

        const groupRef = doc(collection(db, 'groups'))
        const groupUid = groupRef.id
        const myUID = auth.currentUser.uid

        // Group Document
        await setDoc(groupRef, {
            groupId: groupUid,
            groupName,
            groupPic: imageUrl,
            adminUID: myUID,
            users: {
                [myUID]: true,
            },
        })

        const groupChatRef = doc(collection(db, 'groupChats'), groupUid)

        await setDoc(groupChatRef, {
            messages: [],
        })
    } catch (error: any) {
        console.error('Error creating group:', error)
        alert(error.message)
    }
}

export { createGroup }
