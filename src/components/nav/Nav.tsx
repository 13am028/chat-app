import React, {useContext, useEffect, useState} from 'react';
import GroupIcon from "../icons/GroupIcon";
import AddServerIcon from '../AddServerComponents/AddServerIcon';
import styles from './nav.module.css'
import { useNavigate } from "react-router-dom";
import { getGroups } from '../../firebase';
import {ChatContext} from "../context/ChatContext";

const Nav = () => {
    
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/home';
        navigate(path);
    }

    const [groups, setGroups] = useState<any>([]);
    useEffect(() => {
        (async () => {
            const userGroups = await getGroups();
            setGroups(userGroups);
        })();
    }, []);

    const handleNewGroupRender = async () => {
        const userGroups = await getGroups();
        setGroups(userGroups);
    }

    let groupList: any = [];
    if (groups) {
        groupList = groups.map((group: any) => (
            <div key={group.id} onClick={() => handleOnSelect(group)}>
                <GroupIcon imageUrl={group.groupPic} />
            </div>
        ));
    }


    const {dispatch} = useContext(ChatContext);
    const handleOnSelect = (group: any) => {
        dispatch({type: "CHANGE_GROUP", payload: group})
        navigate('/serverChat/')
    }


    return (
        <div className={styles.navLeft}>
            <div className={styles.nav_head} onClick={routeChange}>
                <GroupIcon />
            </div>
            <div className={styles.nav_content}>
                {groupList}
                <AddServerIcon onGroupCreate={handleNewGroupRender}/>
            </div>
        </div>
    );
};

export default Nav;