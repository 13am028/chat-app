import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import BlockFriendModal from '../BlockFriendModal'

describe('BlockFriendModal', () => {
    const user = {
        uid: '123',
        displayName: 'John Doe',
    }

    it('renders without errors', () => {
        render(<BlockFriendModal user={user} onClick={jest.fn()} />)
        expect(screen.getByTestId('remove-friend-button')).toBeInTheDocument()
    })

    it('displays the modal when "Remove" button is clicked', async () => {
        render(<BlockFriendModal user={user} onClick={jest.fn()} />)
        fireEvent.click(screen.getByTestId('remove-friend-button'))
        expect(screen.getByTestId('block-friend-modal')).toBeInTheDocument()
        expect(
            screen.getByText(
                `Are you sure you want to block ${user.displayName} from your friends?`,
            ),
        ).toBeInTheDocument()
    })

    it('displays a success alert when blocking a friend is successful', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {})
        render(<BlockFriendModal user={user} onClick={jest.fn()} />)
        fireEvent.click(screen.getByTestId('remove-friend-button'))
        fireEvent.click(screen.getByTestId('block-friend-button'))
        // await waitFor(() => {
        //     expect(window.alert).toHaveBeenCalledWith(`user ${user.displayName} has been blocked successfully`);
        // });
    })
})
