import React, { useEffect, useState } from 'react';
import GroupIcon from "../icons/GroupIcon";
import AddServerIcon from '../AddServerComponents/AddServerIcon';
import styles from './nav.module.css'
import { useNavigate } from "react-router-dom";
import { getGroups } from '../../firebase';

const Nav = () => {
    const [groups, setGroups] = useState<{ id: string, groupPic: string }[]>([]);

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/home';
        navigate(path);
    }

    useEffect(() => {
        const fetchGroups = async () => {
          
            const userGroups = await getGroups();
            // userGroups potentially return as 'undefined' type so we need add || [] so that if it undefined we will use defailt value of []
            setGroups(userGroups || []);
            
        };
        fetchGroups();
    }, [groups]);

    return (
        <div className={styles.navLeft}>
            <div className={styles.nav_head} onClick={routeChange}>
                <GroupIcon />
            </div>
            <div className={styles.nav_content}>
                    {
                    groups.map((group) => (
                        <GroupIcon key={group.id} imageUrl={group.groupPic} />
                    ))}
                <AddServerIcon />
            </div>
        </div>
    );
};

export default Nav;