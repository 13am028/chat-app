import { OutlinedInput } from '@mui/material'
import Button from 'react-bootstrap/Button'
import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import './MessageTextField.css'
import { AuthContext } from '../context/AuthContext'
import { doc, serverTimestamp, collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/init'
import EmojiPickerComponent from '../icons/EmojiPicker'

function GroupMessageTextField({ groupId }: { groupId: string }) {
    const [message, setMessage] = useState('')
    const { currentUser } = useContext(AuthContext)

    const handleChange = (event: any) => {
        setMessage(event.target.value)
    }

    const handleEmojiSelect = (emoji: any) => {
        setMessage(prevMessage => prevMessage + emoji.emoji)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        if (message === '') return
        const newMessage = {
            text: message,
            senderId: currentUser?.uid,
            senderDisplayName: currentUser?.displayName,
            timestamp: serverTimestamp(),
        }

        const groupChatRef = doc(db, 'groupChats', groupId)
        const messagesCollection = collection(groupChatRef, 'messages')
        await addDoc(messagesCollection, newMessage)
        setMessage('')
    }

    return (
        <div className="sendMessageFormContainer">
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
                <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />
                <Button
                    variant="contained"
                    className="submit-button"
                    size="sm"
                    type="submit"
                    data-testid="submit-button"
                    style={{ fontSize: '16px' }}
                >
                    Send
                </Button>
            </Form>
        </div>
    )
}

export default GroupMessageTextField
