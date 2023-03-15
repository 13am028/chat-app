import React, {useContext} from 'react';
import styles from "./icons.module.css";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const FriendStatus = (user: any) => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/dm';
        navigate(path, { state: { displayName: user.displayName, uid: user.uid } });
    }

    const {currentUser} = useContext(AuthContext)

    return (
        <div className={styles.friend} onClick={routeChange}>
            <div className={styles.friendIcon}></div>
            <div className={styles.friendName}>
                <p className={styles.name}>{user.displayName}</p>
                <strong>status</strong>
            </div>
        </div>
    );
};

export default FriendStatus;