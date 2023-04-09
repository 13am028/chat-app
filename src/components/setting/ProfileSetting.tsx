import { useContext, useState } from 'react'
import './ProfileSetting.css'
import { Modal } from 'react-bootstrap'
import SpanRevealButton from './SpanRevealButton'
import { AuthContext } from '../context/AuthContext'
import UploadWidget from '../upload/UploadWidget'
import { updateStatus } from '../../firebase/utils'

const ProfileSetting = (props: any) => {
    const { theme } = props
    const { currentUser } = useContext(AuthContext)
    const mockUser = {
        uid: '',
        email: '',
        displayName: '',
        username: '',
        status: '',
    }

    let imgURL = 'https://cdn-icons-png.flaticon.com/512/456/456212.png'
    if (currentUser && currentUser.avatar) {
        imgURL = currentUser.avatar
    }

    const user = currentUser || mockUser
    const email = user.email ? user.email : 'johndow@example.com'
    const displayName = user.displayName ? user.displayName : 'Johndow'
    const username = user.username ? user.username : 'Johndow'
    const [status, setStatus] = useState('')
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleURL = () => {}

    const handleStatusChanged = async () => {
        await updateStatus(status)
    }

    return (
        <div data-testid="profile-setting">
            <div className="profile">
                <h2 className="section-title" data-testid="my-profile">
                    My Profile
                </h2>
                <svg className="profile-banner" data-testid="profile-banner">
                    {/* <mask>
                        <rect fill='white' x='0' y='0' width='100%' height='100%'></rect>
                        <circle fill='black' cx='62' cy='122' r='46'></circle>
                    </mask> */}
                </svg>
                <div className="profile-pic-bg">
                    <div className="profilepic">
                        <img
                            className="profilepic__img"
                            src={imgURL}
                            alt="Profile"
                            data-testid="profile-img"
                        />
                        <div className="profilepic__content">
                            <div
                                className="profilepic__text"
                                onClick={handleShowModal}
                                data-testid="change-avatar-button"
                            >
                                Change Avatar
                            </div>
                        </div>
                    </div>
                    <span className="username-span" data-testid="display-name">
                        {displayName}
                    </span>
                </div>
                <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    centered
                    data-testid="change-avatar-modal"
                >
                    <Modal.Header closeButton>
                        <h4 className="modal-title" data-testid="modal-title">
                            Change Avatar
                        </h4>
                    </Modal.Header>
                    <Modal.Body>
                        <UploadWidget handleURL={handleURL} />
                    </Modal.Body>
                </Modal>
                <div className="profile-card">
                    <div className="profile-card-field-list">
                        <div className="field">
                            <div>
                                <h3>status</h3>
                                <input
                                    className={`form-control status-input ${theme === 'dark' ? 'dark text-light' : ''}`}
                                    placeholder={user.status as string}
                                    onChange={e => setStatus(e.target.value)}
                                />
                                <button className="save-button" onClick={handleStatusChanged}>
                                    save
                                </button>
                            </div>
                            <div className="username-row">
                                <h3 data-testid="username-heading">USERNAME</h3>
                                <div className="username-inner-row">
                                    <span data-testid="username">
                                        {username}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="field field-spacer">
                            <div className="email-row">
                                <h3 data-testid="email-heading">EMAIL</h3>
                                <SpanRevealButton
                                    data={email}
                                    type="email"
                                    data-testid="email"
                                />
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

            <div className="profile user-security" data-testid="user-security">
                <div>
                    <h2
                        className="section-title"
                        data-testid="password-authentication"
                    >
                        Password and Authentication
                    </h2>
                </div>
                <div className="children">
                    <div>
                        <button
                            className="button"
                            data-testid="change-password-button"
                        >
                            <div>Change Password</div>
                        </button>
                    </div>
                    <div>
                        <div className="flex">
                            <div
                                className="description title"
                                data-testid="two-fa-heading"
                            >
                                TWO-FACTOR AUTHENTICATION
                            </div>
                            <div
                                className="description"
                                style={{ marginBottom: 8 }}
                                data-testid="two-fa-description"
                            >
                                Protect your Habibi account with an extra layer
                                of security. Once configured, you'll be required
                                to enter both your password and an
                                authentication code from your mobile phone in
                                order to sign in.
                            </div>
                            <div>
                                <button
                                    className="button"
                                    data-testid="enable-2fa-button"
                                >
                                    <div data-testid="enable-2fa">
                                        Enable Two-Factor Auth
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSetting
