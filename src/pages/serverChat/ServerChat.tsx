import React, {useEffect, useState} from 'react';
import './ServerChat.css'
import Nav from "../../components/nav/Nav";
import FriendStatusNav from "../../components/nav/FriendStatusNav";
import Conversation from "../../components/Conversation";
import FriendStatus from "../../components/icons/FriendStatus";
import {auth, db, getFriends} from "../../firebase";
import {doc, onSnapshot} from "firebase/firestore";
import DirectMessageNav from "../../components/nav/DirectMessageNav";

const ServerChat = () => {

    /* Disable default context menu */
    const handleContextMenu = (event: any) => {
        event.preventDefault();
    };


    const [friends, setFriends] = useState<any>(null);
    useEffect(() => {
        // @ts-ignore
        return onSnapshot(doc(db, "friends", auth.currentUser.uid), (async () => {
            const users = await getFriends();
            setFriends(users);
        }))
    }, []);


    // let friendList: any =[];
    // if (friends) {
    //     friends.forEach((user: any) => {
    //         friendList.push(<FriendStatus key={user.uid} displayName={user.displayName} uid={user.uid}/>)
    //     })
    // }

    return (
        <div onContextMenu={handleContextMenu} className='navbar-group'>
            <div className='navbar-left'>
                <Nav />
                <DirectMessageNav />
            </div>
            <div className='navbar-right'>
                <FriendStatusNav />
                <div className='bg'>
                    <Conversation/>
                </div>
            </div>
        </div>
    );
};

export default ServerChat;