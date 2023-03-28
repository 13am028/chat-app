import React, { useState } from 'react'
import './Setting.css'
import ProfileSetting from '../../components/setting/ProfileSetting'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Link } from 'react-router-dom'

const UserSettingPage = () => {
    const [activeTab, setActiveTab] = useState('profile')

    return (
        <div className="container">
            <div className="left-panel">
                <div className="left-panel-bar">
                    <div className="left-panel-content">
                        <h2>USER SETTINGS</h2>
                        <ul>
                            <li>
                                <a
                                    onClick={() => setActiveTab('profile')}
                                    className={
                                        activeTab === 'profile' ? 'active' : ''
                                    }
                                    href="#top"
                                >
                                    My Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() =>
                                        setActiveTab('privary-safety')
                                    }
                                    className={
                                        activeTab === 'privary-safety'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                >
                                    Privacy &amp; Safety
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() =>
                                        setActiveTab('friend-request')
                                    }
                                    className={
                                        activeTab === 'friend-request'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                >
                                    Friend Requests
                                </a>
                            </li>
                        </ul>
                        <hr />
                        <h2>APP SETTINGS</h2>
                        <ul>
                            <li>
                                <a
                                    onClick={() => setActiveTab('appearance')}
                                    className={
                                        activeTab === 'appearance'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                >
                                    Appearance
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() =>
                                        setActiveTab('accessibility')
                                    }
                                    className={
                                        activeTab === 'accessibility'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                >
                                    Accessibility
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => setActiveTab('voice-video')}
                                    className={
                                        activeTab === 'voice-video'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                >
                                    Voice & Video
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => setActiveTab('text-image')}
                                    className={
                                        activeTab === 'text-image'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                >
                                    Text & Image
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => setActiveTab('notification')}
                                    className={
                                        activeTab === 'notification'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                >
                                    Notification
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => setActiveTab('language')}
                                    className={
                                        activeTab === 'language' ? 'active' : ''
                                    }
                                    href="#top"
                                >
                                    Language
                                </a>
                            </li>
                        </ul>
                        <hr />
                        <h2>ACTIVITY SETTINGS</h2>
                        <ul>
                            <li>
                                <a
                                    onClick={() =>
                                        setActiveTab('activity-privary')
                                    }
                                    className={
                                        activeTab === 'activity-privary'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                >
                                    Activity Privary
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() =>
                                        setActiveTab('registered-game')
                                    }
                                    className={
                                        activeTab === 'registered-game'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                >
                                    Registered Games
                                </a>
                            </li>
                        </ul>
                        <hr />
                        <ul>
                            <li>
                                <a
                                    href="#top"
                                    onClick={() => setActiveTab('logout')}
                                >
                                    Log Out
                                </a>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
            </div>

            <div className="right-panel">
                <Link to="/home" className="icon-link">
                    <HighlightOffIcon className="close-button" />
                </Link>

                {activeTab === 'profile' && <ProfileSetting />}
            </div>
        </div>
    )
}

export default UserSettingPage
