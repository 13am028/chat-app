import React from 'react';
import './Setting.css'

const UserSettingPage = () => {

    // TODO : CLOSE SETTING TABS (GO BACK TO HOME OR WHERE EVER USER IN)
    // TODO : LEFT PANEL CONTAIN ALL DIFFERENT KIND OF SETTING (EG. Account, Profile, Apperance, etc)
    // TODO : RIGHT PANEL CONTAIN ALL SETTING FEATURE AVALABLE FOR THE SETTING

    // TODO : TRANSITION TO AND OUT OF SETTING PAGE

    return (
        
        <div className="container">

            <nav className="left-panel">
                <h2>USER SETTING</h2>
                <ul>
                    <li><a href="#" className="active">My Account</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Privacy &amp; Safety</a></li>
                    <li><a href="#">Authorized Apps</a></li>
                    <li><a href="#">Devices</a></li>
                    <li><a href="#">Connections</a></li>
                    <li><a href="#">Friend Requests</a></li>
                </ul>
                <hr/>
                <h2>APP SETTING</h2>
                <ul>
                    <li><a href="#">Appearance</a></li>
                    <li><a href="#">Accessibility</a></li>
                    <li><a href="#">Voice</a></li>
                </ul>
            </nav>

            <div className="right-panel">
                <h1>My Account</h1>
                <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />

                <label htmlFor="language">Language:</label>
                <select id="language" name="language">
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                </select>

                <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default UserSettingPage;