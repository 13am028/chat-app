import React from 'react'
import { render, screen } from '@testing-library/react'
import FriendStatusNav from '../FriendStatusNav'

describe('FriendStatusNav', () => {
    test('renders FriendStatusNav component', () => {
        // Pass a mock function for setSelectedTab
        const mockSetSelectedTab = jest.fn()

        render(<FriendStatusNav setSelectedTab={mockSetSelectedTab} />)
        expect(screen.getByTestId('friends-heading')).toBeInTheDocument()
        expect(screen.getByTestId('blocked-heading')).toBeInTheDocument()
    })
})
