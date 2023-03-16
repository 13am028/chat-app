import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { addFriend } from '../../firebase';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
const AddFriendModal = () => {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    // const [friends, setFriends] = useState([]);
    const handleClose = () => {
        setUsername('');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const alertSuccessfully = (username: string) => {
        alert(`${username} has been successfully added as your friend.`);
    };

    const alertNotFound = () => {
        alert(`Username not found.`);
    };


    const handleAddFriend = async () => {
        // Check that the username is not empty
        if (username.trim() === '') {
            return;
        }
        await addFriend(username)
    };


    return (
        <div style={{ display: 'inline-block' }}>
            <Button variant="primary" onClick={handleShow} size="sm">
                <PersonAddAlt1Icon />
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: 'var(--theme-primary)' }}>
                    <Modal.Title>Add Friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input placeholder="username" type="text" value={username} onChange={handleUsernameChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddFriend}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export default AddFriendModal;
