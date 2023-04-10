import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import FriendStatusNav from '../FriendStatusNav'

describe('FriendStatusNav', () => {
    test('renders FriendStatusNav component', () => {
        // Pass a mock function for setSelectedTab
        const mockSetSelectedTab = jest.fn()

        render(<FriendStatusNav setSelectedTab={mockSetSelectedTab} />)
        const friendTab = screen.getByTestId('friends-heading')
        const blockedTab = screen.getByTestId('blocked-heading')
        expect(friendTab).toBeInTheDocument()
        expect(blockedTab).toBeInTheDocument()
        fireEvent.click(friendTab)
        fireEvent.click(blockedTab)
    })
})
