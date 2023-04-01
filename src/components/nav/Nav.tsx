import React, { useEffect, useState } from 'react'
import GroupIcon from '../icons/GroupIcon'
import AddServerIcon from '../addServer/AddServerIcon'
import styles from './nav.module.css'
import { useNavigate } from 'react-router-dom'
import { getGroups } from '../../firebase/groups/getGroups'

const Nav = () => {
    let navigate = useNavigate()
    const routeChange = () => {
        let path = '/home'
        navigate(path)
    }

    const [groups, setGroups] = useState<any>([])

    useEffect(() => {
        ;(async () => {
            const userGroups = await getGroups()
            setGroups(userGroups)
        })()
    }, [])

    const handleNewGroupRender = async () => {
        const userGroups = await getGroups()
        setGroups(userGroups)
    }

    /*TO DO: Add onclick for group icon*/
    let groupList: any = []
    if (groups) {
        groups.forEach((group: any) => {
            groupList.push(
                <GroupIcon groupId={group.id} imageUrl={group.groupPic} adminUID={group.adminUID} />,
            )
        })
    }

    return (
        <div className={styles.navLeft} data-testid="nav">
            <div
                className={styles.nav_head}
                onClick={routeChange}
                data-testid="nav-head"
            >
                <img
                    src="/favicon.png"
                    alt="logo"
                    style={{
                        width: '8vh',
                        marginLeft: '3px',
                        cursor: 'pointer',
                    }}
                />
            </div>
            <div className={styles.nav_content} data-testid="nav-content">
                {groupList}
                <AddServerIcon onGroupCreate={handleNewGroupRender} />
            </div>
        </div>
    )
}

export default Nav
