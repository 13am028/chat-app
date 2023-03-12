import React from 'react';
import './ProfileSetting.css'


const ProfileSetting = () => {
    return (
        <div>
            <div className='profile'>
                <h2 className='section-title'>My Profile</h2>
                <svg className='profile-banner'>
                    {/* <mask>
                        <rect fill='white' x='0' y='0' width='100%' height='100%'></rect>
                        <circle fill='black' cx='62' cy='122' r='46'></circle>
                    </mask> */}
                </svg>
                <div className='user-info'>
                    <img className='profile-img' src="https://icotar.com/initials/Test"></img>
                    <span className='username-span'>username</span>
                </div>
                <div className='profile-card'>
                    <div className="profile-card-field-list">
                        <div className="field">
                            <div className="username-row">
                                <h3>USERNAME</h3>
                                <div className="username-inner-row">
                                    <span>b2</span>
                                    <span>#6550</span>
                                </div>
                            </div>
                        </div>
                        <div className="field field-spacer">
                            <div className="email-row">
                                <h3>EMAIL</h3>
                                <div className="email-inner-row">
                                    <span>*************@hotmail.com</span>
                                    <a className="reveal-button">
                                        Reveal
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="field field-spacer">
                            <div className="phone-row">
                                <h3>PHONE NUMBER</h3>
                                <div className="phone-inner-row">
                                    <span>********1519</span>
                                    <a className="reveal-button">
                                        Reveal
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="profile user-security">
                <div>
                    <h2 className='section-title'>Password and Authentication</h2>
                </div>
                <div className='children'>
                    <div>
                        <button className='button'>
                            <div>Change Password</div>
                        </button>
                    </div>
                    <div>
                        <div className='flex'>
                            <div className='description title'>TWO-FACTOR AUTHENTICATION</div>
                            <div className='description' style={{ marginBottom: 8 }}>
                                Protect your Discord account with an extra layer of security.
                                Once configured, you'll be required to enter both your password
                                and an authentication code from your mobile phone in order to sign in.
                            </div>
                            <div>
                                <button className='button'>
                                    <div>Enable Two-Factor Auth</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetting;