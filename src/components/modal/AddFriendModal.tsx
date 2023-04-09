import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import addFriendValidate from '../../functions/addFriendValidate'
import './Modal.css'

const AddFriendModal = ({
    theme,
    handleAddFriend,
}: {
    theme: any
    handleAddFriend?: () => void
}) => {
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

    const handleClose = () => {
        setUsername('')
        setMessage('')
        setShow(false)
    }

    const handleShow = () => setShow(true)

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setUsername(event.target.value)
    }

    const handleAddFriendAsync = async () => {
        const result = await addFriendValidate(username)
        if (result === 'success') {
            handleClose()
            if (handleAddFriend) {
                handleAddFriend()
            }
        } else if (result === 'not_found') {
            setMessage('Invalid username')
        } else if (result === 'already_friends') {
            setMessage('Already friends')
        } else if (result === 'empty_username') {
            setMessage('Please enter a username')
        }
    }

    return (
        <div style={{ display: 'inline-block' }}>
            <Button
                variant="primary"
                onClick={handleShow}
                size="sm"
                data-testid="add-friend-button"
            >
                <PersonAddAlt1Icon />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                data-testid="add-friend-modal"
            >
                <Modal.Header
                    closeButton
                    className={`modal-header ${theme === 'dark' ? 'dark' : ''}`}
                >
                    <Modal.Title
                        className={`modal-title ${
                            theme === 'dark' ? 'dark' : ''
                        }`}
                    >
                        Add Friend
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className={`modal-body ${theme === 'dark' ? 'dark' : ''}`}
                >
                    <input
                        placeholder="Enter a username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        data-testid="username-input"
                        className={`form-control input-box ${
                            theme === 'dark' ? 'dark text-light' : ''
                        }`}
                    />
                    {message && (
                        <div className="alert alert-warning mt-2" role="alert">
                            {message}
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer
                    className={`modal-footer ${theme === 'dark' ? 'dark' : ''}`}
                >
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        data-testid="close-button"
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddFriendAsync}
                        data-testid="add-button"
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddFriendModal
