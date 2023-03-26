import React from 'react'
import { render, screen } from '@testing-library/react'
import FriendIcon from '../FriendIcon'

describe('FriendIcon component', () => {
    it('renders a friend icon with the correct class name', () => {
        render(<FriendIcon />)
        const friendIcon = screen.getByTestId('friend-icon')
        expect(friendIcon).toBeInTheDocument()
        expect(friendIcon).toHaveClass('friendIcon')
    })
})
