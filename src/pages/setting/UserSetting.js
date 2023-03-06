import React, { useState } from 'react';
import './Setting.css'
import ProfileSetting from './pages/ProfileSetting';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from 'react-router-dom';

const UserSettingPage = () => {

    const [activeTab, setActiveTab] = useState('profile');

    return (

        <div className="container">
            <nav className="left-panel">
                <h2>USER SETTINGS</h2>
                <ul>
                    <li><a onClick={() => setActiveTab('profile')} href="#">My Profile</a></li>
                    <li><a onClick={() => setActiveTab('profile')} href="#">Privacy &amp; Safety</a></li>
                    <li><a onClick={() => setActiveTab('profile')} href="#">Friend Requests</a></li>
                </ul>
                <hr />
                <h2>APP SETTINGS</h2>
                <ul>
                    <li><a onClick={() => setActiveTab('appearance')} href="#">Appearance</a></li>
                    <li><a onClick={() => setActiveTab('accessibility')} href="#">Accessibility</a></li>
                    <li><a onClick={() => setActiveTab('voice-video')} href="#">Voice & Video</a></li>
                    <li><a onClick={() => setActiveTab('text-image')} href="#">Text & Image</a></li>
                    <li><a onClick={() => setActiveTab('notification')} href="#">Notification</a></li>
                    <li><a onClick={() => setActiveTab('language')} href="#">Language</a></li>
                </ul>
                <hr />
                <h2>ACTIVITY SETTINGS</h2>
                <ul>
                    <li><a onClick={() => setActiveTab('appearance')} href="#">Appearance</a></li>
                    <li><a onClick={() => setActiveTab('accessibility')} href="#">Accessibility</a></li>
                    <li><a onClick={() => setActiveTab('voice-video')} href="#">Voice & Video</a></li>
                    <li><a onClick={() => setActiveTab('text-image')} href="#">Text & Image</a></li>
                    <li><a onClick={() => setActiveTab('notification')} href="#">Notification</a></li>
                    <li><a onClick={() => setActiveTab('language')} href="#">Language</a></li>
                </ul>
                <hr />
                <ul>
                    <li><a onClick={() => setActiveTab('logout')} href="#">Log Out</a></li>
                </ul>
            </nav>
            
            <div className="right-panel">
                {activeTab === 'profile' && <ProfileSetting />}
                
            </div>

            <div className="close-panel">
                <Link to="/home" className="icon-link">
                    <HighlightOffIcon className="custom-icon" />
                </Link>
            </div>
        </div>
    );
};

export default UserSettingPage;