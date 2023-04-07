import { doc, getDoc, updateDoc } from 'firebase/firestore'
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

export { getUser, updateAvatar, updateStatus }
