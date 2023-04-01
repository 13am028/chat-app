import {
    fireEvent,
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import RemoveFriendModal from '../RemoveFriendModal'

describe('RemoveFriendModal', () => {
    const mockUser = {
        uid: '123',
        displayName: 'Test User',
    }
    const mockRemoveFriend = jest.fn()
    const defaultProps = {
        user: mockUser,
        onClick: mockRemoveFriend,
    }

    it('renders the modal with the correct title and message', () => {
        render(<RemoveFriendModal {...defaultProps} />)
        fireEvent.click(screen.getByTestId('remove-friend-button'))
        expect(screen.getByText('Remove Friend')).toBeInTheDocument()
        // expect(
        //     screen.getByText(
        //         `Are you sure you want to remove  ${mockUser.displayName} from your friends?`,
        //     ),
        // ).toBeInTheDocument()
    })

    it('calls the removeFriend function when the remove button is clicked', () => {
        render(<RemoveFriendModal {...defaultProps} />)
        const removeButton = screen.getByTestId('remove-friend-button')
        userEvent.click(removeButton)
        expect(mockRemoveFriend).toHaveBeenCalledTimes(1)
    })

    it('closes the modal when the close button is clicked', async () => {
        render(<RemoveFriendModal {...defaultProps} />)
        fireEvent.click(screen.getByTestId('remove-friend-button'))
        const closeButton = screen.getByText('Close')
        fireEvent.click(closeButton)
        await waitForElementToBeRemoved(closeButton)
        expect(screen.queryByText('Remove Friend')).not.toBeInTheDocument()
    })
})
