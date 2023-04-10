import React from 'react'
import { render, screen } from '@testing-library/react'
import BlockedFriendStatus from '../BlockedFriendStatus'

describe('BlockedFriendStatus', () => {
    const user = {
        avatar: 'https://example.com/avatar.jpg',
        displayName: 'John Doe',
        theme: 'light',
        uid: '123456',
    }

    test('renders blocked friend status', () => {
        render(<BlockedFriendStatus {...user} />)
        const blockedFriendStatus = screen.getByTestId('blocked-friend-status')
        expect(blockedFriendStatus).toBeInTheDocument()
    })

    test('renders friend display name', () => {
        render(<BlockedFriendStatus {...user} />)
        const friendName = screen.getByTestId('blocked-friend-name')
        const displayName = screen.getByTestId('blocked-friend-display-name')
        expect(friendName).toBeInTheDocument()
        expect(displayName).toBeInTheDocument()
        expect(displayName).toHaveTextContent(user.displayName)
    })

    test('renders "Blocked" status', () => {
        render(<BlockedFriendStatus {...user} />)
        const blockedStatus = screen.getByText('Blocked')
        expect(blockedStatus).toBeInTheDocument()
    })
})
