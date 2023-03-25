import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import {Modal} from 'react-bootstrap'
import {blockFriend} from '../firebase/friends/blockFriend';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'

const BlockFriendModal = ({user}: { user: { uid: string; displayName: string } }) => {
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => setShow(true)

    const alertSuccessfully = (displayName: string) => {
        alert(`user ${displayName} has been blocked successfully`)
    }

    const handleBlockFriend = async () => {
        const result = await blockFriend(user)
        if (result === 'success') {
            alertSuccessfully(user.displayName);
        }
        handleClose()
    }
    return (
        <div style={{display: 'inline-block'}}>
            <Button variant="danger" onClick={handleShow} size="sm">
                <PersonRemoveAlt1Icon/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header
                    closeButton
                    style={{backgroundColor: 'var(--theme-danger)'}}
                >
                    <Modal.Title>Block Friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to block {user.displayName} from your friends?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleBlockFriend}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BlockFriendModal;