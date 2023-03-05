import firebase from '../../firebase';

export function loadChatMessages(userId, friendId) {
    return firebase.firestore().collection('chats')
        .where('users', 'array-contains', userId)
        .where('users', 'array-contY' +
            'ains', friendId)
        .orderBy('createdAt')
        .onSnapshot(querySnapshot => {
            const messages = [];
            querySnapshot.forEach(doc => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            return messages;
        });
}

export function sendChatMessage(userId, friendId, message) {
    const chatId = `${userId}_${friendId}`;
    firebase.firestore().collection('chats').doc(chatId).collection('messages').add({
        userId,
        message,
        createdAt: new Date(),
    });
}
