import React from 'react'
import { render, screen } from '@testing-library/react'
import DMPage from '../DMPage'
import { ChatContext } from '../../../components/context/ChatContext'
import { MemoryRouter } from 'react-router-dom'

const mockDispatch = jest.fn()
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('DMPage', () => {
    test('renders the page with the correct elements', () => {
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
                },
            },
        }
        render(
            <ChatContext.Provider value={mockChatContextValue}>
                <MemoryRouter>
                    <DMPage />
                </MemoryRouter>
            </ChatContext.Provider>,
        )

        const dmPage = screen.getByTestId('dm-page')
        const nav = screen.getByTestId('nav')
        const displayName = screen.getByTestId('display-name')
        const header = screen.getByRole('heading', { name: 'bar' })

        expect(dmPage).toBeInTheDocument()
        expect(nav).toBeInTheDocument()
        expect(displayName).toBeInTheDocument()
        expect(header).toBeInTheDocument()
    })
})
