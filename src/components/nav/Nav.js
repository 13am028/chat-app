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
            <GroupIcon onClick={routeChange} />
            <div className={styles.line}></div>
            <GroupIcon />
            <GroupIcon />
            <GroupIcon />
            <GroupIcon />
            <AddServerIcon />
        </div>
    );
};

export default Nav;