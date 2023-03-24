import { auth, db } from '../init'
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore'

const createGroup = async (groupName: string) => {
    try {
        if (!auth.currentUser) return

        const groupRef = doc(collection(db, 'groups'))
        const groupUid = groupRef.id
        const myUID = auth.currentUser.uid

        // Group Document
        await setDoc(groupRef, {
            groupId: groupUid,
            groupName,
            groupPic: 'some image url',
            adminUID: myUID,
            users: {
                [myUID]: true,
                role: 'admin',
                profilePic: 'some image url',
            },
        })

        // Message subcollection under group document
        const messagesCollection = collection(groupRef, 'messages')

        const initialMessage = {
            text: 'Welcome to the group!',
            senderId: myUID,
            timestamp: serverTimestamp(),
        }

        await addDoc(messagesCollection, initialMessage)
    } catch (error: any) {
        console.error('Error creating group:', error)
        alert(error.message)
    }
}

export { createGroup }
