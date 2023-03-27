import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'
import { addFriend } from '../../firebase/friends/addFriends'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'

const AddFriendModal = ({
    handleAddFriend,
}: {
    handleAddFriend?: () => void
}) => {
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')

    const handleClose = () => {
        setUsername('')
        setShow(false)
    }

    const handleShow = () => setShow(true)

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setUsername(event.target.value)
    }

    const alertSuccessfully = (username: string) => {
        alert(`${username} has been successfully added as your friend.`)
    }

    const alertNotFound = () => {
        alert(`Username not found.`)
    }

    const alertAlreadyFriends = (username: string) => {
        alert(`You are already friends with ${username}.`)
    }

    const handleAddFriendAsync = async () => {
        // Check that the username is not empty
        if (username.trim() === '') {
            return
        }

        const result = await addFriend(username)

        if (result === 'success') {
            alertSuccessfully(username)
        } else if (result === 'not_found') {
            alertNotFound()
        } else if (result === 'already_friends') {
            alertAlreadyFriends(username)
        }

        handleClose()

        if (handleAddFriend) {
            handleAddFriend()
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
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                >
                    <Modal.Title>Add Friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        placeholder="username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        data-testid="username-input"
                    />
                </Modal.Body>
                <Modal.Footer>
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
