import React from 'react'
import './ServerChat.css'
import Nav from '../../components/nav/Nav'
import Conversation from '../../components/dm/Conversation'
import styles from '../../components/nav/nav.module.css'
import ServerPeople from '../serverChat/ServerPeople'

const ServerChat = () => {
    /* Disable default context menu */
    const handleContextMenu = (event: any) => {
        event.preventDefault()
    }

    return (
        <div onContextMenu={handleContextMenu} className="navbar-group">
            <div className="navbar-left">
                <Nav />
                <ServerPeople />
            </div>
            <div className="navbar-right">
                <div className={styles.navTopSecond}>
                    <h4>Group Name</h4>
                </div>
                <div className="bg">
                    <Conversation />
                </div>
            </div>
        </div>
    )
}

export default ServerChat
