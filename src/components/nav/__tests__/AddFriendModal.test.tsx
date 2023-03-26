import { fireEvent, render, screen } from '@testing-library/react'
import AddFriendModal from '../AddFriendModal'

describe('AddFriendModal', () => {
    it('displays the username entered by the user', async () => {
        render(<AddFriendModal />)

        fireEvent.click(screen.getByTestId('add-friend-button'))
        const usernameInput = screen.getByPlaceholderText(
            'username',
        ) as HTMLButtonElement
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })

        expect(usernameInput.value).toBe('testuser')
    })

    it('calls handleAddFriend function when Add button is clicked', async () => {
        const mockHandleAddFriend = jest.fn()
        jest.spyOn(global, 'alert').mockImplementation(() => {})

        render(<AddFriendModal handleAddFriend={mockHandleAddFriend} />)
        fireEvent.click(screen.getByTestId('add-friend-button'))

        const usernameInput = screen.getByPlaceholderText('username')
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })

        const addButton = screen.getByTestId('add-friend-button')
        fireEvent.click(addButton)
    })

    it('handles add friend success scenario correctly', async () => {
        const mockHandleAddFriend = jest.fn(() => Promise.resolve('success'))
        jest.spyOn(global, 'alert').mockImplementation(() => {})

        render(<AddFriendModal handleAddFriend={mockHandleAddFriend} />)
        fireEvent.click(screen.getByTestId('add-friend-button'))

        const usernameInput = screen.getByPlaceholderText('username')
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })

        const addButton = screen.getByTestId('add-friend-button')
        fireEvent.click(addButton)
    })

    it('handles add friend not found scenario correctly', async () => {
        const mockHandleAddFriend = jest.fn(() => Promise.resolve('not_found'))
        jest.spyOn(global, 'alert').mockImplementation(() => {})

        render(<AddFriendModal handleAddFriend={mockHandleAddFriend} />)
        fireEvent.click(screen.getByTestId('add-friend-button'))

        const usernameInput = screen.getByPlaceholderText('username')
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })

        const addButton = screen.getByTestId('add-friend-button')
        fireEvent.click(addButton)
    })

    it('handles already friends scenario correctly', async () => {
        const mockHandleAddFriend = jest.fn(() =>
            Promise.resolve('already_friends'),
        )
        jest.spyOn(global, 'alert').mockImplementation(() => {})

        render(<AddFriendModal handleAddFriend={mockHandleAddFriend} />)
        fireEvent.click(screen.getByTestId('add-friend-button'))

        const usernameInput = screen.getByPlaceholderText('username')
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })

        const addButton = screen.getByTestId('add-friend-button')
        fireEvent.click(addButton)

        // expect(global.alert).toHaveBeenCalledWith('You are already friends with testuser.')
    })
})
