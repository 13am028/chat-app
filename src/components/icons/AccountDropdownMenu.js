import React from 'react';
import styles from './icons.module.css'
import {Dropdown} from "react-bootstrap";

const AccountDropdownMenu = () => {
    return (
        <Dropdown style={{display: "inline-block", position: "absolute", right: "0", margin: "0"}}>
            <Dropdown.Toggle variant="light" id="dropdown-basic" size='sm' className={styles.myIcon}>
                ME
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="/setting">Settings</Dropdown.Item>
                <Dropdown.Item href="/login">Log out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default AccountDropdownMenu;