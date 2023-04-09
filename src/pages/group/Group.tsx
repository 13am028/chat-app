import React from 'react'
import './Group.css'
import Conversation from '../../components/dm/Conversation'
import styles from '../../components/nav/nav.module.css'
import ServerPeople from '../../components/server/GroupMembers'
import AccountDropdownMenu from '../../components/icons/AccountDropdownMenu'
import { useLocation } from 'react-router-dom'

const Group = () => {
    /* Disable default context menu */
    const handleContextMenu = (event: any) => {
        event.preventDefault()
    }

    const location = useLocation()
    const groupName = location.state.groupName

    return (
        <div onContextMenu={handleContextMenu} className="navbar-group">
            <div className="navbar-left">
                <ServerPeople />
            </div>
            <div className="navbar-right">
                <div className={styles.navTopSecond}>
                    <AccountDropdownMenu />
                    <h4>{groupName}</h4>
                </div>
                <div className="bg">
                    <Conversation />
                </div>
            </div>
        </div>
    )
}

export default Group
