import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'
import { removeFriend } from '../../firebase/friends/removeFriend'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'

const RemoveFriend = () => {
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')

    const handleClose = () => {
        setUsername('')
        setShow(false)
    }
    const handleShow = () => setShow(true)

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value)
    }

    const alertSuccessfully = (username: string) => {
        alert(`${username} has been successfully removed from your friends.`)
    }

    const alertNotFound = () => {
        alert(`Username not found.`)
    }

    const alertNotFriends = (username: string) => {
        alert(`You are not friends with ${username}.`)
    }

    const handleRemoveFriend = async () => {
        if (username.trim() === '') {
            return
        }
        const result = await removeFriend(username)
        if (result === 'success') {
            alertSuccessfully(username)
        } else if (result === 'not_found') {
            alertNotFound()
        } else {
            if (result === 'not_friends') {
                alertNotFriends(username)
            }
        }
        handleClose()
    }

    return (
        <div style={{ display: 'inline-block' }}>
            <Button
                variant="danger"
                onClick={handleShow}
                size="sm"
                data-testid="remove-friend-button"
            >
                <PersonRemoveAlt1Icon />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                data-testid="remove-friend-modal"
            >
                <Modal.Header
                    closeButton
                    style={{ backgroundColor: 'var(--theme-danger)' }}
                >
                    <Modal.Title>Remove Friend</Modal.Title>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleRemoveFriend}
                        data-testid="remove-friend-confirm-button"
                    >
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RemoveFriend
