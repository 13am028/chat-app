import React, {useContext, useEffect, useState} from 'react';
import styles from "../../components/icons/icons.module.css";
import {doc, onSnapshot, Timestamp} from "firebase/firestore";
import { AuthContext } from "../../components/context/AuthContext";
import { db } from '../../firebase/init';
import { ChatContext } from "../../components/context/ChatContext";
import {useNavigate} from "react-router-dom";
import "./ServerPeople.css";

const DirectMessageNav = () => {

    type Chat = {
        chatId: string;
        userInfo: {
            displayName: string;
        };
        lastMessage: {
            message: string | null;
        }
        date: Timestamp;
    }

    const {currentUser} = useContext(AuthContext)
    const [chats, setChats] = useState<Chat[]>([]);
    const {dispatch} = useContext(ChatContext);
    let navigate = useNavigate();

    useEffect(() => {
        const getChats = () => {
            if (currentUser?.uid) {
                const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                    const chatsData = doc.data();
                    const chatsArray = chatsData ? Object.values(chatsData) : [];
                    const sortedChats = chatsArray.sort((a, b) => b.date - a.date);
                    setChats(sortedChats);
                });
                return () => unsub();
            }
        };
        currentUser?.uid && getChats()
    }, [currentUser?.uid]);

    const handleOnSelect = (u: any) => {
        dispatch({type: "CHANGE_USER", payload: u})
        navigate("/ServerChat")
    }

    return (
        <div className="navTopFirst">
            <div className="nav_head">
                <h4>Members</h4>
            </div>
            {chats && Object.entries(chats)?.map((chat) => (
                <div className={styles.friend} key={chat[0]} onClick={() => handleOnSelect(chat[1].userInfo)}>
                    <div className={styles.friendIcon}></div>
                    <div className={styles.friendName}>
                        <p className={styles.name}>{chat[1].userInfo.displayName}</p>
                        <p>{chat[1].lastMessage?.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );

};


export default DirectMessageNav;