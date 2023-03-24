import React, {useContext} from 'react';
import styles from './icons.module.css'
import { Dropdown } from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";

const AccountDropdownMenu = () => {
    const {currentUser} = useContext(AuthContext)
    let imgURL = "https://cdn-icons-png.flaticon.com/512/456/456212.png"
    if (currentUser && currentUser.avatar) {
        imgURL = currentUser.avatar
    }
    return (
        <Dropdown style={{ display: "inline-block", right: "0", margin: "0" }}>
            <Dropdown.Toggle variant="light" id="dropdown- basic" size='sm' className={styles.myIcon}>
                {/*TODO: fix image proportion*/}
                <img src={imgURL} alt="profile avatar" className={styles.myIcon} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/setting">Settings</Dropdown.Item>
                <Dropdown.Item href="/logout">Log out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AccountDropdownMenu
