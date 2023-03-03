import React from 'react';
import './Setting.css'


const ProfilePage = () => {
    return (
        <div className="container">
            <nav className="left-panel">
                <h2>USER SETTING</h2>
                <ul>
                    <li><a href="/setting">My Account</a></li>
                    <li><a href="/profile" className="active">Profile</a></li>
                    <li><a href="#">Privacy &amp; Safety</a></li>
                    <li><a href="#">Authorized Apps</a></li>
                    <li><a href="#">Devices</a></li>
                    <li><a href="#">Connections</a></li>
                    <li><a href="#">Friend Requests</a></li>
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
                <div className='profile'>
                    <h1>Your Profile</h1>
                    <div className='profile-head'>
                        <img className='profile-img' src="https://icotar.com/initials/Test"></img>
                    </div>
                    <div className='profile-content'>
                        <h3>username</h3>
                        <textarea className='profile-description'>

                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;