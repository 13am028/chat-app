import { useContext, useState } from "react";
import "./ProfileSetting.css";
import {Modal} from 'react-bootstrap';
import SpanRevealButton from "../../../components/setting/SpanRevealButton";
import { AuthContext } from "../../../components/context/AuthContext";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const ProfileSetting = () => {
    const { currentUser } = useContext(AuthContext);
    const mockUser = {
        uid: "1234",
        email: "johndow@example.com",
        displayName: "Johndow",
        username: "Johndow",
    };

    const user = currentUser || mockUser;
    const email = user.email ? user.email : "johndow@example.com";
    const displayName = user.displayName ? user.displayName : "Johndow";
    const username = user.username ? user.username : "Johndow";
    const profile = `https://icotar.com/initials/${displayName}`;
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
                <div className='profile-pic-bg'>
                    <div className='profilepic'>
                        <img
                            className='profile-img'
                            src='https://icotar.com/initials/Test'
                            alt='Profile'
                        />
                        <div className="profilepic__content" >
                            <div className="profilepic__text" onClick={handleShowModal}>Change Avatar</div>
                        </div>

                    </div>
                    <span className='username-span'>username</span>
                </div>
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <h4 className='modal-title'>Change Avatar</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-box modal-upload" >

                            <div className="modal-icon">
                                <i className="fas fa-upload"></i>
                                <AddPhotoAlternateIcon style={{ fontSize: 40 }}/>
                            </div>
                            <div className="modal-label" >Upload Image</div>
                            <input
                                type='file'
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="modal-box modal-view" >
                            <div className="modal-icon">
                                <i className="fas fa-user"></i>
                                <PersonPinIcon style={{ fontSize: 40 }}/>
                            </div>
                            <div className='modal-label'>
                                View Profile
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className='profile-card'>
                    <div className='profile-card-field-list'>
                        <div className='field'>
                            <div className='username-row'>
                                <h3>USERNAME</h3>
                                <div className='username-inner-row'>
                                    <span>{username}</span>
                                    {/* <span>#6550</span> */}
                                </div>
                            </div>
                        </div>
                        <div className='field field-spacer'>
                            <div className='email-row'>
                                <h3>EMAIL</h3>
                                <SpanRevealButton data={email} type='email' />
                            </div>
                        </div>
                        {/* <div className='field field-spacer'>
                            <div className='phone-row'>
                                <h3>PHONE NUMBER</h3>
                                <SpanRevealButton data={phone} type='phone' />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <hr />

            <div className='profile user-security'>
                <div>
                    <h2 className='section-title'>
                        Password and Authentication
                    </h2>
                </div>
                <div className='children'>
                    <div>
                        <button className='button'>
                            <div>Change Password</div>
                        </button>
                    </div>
                    <div>
                        <div className='flex'>
                            <div className='description title'>
                                TWO-FACTOR AUTHENTICATION
                            </div>
                            <div
                                className='description'
                                style={{ marginBottom: 8 }}>
                                Protect your Discord account with an extra layer
                                of security. Once configured, you'll be required
                                to enter both your password and an
                                authentication code from your mobile phone in
                                order to sign in.
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
