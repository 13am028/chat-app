import React, { useState } from 'react'
import './Setting.css'
import ProfileSetting from '../../components/setting/ProfileSetting'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Link } from 'react-router-dom'

const UserSettingPage = () => {
    const [activeTab, setActiveTab] = useState('profile')

    return (
        <div className="container">
            <div className="left-panel" data-testid="left-panel">
                <div className="left-panel-bar">
                    <div className="left-panel-content">
                        <h2 data-testid="user-setting">USER SETTINGS</h2>
                        <ul>
                            <li>
                                <a
                                    onClick={() => setActiveTab('profile')}
                                    className={
                                        activeTab === 'profile' ? 'active' : ''
                                    }
                                    href="#top"
                                    data-testid="profile-link"
                                >
                                    My Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() =>
                                        setActiveTab('privacy-safety')
                                    }
                                    className={
                                        activeTab === 'privacy-safety'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                    data-testid="privacy-link"
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
                                    data-testid="friend-request-link"
                                >
                                    Friend Requests
                                </a>
                            </li>
                        </ul>
                        <hr />
                        <h2 data-testid="app-settings">APP SETTINGS</h2>
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
                                    data-testid="appearance-link"
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
                                    data-testid="accessibility-link"
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
                                    data-testid="voice-video-link"
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
                                    data-testid="text-image-link"
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
                                    data-testid="notification-link"
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
                                    data-testid="language-link"
                                >
                                    Language
                                </a>
                            </li>
                        </ul>
                        <hr />
                        <h2 data-testid="activity-settings">
                            ACTIVITY SETTINGS
                        </h2>
                        <ul>
                            <li>
                                <a
                                    onClick={() =>
                                        setActiveTab('activity-privacy')
                                    }
                                    className={
                                        activeTab === 'activity-privacy'
                                            ? 'active'
                                            : ''
                                    }
                                    href="#top"
                                    data-testid="activity-privacy-link"
                                >
                                    Activity Privacy
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
                                    data-testid="registered-game-link"
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
                                    data-testid="logout-link"
                                >
                                    Log Out
                                </a>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
            </div>

            <div className="right-panel" data-testid="right-panel">
                <Link to="/home" className="icon-link" data-tesid="icon-link">
                    <HighlightOffIcon
                        className="close-button"
                        data-testid="close-button"
                    />
                </Link>

                {activeTab === 'profile' && <ProfileSetting />}
            </div>
        </div>
    )
}

export default UserSettingPage
