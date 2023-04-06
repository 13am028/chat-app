// UnblockFriendModal.tsx
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { unblockFriend } from '../../firebase/friends/friendActions'

const UnblockFriendModal = ({
    theme,
    user,
    onClick,
}: {
    theme: any
    user: { uid: string; displayName: string }
    onClick: (e: React.MouseEvent) => void
}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleUnblock = async () => {
        await unblockFriend(user)
        handleClose()
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Unblock
            </Button>

            <Modal show={show} onHide={handleClose} onClick={onClick}>
                <Modal.Header
                    closeButton
                    className={`modal-header ${theme === 'dark' ? 'dark' : ''}`}
                >
                    <Modal.Title
                        className={`modal-title ${
                            theme === 'dark' ? 'dark' : ''
                        }`}
                    >
                        Unblock Friend
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className={`modal-body ${theme === 'dark' ? 'dark' : ''}`}
                >
                    <p className="header-text">
                        Are you sure you want to unblock{' '}
                        <span style={{ fontWeight: 'bold' }}>
                            {user.displayName}?
                        </span>
                    </p>
                </Modal.Body>
                <Modal.Footer
                    className={`modal-footer ${theme === 'dark' ? 'dark' : ''}`}
                >
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUnblock}>
                        Unblock
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UnblockFriendModal
