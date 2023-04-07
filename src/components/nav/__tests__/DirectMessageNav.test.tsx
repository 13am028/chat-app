import React from 'react'
import { render, screen } from '@testing-library/react'
import { ChatContext } from '../../context/ChatContext'
import DirectMessageNav from '../DirectMessageNav'
import { MemoryRouter } from 'react-router-dom'

const mockDispatch = jest.fn()

describe('DirectMessageNav', () => {
    const mockChatContextValue = {
        dispatch: mockDispatch,
        data: {
            chatId: '1',
            user: {
                username: 'foo',
                uid: '1',
                email: 'test',
                avatar: '',
                displayName: 'bar',
                status: '',
            },
        },
    }

    it('renders the direct message nav', () => {
        render(
            <MemoryRouter>
                <ChatContext.Provider value={mockChatContextValue}>
                    <DirectMessageNav />
                </ChatContext.Provider>
            </MemoryRouter>,
        )
        expect(screen.getByText('DIRECT MESSAGES')).toBeInTheDocument()
    })
})
