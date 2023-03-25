import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import { auth, db } from '../init'


const blockFriend = async (toBlockUsername: string) => {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error('User not authenticated');
        }

        const userQuery = query(collection(db, "users"), where("username", "==", toBlockUsername));
        const userDocs = await getDocs(userQuery);
        let toBlockUID = "";
        userDocs.forEach((doc) => {
            if (doc.data().username === toBlockUsername) {
                toBlockUID = doc.data().uid;
            }
        });

        if (toBlockUID === "") {
            return "not_found";
        }

        const myUID = currentUser.uid;
        const myFriendsDoc = await getDoc(doc(db, 'friends', myUID));
        const myFriendsData = myFriendsDoc.data();

        if (!myFriendsData) {
            return "not_found";
        }

        let myBlocked = myFriendsData.blocked;
        if (!myBlocked.includes(toBlockUID)) {
            myBlocked.push(toBlockUID);
            await setDoc(doc(db, 'friends', myUID), {
                ...myFriendsData,
                blocked: myBlocked
            });
        }

        return "success";
    } catch (err: any) {
        console.error(err);
        return "error";
    }
};

export { blockFriend }