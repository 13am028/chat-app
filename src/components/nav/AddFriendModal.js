import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

const AddFriendModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={{display: "inline-block"}}>
            <Button variant="primary" onClick={handleShow} size='sm'>
                Add Friend
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{backgroundColor: "var(--auth-bg)"}}>
                    <Modal.Title>Add Friend</Modal.Title>
                </Modal.Header>
                <Modal.Body><input placeholder='username' type='text' /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddFriendModal;