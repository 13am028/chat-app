// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    addDoc,
    getDoc,
    getDocs,
    collection,
    where,
    setDoc, doc,
} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                username: user.uid,
                authProvider: "google",
                email: user.email,
            });
            await setDoc(doc(db, 'friends', user.uid), {
                friends: []
            })
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (username: string, displayName: string, email: string, password: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.data().username === username) {
                throw Error("username already exists")
            }
        });
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            username,
            displayName,
            authProvider: "local",
            email,
        });
        await setDoc(doc(db, 'friends', user.uid), {
            friends: []
        })
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

const logout = async () => {
    try {
        await signOut(auth);
    } catch (err: any) {
        console.error(err);
        alert(err.message)
    }
}

/* TODO:
    handle the case where username is not found properly (in toADdUID === "" part)
    check if users are already friends
 */
const addFriend = async (toAddUsername: string) => {
    const q = query(collection(db, "users"), where("username", "==",toAddUsername));
    const docs = await getDocs(q);
    let toAddUID = ""
    docs.forEach((doc) => {
        if (doc.data().username === toAddUsername) {
            toAddUID = doc.data().uid
        }
    });
    if (toAddUID === "" || !auth.currentUser) return

    const myUID = auth.currentUser.uid
    let friendsData = (await getDoc(doc(db, 'friends', myUID))).data()
    let toAddFriendsData = (await getDoc(doc(db, 'friends', toAddUID))).data()
    if (!friendsData || !toAddFriendsData) return
    let myFriends = friendsData.data().friends
    myFriends.push(toAddUID)
    await setDoc(doc(db, 'friends', myUID), {
        friends: myFriends
    })
    let toAddFriends = toAddFriendsData.friends
    toAddFriends.push(myUID)
    await setDoc(doc(db, 'friends', toAddUID), {
        friends: toAddFriends
    })
}

const getFriends = async () => {
    if (!auth.currentUser) return
    const friends: any = (await getDoc(doc(db, 'friends', auth.currentUser.uid))).data()
    const friendUIDs = friends.friends
    let friendsData = []
    for (const uid of friendUIDs) {
        let temp = (await getDoc(doc(db, 'users', uid))).data()
        friendsData.push(temp)
    }
    return friendsData
}

const createGroup = async (groupName: string) => {
    try {
        if (!auth.currentUser) return

        const groupRef = doc(collection(db, "groups"));
        const groupUid = groupRef.id;
        const myUID = auth.currentUser.uid

        await setDoc(groupRef, {
            groupId: groupUid,
            groupName,
            adminUID: myUID,
        });
      } catch (error: any) {

        console.error('Error creating group:', error);
        alert(error.message);
      }
}

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    addFriend,
    getFriends,
    createGroup,
};