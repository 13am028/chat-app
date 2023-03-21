import React, {useEffect, useState} from 'react';
import './Home.css'
import Nav from "../../components/nav/Nav";
import FriendStatusNav from "../../components/nav/FriendStatusNav";
import DirectMessageNav from "../../components/nav/DirectMessageNav";
import FriendStatus from "../../components/icons/FriendStatus";
import {getFriends} from "../../firebase";

const Home = (props: { theme: any}) => {
    const { theme } = props;

    /* Disable default context menu */
    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    const [friends, setFriends] = useState(null);
    useEffect(() => {
        (async () => {
            const users = await getFriends();
            setFriends(users);
        })();
    }, []);

    let friendList=[];
    if (friends) {
        friends.forEach((user) => {
            friendList.push(<FriendStatus key={user.uid} displayName={user.displayName} uid={user.uid}/>)
        })
    }

    return (
        <div onContextMenu={handleContextMenu} className='navbar-group'>
            <div className='navbar-left'>
                <Nav theme={theme}/>
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