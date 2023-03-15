import React from 'react';
import GroupIcon from "../icons/GroupIcon";
import AddServerIcon from '../icons/AddServerIcon';
import styles from './nav.module.css'
import { useNavigate } from "react-router-dom";

const Nav = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/home';
        navigate(path);
    }

    return (
        <div className={styles.navLeft}>
            <div className={styles.nav_head} onClick={routeChange}>
                <GroupIcon />
            </div>
            <div className={styles.nav_content}>
                <GroupIcon />
                <GroupIcon />
                <GroupIcon />
                <GroupIcon />
                <GroupIcon />
                <GroupIcon />
                <GroupIcon />
                <GroupIcon />
                <GroupIcon />
                <AddServerIcon />
            </div>
        </div>
    );
};

export default Nav;