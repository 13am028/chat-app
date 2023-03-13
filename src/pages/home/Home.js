import React from 'react';
import './Home.css'
import Nav from "../../components/nav/Nav";
import FriendStatusNav from "../../components/nav/FriendStatusNav";
import DirectMessageNav from "../../components/nav/DirectMessageNav";

const Home = () => {

    /* Disable default context menu */
    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    return (
        <div onContextMenu={handleContextMenu} className='navbar-group'>
            <div className='navbar-left'>
                <Nav />
                <DirectMessageNav />
            </div>
            <div className='navbar-right'>
                <FriendStatusNav />
                <div className='bg'></div>
            </div>
        </div>
    );
};

export default Home;