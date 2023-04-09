import React, { useContext } from 'react'
import DirectMessageNav from '../../components/nav/DirectMessageNav'
import styles from '../../components/nav/nav.module.css'
import Conversation from '../../components/dm/Conversation'
import { ChatContext } from '../../components/context/ChatContext'

const DMPage = () => {
    const { data } = useContext(ChatContext)

    return (
        <div className="navbar-group" data-testid="dm-page">
            <div className="navbar-left">
                <DirectMessageNav />
            </div>
            <div className="navbar-right">
                <div className={styles.navTopSecond} data-testid="display-name">
                    <h4>{data.user.displayName}</h4>
                </div>
                <Conversation></Conversation>
            </div>
        </div>
    )
}

export default DMPage
