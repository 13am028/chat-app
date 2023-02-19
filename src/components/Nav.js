import React from 'react';
import GroupIcon from "./GroupIcon";
import styles from './nav.module.css'

const Nav = () => {
    return (
        <div className={styles.navLeft}>
            <GroupIcon/>
            <div className={styles.line}></div>
            <GroupIcon/>
            <GroupIcon/>
            <GroupIcon/>
            <GroupIcon/>
        </div>
    );
};

export default Nav;