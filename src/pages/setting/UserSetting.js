import React, { useState } from 'react';
import './Setting.css'
import AccountSetting from './pages/AccountSetting';
import ProfileSetting from './pages/ProfileSetting';

const UserSettingPage = () => {

    // TODO : CLOSE SETTING TABS (GO BACK TO HOME OR WHERE EVER USER IN)
    // TODO : TRANSITION TO AND OUT OF SETTING PAGE
    
    const [activeTab, setActiveTab] = useState('account');


    return (

        <div className="container">

            <nav className="left-panel">
                <h2>USER SETTING</h2>
                <ul>
                    <li><a onClick={() => setActiveTab('account')} href="#">My Account</a></li>
                    <li><a onClick={() => setActiveTab('profile')} href="#" >Profile</a></li>
                    <li><a onClick={() => setActiveTab('profile')} href="#">Privacy &amp; Safety</a></li>
                    <li><a onClick={() => setActiveTab('profile')} href="#">Authorized Apps</a></li>
                    <li><a onClick={() => setActiveTab('profile')} href="#">Devices</a></li>
                    <li><a onClick={() => setActiveTab('profile')} href="#">Connections</a></li>
                    <li><a onClick={() => setActiveTab('profile')} href="#">Friend Requests</a></li>
                </ul>
                <hr />
                <h2>APP SETTING</h2>
                <ul>
                    <li><a href="#">Appearance</a></li>
                    <li><a href="#">Accessibility</a></li>
                    <li><a href="#">Voice</a></li>
                </ul>
            </nav>
            
            <div className="right-panel">
                {activeTab === 'account' && <AccountSetting />}
                {activeTab === 'profile' && <ProfileSetting />}
            </div>
        </div>
    );
};

export default UserSettingPage;