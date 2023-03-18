import React, {useContext, useEffect, useState} from 'react';
import styles from "../icons/icons.module.css";
import {doc, onSnapshot} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
import {db} from "../../firebase";
import {ChatContext} from "../context/ChatContext";
import {useNavigate} from "react-router-dom";

const DirectMessageNav = () => {

    type Chat = {
        chatId: string;
        userInfo: {
            displayName: string;
        };
        lastMessage: {
            message: string;
        }
    }

    const {currentUser} = useContext(AuthContext)
    const [chats, setChats] = useState<Chat[]>([]);
    const {dispatch} = useContext(ChatContext);
    let navigate = useNavigate();

    useEffect(() => {
        const getChats = () => {
            if (currentUser?.uid) {
                const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                    // @ts-ignore
                    setChats(doc.data());
                });
                return () => unsub();
            }
        };
        currentUser?.uid && getChats()
    }, [currentUser?.uid]);

    //console.log(Object.entries(chats))

    const handleOnSelect = (u: any) => {
        dispatch({type: "CHANGE_USER", payload: u})
        navigate("/dm")
    }

    return (
        <div className={styles.navTopFirst}>
            <div className={styles.nav_head}>
                <h4>DIRECT MESSAGES</h4>
            </div>
            {chats && Object.entries(chats)?.map((chat) => (
                <div className={styles.friend} key={chat[0]} onClick={() => handleOnSelect(chat[1].userInfo)}>
                    <div className={styles.friendIcon}></div>
                    <div className={styles.friendName}>
                        <p className={styles.name}>{chat[1].userInfo.displayName}</p>
                        <p>{chat[1].lastMessage.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );

};


export default DirectMessageNav;