import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'
import { blockFriend } from '../../firebase/friends/blockFriend'
import BlockIcon from '@mui/icons-material/Block'
import './Modal.css'

const BlockFriendModal = ({
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
        alert(`user ${displayName} has been blocked successfully`)
    }

    const handleBlockFriend = async () => {
        const result = await blockFriend(user)
        if (result === 'success') {
            alertSuccessfully(user.displayName)
        }
        handleClose()
    }
    return (
        <div style={{ display: 'inline-block' }} onClick={onClick}>
            <Button
                variant="danger"
                onClick={handleShow}
                size="sm"
                data-testid="block-friend-button"
                title="Block Friend"
            >
                <BlockIcon />
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                data-testid="block-friend-modal"
            >
                <Modal.Header closeButton className={`modal-header ${theme === 'dark' ? 'dark' : ''}`}>
                    <Modal.Title className={`modal-title ${theme === 'dark' ? 'dark' : ''}`}>Block Friend</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`modal-body ${theme === 'dark' ? 'dark' : ''}`}>
                    <p className="header-text">
                        Are you sure you want to block &nbsp;
                        <span style={{ fontWeight: 'bold' }}>
                            {user.displayName}
                        </span>
                        &nbsp; from your friends?
                    </p>
                </Modal.Body>
                <Modal.Footer className={`modal-footer ${theme === 'dark' ? 'dark' : ''}`}>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        data-testid="close-button"
                    >
                        Close
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleBlockFriend}
                        data-testid="block-friend-button"
                    >
                        Block
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BlockFriendModal
