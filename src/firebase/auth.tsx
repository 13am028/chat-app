import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'
import { auth, db } from './init'
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'

const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user
        await updateProfile(user, { displayName: user.displayName })
        const q = query(collection(db, 'users'), where('uid', '==', user.uid))
        const docs = await getDocs(q)
        if (docs.docs.length === 0) {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                username: user.uid,
                authProvider: 'google',
                email: user.email,
            })
            await setDoc(doc(db, 'friends', user.uid), {
                friends: [],
            })
            await setDoc(doc(db, 'userChats', user.uid), {})
        }
    } catch (err: any) {
        console.error(err)
        alert(err.message)
    }
}

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
        console.error(err)
        alert(err.message)
    }
}

const registerWithEmailAndPassword = async (
    username: string,
    displayName: string,
    email: string,
    password: string,
) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        querySnapshot.forEach(doc => {
            if (doc.data().username === username) {
                throw Error('username already exists')
            }
        })
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await updateProfile(user, { displayName })
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            username,
            displayName,
            authProvider: 'local',
            email,
        })
        await setDoc(doc(db, 'friends', user.uid), {
            friends: [],
        })
        await setDoc(doc(db, 'userChats', user.uid), {})
    } catch (err: any) {
        console.error(err)
        alert(err.message)
    }
}

const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert('Password reset link sent!')
    } catch (err: any) {
        console.error(err)
        alert(err.message)
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (err: any) {
        console.error(err)
        alert(err.message)
    }
}

export {
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
}
