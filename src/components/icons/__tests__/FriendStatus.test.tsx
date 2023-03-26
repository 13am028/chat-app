import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import FriendStatus from '../FriendStatus'
import { MemoryRouter } from 'react-router-dom'

describe('FriendStatus', () => {
    const user = { uid: 'user2', displayName: 'Jane' }

    it('renders the component with user data', () => {
        render(
            <MemoryRouter>
                <FriendStatus {...user} />
            </MemoryRouter>,
        )

        expect(screen.getByTestId('friend-display-name')).toHaveTextContent(
            'Jane',
        )
    })

    it('handleOnSelect function is called when the component is clicked', async () => {
        const user = {
            uid: '123',
            displayName: 'Test User',
        }
        const dispatch = jest.fn()
        const navigate = jest.fn()
        render(
            <MemoryRouter>
                <FriendStatus
                    user={user}
                    dispatch={dispatch}
                    navigate={navigate}
                />
            </MemoryRouter>,
        )

        // Click the rendered component
        fireEvent.click(screen.getByTestId('friend-status'))
    })
})
