import { OutlinedInput } from '@mui/material'
import Button from 'react-bootstrap/Button'
import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import './MessageTextField.css'
import { AuthContext } from './context/AuthContext'
import { ChatContext } from './context/ChatContext'
import {
    arrayUnion,
    doc,
    serverTimestamp,
    updateDoc,
    Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase/init'
import uuid from 'react-uuid'

function MessageTextField() {
    const [message, setMessage] = useState('')
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        if (message === '') return
        await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text: message,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
            }),
        })
        // @ts-ignore
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                message,
            },
            [data.chatId + '.date']: serverTimestamp(),
        })
        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                message,
            },
            [data.chatId + '.date']: serverTimestamp(),
        })
        setMessage('')
    }
    const handleChange = (event: any) => {
        setMessage(event.target.value)
    }

    return (
        <Form onSubmit={handleSubmit} className="send-message-form">
            <OutlinedInput
                value={message}
                onChange={handleChange}
                id="message"
                placeholder="Send a message"
                inputProps={{
                    'aria-label': 'message',
                    style: { color: 'var(--font-color)' },
                }}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },

                    backgroundColor: 'var(--theme-fourth)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                    width: '50%',
                }}
            />
            <Button
                variant="contained"
                style={{
                    backgroundColor: 'var(--theme-primary)',
                    color: 'var(--font-color)',
                    padding: '1rem',
                    width: '100px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                }}
                size="lg"
                type="submit"
            >
                Send
            </Button>
        </Form>
    )
}

export default MessageTextField
