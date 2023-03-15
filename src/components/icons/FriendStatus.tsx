import React, {useContext} from 'react';
import styles from "./icons.module.css";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {doc, getDoc, serverTimestamp, setDoc,updateDoc} from "firebase/firestore";
import {db} from "../../firebase";

const FriendStatus = (user: any) => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/dm';
        navigate(path, { state: { displayName: user.displayName, uid: user.uid } });
    }

    const {currentUser} = useContext(AuthContext)
    const handleOnSelect = async () => {
        const combinedId = (currentUser?.uid ?? "") > user.uid ? currentUser?.uid + user.uid : user.uid + (currentUser?.uid ?? "");
        try {
        const response = await getDoc(doc(db, "chats", combinedId));
        if (!response.exists()) {
            await setDoc(doc(db, "chats", combinedId), {messages: []});
            await updateDoc(doc(db, "userChats", currentUser?.uid ?? ""), {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                    uid: currentUser?.uid,
                    displayName: currentUser?.displayName,
                },
                [combinedId + ".date"]: serverTimestamp(),

            });
            routeChange()
        }
    } catch (err) {
    }
}
    return (
        <div className={styles.friend} onClick={handleOnSelect}>
            <div className={styles.friendIcon}></div>
            <div className={styles.friendName}>
                <p className={styles.name}>{user.displayName}</p>
                <strong>status</strong>
            </div>
        </div>
    );
};

export default FriendStatus;