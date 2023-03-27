import React from 'react'
import {render, screen} from '@testing-library/react'
import Message from '../Message'

describe('Message component', () => {
    const currentUser = { uid: '123' }
    const messages = [
        { text: 'Hello', senderId: '123' },
        { text: 'Hi there', senderId: '456' },
    ]

    HTMLElement.prototype.scrollIntoView = jest.fn()

    it('renders messages', () => {
        render(<Message messages={messages} currentUser={currentUser} />)
        const message1 = screen.getByText('Hello')
        const message2 = screen.getByText('Hi there')
        expect(message1).toBeInTheDocument()
        expect(message2).toBeInTheDocument()
    })

    it('should scroll to the bottom when new messages are added', () => {
        const messages = [
            { senderId: '1', text: 'Hello' },
            { senderId: '2', text: 'Hi there' },
            { senderId: '1', text: 'How are you?' },
        ]
        render(<Message messages={messages} />)
        const bottomDiv = screen.getByTestId('bottom-div')
        expect(bottomDiv).toBeInTheDocument()
        expect(bottomDiv).toHaveProperty('scrollIntoView')
    })
})
