import React, {useEffect, useState} from 'react';
import './Home.css'
import Nav from "../../components/nav/Nav";
import FriendStatusNav from "../../components/nav/FriendStatusNav";
import DirectMessageNav from "../../components/nav/DirectMessageNav";
import FriendStatus from "../../components/icons/FriendStatus";
import {auth, db, getFriends} from "../../firebase";
import {doc, onSnapshot} from "firebase/firestore";
const Home = () => {

    /* Disable default context menu */
    const handleContextMenu = (event: any) => {
        event.preventDefault();
    };


    const [friends, setFriends] = useState<any>(null);
    useEffect(() => {
        // @ts-ignore
        const unsub = onSnapshot(doc(db, "friends", auth.currentUser.uid), (async () => {
            const users = await getFriends();
            setFriends(users);
        }))
        return unsub
    }, []);


    let friendList: any =[];
    if (friends) {
        friends.forEach((user: any) => {
            friendList.push(<FriendStatus key={user.uid} displayName={user.displayName} uid={user.uid}/>)
        })
    }

    return (
        <div onContextMenu={handleContextMenu} className='navbar-group'>
            <div className='navbar-left'>
                <Nav />
                <DirectMessageNav />
            </div>
            <div className='navbar-right'>
                <FriendStatusNav />
                <div className='bg'>
                    {friendList}
                </div>
            </div>
        </div>
    );
};

export default Home;