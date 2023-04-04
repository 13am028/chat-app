// UnblockFriendModal.tsx
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { unblockFriend } from '../../firebase/friends/unblockFriend'

const UnblockFriendModal = ({ user, onClick }: any) => {
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
                <Modal.Header closeButton>
                    <Modal.Title>Unblock Friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to unblock {user.displayName}?
                </Modal.Body>
                <Modal.Footer>
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
