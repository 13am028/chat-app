import React from 'react'
import { render, screen } from '@testing-library/react'
import FriendStatusNav from '../FriendStatusNav'

describe('FriendStatusNav component', () => {
    it('should render the component', () => {
        render(<FriendStatusNav />)

        expect(screen.getByText('Friends')).toBeInTheDocument()
        expect(screen.getByText('Pending')).toBeInTheDocument()
        expect(screen.getByText('Blocked')).toBeInTheDocument()
        expect(screen.getByTestId('add-friend-button')).toBeInTheDocument()
    })
})
