import { OutlinedInput } from '@mui/material'
import Button from 'react-bootstrap/Button'
import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import './MessageTextField.css'
import { AuthContext } from '../context/AuthContext'
import { doc, serverTimestamp, collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/init'

function GroupMessageTextField({ groupId }: { groupId: string }) {
    const [message, setMessage] = useState('')
    const { currentUser } = useContext(AuthContext)

    const handleChange = (event: any) => {
        setMessage(event.target.value)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const newMessage = {
            text: message,
            senderId: currentUser?.uid,
            timestamp: serverTimestamp(),
        }

        const groupChatRef = doc(db, 'groupChats', groupId)
        const messagesCollection = collection(groupChatRef, 'messages')
        await addDoc(messagesCollection, newMessage)
        setMessage('')
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
                className="outlined-input"
                data-testid="outlined-input"
            />
            <Button
                variant="contained"
                className="submit-button"
                size="lg"
                type="submit"
                data-testid="submit-button"
            >
                Send
            </Button>
        </Form>
    )
}

export default GroupMessageTextField
