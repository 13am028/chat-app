import React, { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import { ChatContext, ChatContextProvider } from '../ChatContext'

describe('ChatContextProvider', () => {
    it('provides the chat data', () => {
        const MockChildComponent = () => {
            const { data } = useContext(ChatContext)
            return (
                <div>
                    <p data-testid="chat-id">{data.chatId}</p>
                    <p data-testid="user-id">{data.user.uid}</p>
                </div>
            )
        }

        render(
            <ChatContextProvider>
                <MockChildComponent />
            </ChatContextProvider>,
        )

        expect(screen.getByTestId('chat-id')).toHaveTextContent('null')
        expect(screen.getByTestId('user-id')).toHaveTextContent('')
    })
})
