import React, { useEffect, useState } from 'react'
import GroupIcon from '../icons/GroupIcon'
import AddServerIcon from '../AddServerComponents/AddServerIcon'
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

    let groupList: any = []
    if (groups) {
        groups.forEach((group: any) => {
            groupList.push(
                <GroupIcon key={group.id} imageUrl={group.groupPic} />,
            )
        })
    }

    return (
        <div className={styles.navLeft}>
            <div className={styles.nav_head} onClick={routeChange}>
                <GroupIcon />
            </div>
            <div className={styles.nav_content}>
                {groupList}
                <AddServerIcon onGroupCreate={handleNewGroupRender} />
            </div>
        </div>
    )
}

export default Nav
