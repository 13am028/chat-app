import React, { useContext, useEffect, useState } from 'react'
import GroupMessageTextField from '../message/GroupMessageTextField'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase/init'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Message from '../message/Message'

function GroupConversation() {
    const [messages, setMessages] = useState<any[]>([])
    const { currentUser } = useContext(AuthContext)

    const location = useLocation()
    const groupId = location.state.groupId

    useEffect(() => {
        const groupChatRef = doc(db, 'groupChats', groupId)
        const messagesCollection = collection(groupChatRef, 'messages')

        const unsubscribe = onSnapshot(
            query(messagesCollection, orderBy('timestamp')),
            snapshot => {
                setMessages(
                    snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
                )
            },
        )

        return () => {
            unsubscribe()
        }
    }, [groupId])

    return (
        <div className="bg">
            <Message messages={messages} currentUser={currentUser} />
            <GroupMessageTextField groupId={groupId} />
        </div>
    )
}

export default GroupConversation
