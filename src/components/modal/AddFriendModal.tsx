import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import addFriendValidate from '../../functions/addFriendValidate'
import './Modal.css'

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

    const handleAddFriendAsync = async () => {
        await addFriendValidate(username)
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
                    {/*<div className="input-wrapper">*/}
                        {/*<div className="box">*/}
                        <input
                            placeholder="Enter a username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            data-testid="username-input"
                            className="form-control input-box"
                        />
                        {/*</div>*/}
                    {/*</div>*/}
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
