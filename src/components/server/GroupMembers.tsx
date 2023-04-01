import React, { useEffect, useState } from 'react'
import styles from '../icons/icons.module.css'
import './GroupMembers.css'
import { useLocation } from 'react-router-dom'
import getGroupMembers from '../../firebase/groups/getGroupMembers'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/init'

const GroupMembers = () => {
    const location = useLocation()

    const groupId = location.state.groupId
    const [groupMembers, setGroupMember] = useState<any>([])

    useEffect(() => {
        return onSnapshot(doc(db, 'groups', groupId), async () => {
            const members = await getGroupMembers(groupId)
            setGroupMember(members)
        })
    }, [groupId])

    return (
        <div className="navTopFirst">
            <div className="nav_head">
                <h4>Members</h4>
            </div>
            {groupMembers &&
                groupMembers.map((member: any) => (
                    <div
                        className={styles.friend}
                        key={member.uid}
                        style={{ cursor: 'default' }}
                    >
                        <div className={styles.friendIcon}></div>
                        <div className={styles.friendName}>
                            <p className={styles.name}>{member.displayName}</p>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default GroupMembers
