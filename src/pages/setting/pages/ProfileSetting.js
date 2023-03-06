import React from 'react';
import './ProfileSetting.css'
import { TextareaAutosize } from '@mui/base';

const ProfileSetting = () => {
    return (
        <div>
            <div className='profile'>
                <h1>Your Profile</h1>
                <div className='profile-head'>
                    <img className='profile-img' src="https://icotar.com/initials/Test"></img>
                </div>
                <div className='profile-content'>
                    <h3>username</h3>
                    <label>Your Description</label>
                    <TextareaAutosize className='profile-description' placeholder='Tell people about yourself' minRows={5}/>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetting;