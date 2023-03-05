import React, {useState, useEffect} from 'react';
// import firebaseInit 
import {firebase} from '../../firebase'

export function addFriendByEmail(userId, friendEmail) {
    firebase.firestore().collection('users')
        .where('email', '==', friendEmail)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                const friendId = querySnapshot.docs[0].id;
                const friendsRef = firebase.firestore().collection('users').doc(userId).collection('friends');
                friendsRef.doc(friendId).set({ id: friendId });
            }
        });
}

export function loadFriends(userId) {
    return firebase.firestore().collection('users').doc(userId)
        .onSnapshot(doc => {
            return doc.data().friends || [];
        });
}


