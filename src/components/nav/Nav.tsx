import React, { useEffect, useState } from 'react'
import GroupIcon from '../icons/GroupIcon'
import AddServerIcon from '../addServer/AddServerIcon'
import styles from './nav.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getGroups } from '../../firebase/groups/getGroups'

const Nav = (props: any) => {
    const { theme } = props
    let navigate = useNavigate()
    let location = useLocation()

    const toHome = () => {
        let path = '/home'
        navigate(path)
    }

    const toGroup = (groupId: string, groupName: string, groupMembers: any) => {
        let path = '/server-chat'
        navigate(path, { state: { groupId, groupName, groupMembers } })
    }

    const [groups, setGroups] = useState<any>([])
    const [show, setShow] = useState<boolean>(true)

    useEffect(() => {
        ;(async () => {
            const userGroups = await getGroups()
            setGroups(userGroups)
        })()
        if (['/login', '/signup', '/setting'].includes(location.pathname))
            setShow(false)
        else setShow(true)
    }, [location])

    const handleNewGroupRender = async () => {
        const userGroups = await getGroups()
        setGroups(userGroups)
    }

    let groupList: any = []
    if (groups) {
        groups.forEach((group: any) => {
            groupList.push(
                <div
                    onClick={() =>
                        toGroup(group.id, group.groupName, group.groupMembers)
                    }
                >
                    <GroupIcon
                        theme={theme}
                        groupId={group.id}
                        imageUrl={group.groupPic}
                        adminUID={group.adminUID}
                    />
                </div>,
            )
        })
    }

    return show ? (
        <div className={styles.navLeft} data-testid="nav">
            <div
                className={styles.nav_head}
                onClick={toHome}
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
    ) : null
}

export default Nav
