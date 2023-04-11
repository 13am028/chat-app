import { OutlinedInput } from '@mui/material'
import Button from 'react-bootstrap/Button'
import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import './MessageTextField.css'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import {
    arrayUnion,
    doc,
    serverTimestamp,
    updateDoc,
    Timestamp,
    increment,
} from 'firebase/firestore'
import { db } from '../../firebase/init'
import uuid from 'react-uuid'
import EmojiPicker from 'emoji-picker-react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'

function MessageTextField(props: any) {
    const [message, setMessage] = useState('')
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const [showPicker, setShowPicker] = useState(false)

    const handleEmojiSelect = (emoji: any) => {
        setMessage(prevMessage => prevMessage + emoji.emoji)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        if (message === '') return
        await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text: message,
                senderId: currentUser?.uid,
                senderDisplayName: currentUser?.displayName,
                timestamp: Timestamp.now(),
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
        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.unreadCount']: increment(1),
        })
        setMessage('')
    }
    const handleChange = (event: any) => {
        setMessage(event.target.value)
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
                <Button
                    variant="contained"
                    className="submit-button"
                    size="sm"
                    onClick={() =>
                        setShowPicker(prevShowPicker => !prevShowPicker)
                    }
                    style={{ width: '80px' }}
                >
                    <EmojiEmotionsIcon />
                </Button>
                <Button
                    variant="contained"
                    className="submit-button"
                    size="lg"
                    type="submit"
                    data-testid="submit-button"
                    style={{ fontSize: '16px' }}
                >
                    Send
                </Button>
            </Form>
            {showPicker && (
                <div className="emojiPickerContainer">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </div>
            )}
        </div>
    )
}

export default MessageTextField
