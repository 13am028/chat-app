// import {useState, useEffect} from 'react';
// import {
//     auth,
//     db,
//     signInWithGoogle,
//     registerWithEmailAndPassword,
//     logout,
// } from "../firebase";
//
//
// function ChatApp() {
//     const [user, setUser] = useState(null);
//     const [message, setMessages] = useState([]);
//     const [newMessage, setMessage] = useState("");
//
//     useEffect(() => {
//         // Change in authentication handler
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             setUser(user);
//         });
//
//         return () => {
//             unsubscribe();
//         };
//     }, []);
//
//     useEffect(() => {
//         // Listen for messages in the messages DB
//         const unsubscribe = db.collection("messages").onSnapshot((snapshot) => {
//             setMessages(snapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }))
//             );
//         });
//         return () => {
//             unsubscribe();
//         };
//     }, []);
// }