import React from 'react';
import './Home.css'
import Nav from "../../components/nav/Nav";
import FriendStatusNav from "../../components/nav/FriendStatusNav";
import DirectMessageNav from "../../components/nav/DirectMessageNav";

const Home = () => {
    return (
        <div>
            <Nav />
            <DirectMessageNav />
            <FriendStatusNav />
            <div className='bg'></div>
        </div>
    );
};

export default Home;