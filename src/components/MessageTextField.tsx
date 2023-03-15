import {OutlinedInput} from "@mui/material";
import Button from "react-bootstrap/Button";
import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import './MessageTextField.css'

function MessageTextField(props: any) {
    const [message, setMessage] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.onSendMessage({
            sender: 'You',
            text: message,
        });
        setMessage('');
    };

    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit} className="send-message-form">
            <OutlinedInput
                value={message}
                onChange={handleChange}
                id="message"
                placeholder="Send a message"
                inputProps={{
                    'aria-label': 'message',
                    'style': {color: 'var(--font-color)'}
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
                    width: '50%'
                }}
            />
            <Button variant="contained"
                    style={{
                        backgroundColor: 'var(--theme-primary)',
                        color: 'var(--font-color)',
                        padding: '1rem',
                        width: '100px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                    }}
                    size='lg'
                    type='submit'
            >
                Send
            </Button>
        </Form>
    );
}

export default MessageTextField;
