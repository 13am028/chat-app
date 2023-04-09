import { OutlinedInput } from '@mui/material'
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import './MessageTextField.css'

function GroupMessageTextField(props: any) {
    const [message, setMessage] = useState('')
    // const { currentUser } = useContext(AuthContext)
    // const { data } = useContext(ChatContext)

    const handleChange = (event: any) => {
        setMessage(event.target.value)
    }

    return (
        <Form className="send-message-form">
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
                data-testid="outlined-input"
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
                data-testid="submit-button"
            >
                Send
            </Button>
        </Form>
    )
}

export default GroupMessageTextField
