import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'
import { removeFriend } from '../../firebase/friends/removeFriend'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'
import './Modal.css'

const RemoveFriendModal = ({
    theme,
    user,
    onClick,
}: {
    theme: any
    user: { uid: string; displayName: string }
    onClick: (e: React.MouseEvent) => void
}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true)

    const alertSuccessfully = (displayName: string) => {
        alert(`${displayName} has been successfully removed from your friends.`)
    }

    const alertNotFriends = (displayName: string) => {
        alert(`You are not friends with ${displayName}.`)
    }

    const handleRemoveFriend = async () => {
        const result = await removeFriend(user)
        if (result === 'success') {
            alertSuccessfully(user.displayName)
        } else if (result === 'not_friends') {
            alertNotFriends(user.displayName)
        }
        handleClose()
    }

    return (
        <div style={{ display: 'inline-block' }} onClick={onClick}>
            <Button
                variant="warning"
                onClick={handleShow}
                size="sm"
                data-testid="remove-friend-button"
                title="Remove Friend"
            >
                <PersonRemoveAlt1Icon />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                data-testid="remove-friend-modal"
                className="remove-friend-modal-dialog"
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
                        Remove Friend
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className={`modal-body ${theme === 'dark' ? 'dark' : ''}`}
                >
                    <p className="header-text">
                        Are you sure you want to remove{' '}
                        <span style={{ fontWeight: 'bold' }}>
                            {user.displayName}
                        </span>{' '}
                        from your friends?
                    </p>
                </Modal.Body>
                <Modal.Footer
                    className={`modal-footer ${theme === 'dark' ? 'dark' : ''}`}
                >
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleRemoveFriend}
                        data-testid="confirm-remove-friend-button"
                    >
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RemoveFriendModal
