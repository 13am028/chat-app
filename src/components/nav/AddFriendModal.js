import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { auth, db } from '../../firebase';
import {
    collection,
    doc,
    query,
    getDocs,
    where,
    updateDoc,
    arrayUnion,
    serverTimestamp,
    addDoc,
} from 'firebase/firestore';

const AddFriendModal = () => {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    // const [friends, setFriends] = useState([]);
    const handleClose = () => {
        setUsername('');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const alertSuccessfully = (username) => {
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

        // Get the current user's document from Firestore
        const user = auth.currentUser;
        const userRef = doc(db, 'users', user.uid);
        console.log('userRef:', userRef);

        //Check if the username exists in Firestore
        const querySnapshot = await getDocs(
            query(collection(db, 'users'), where('username', '==', username.trim()))
        );
        if (querySnapshot.empty) {
            alertNotFound();
            return;
        }

        // Add the friend to the user's friends collection
        const friendDoc = querySnapshot.docs[0];
        const friendsCollection = collection(db, 'friends');
        await addDoc(friendsCollection, {
            user: userRef,
            friend: friendDoc.ref,
            addedAt: serverTimestamp(),
        });

        // Add the user to the friend's friends collection
        const friendRef = friendDoc.ref;
        console.log('friendRef:', friendRef);
        await updateDoc(friendRef, {
            friends: arrayUnion(userRef),
        });

        alertSuccessfully(friendDoc.data().username);
        handleClose();
    };


    return (
        <div style={{ display: 'inline-block' }}>
            <Button variant="primary" onClick={handleShow} size="sm">
                Add Friend
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
