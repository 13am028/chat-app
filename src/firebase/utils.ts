import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore'
import { auth, db } from './init'

const getUser = async (uid: string) => {
    return (await getDoc(doc(db, 'users', uid))).data()
}

const updateAvatar = async (url: string) => {
    if (!auth.currentUser) return
    const userRef = doc(db, 'users', auth.currentUser.uid)
    await updateDoc(userRef, {
        avatar: url,
    })
}

const updateStatus = async (status: string) => {
    if (!auth.currentUser) return
    const userRef = doc(db, 'users', auth.currentUser.uid)
    await updateDoc(userRef, {
        status: status,
    })
}

// @ts-ignore
const listenToGroupMessages = (
    groupId: any,
    userId: string | undefined,
    callback: any,
) => {
    const messagesRef = collection(db, 'groupChats', groupId, 'messages')
    const messagesQuery = query(messagesRef, orderBy('timestamp'))

    onSnapshot(messagesQuery, snapshot => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }))
        callback(messages)
    })
}

export { getUser, updateAvatar, updateStatus, listenToGroupMessages }
