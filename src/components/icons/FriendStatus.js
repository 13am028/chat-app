import React from 'react';
import styles from "./icons.module.css";
import {useNavigate} from "react-router-dom";

const FriendStatus = (user) => {

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = '/dm';
        navigate(path, {state: {displayName: user.displayName, uid: user.uid}});
    }

    return (
        <div className={styles.friend} onClick={routeChange}>
            <div className={styles.friendIcon}></div>
            <div>
                <p className={styles.name}>{user.displayName}</p>
                <p>status</p>
            </div>
        </div>
    );
};

export default FriendStatus;