import React from 'react';
import './Home.css'
import Nav from "../../components/Nav";
import FriendStatusNav from "../../components/FriendStatusNav";
import FriendListNav from "../../components/FriendListNav";

const Home = () => {
    return (
        <div className='bg'>
            <Nav />
            <FriendListNav />
            <FriendStatusNav />
        </div>
    );
};

export default Home;