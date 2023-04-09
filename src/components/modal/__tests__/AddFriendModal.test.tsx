import {
    fireEvent,
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import AddFriendModal from '../AddFriendModal'

describe('AddFriendModal', () => {
    it('should render properly', () => {
        render(<AddFriendModal theme="dark" />)
        expect(screen.getByTestId('add-friend-button')).toBeInTheDocument()
    })

    it('should open the modal on button click', () => {
        render(<AddFriendModal theme="dark" />)
        const addButton = screen.getByTestId('add-friend-button')
        fireEvent.click(addButton)
        expect(screen.getByTestId('add-friend-modal')).toBeVisible()
    })

    it('should close the modal on close button click', async () => {
        render(<AddFriendModal theme="dark" />)
        const addButton = screen.getByTestId('add-friend-button')
        fireEvent.click(addButton)
        const addFriendModal = screen.getByTestId('add-friend-modal')
        const closeButton = screen.getByTestId('close-button')
        fireEvent.click(closeButton)
        await waitForElementToBeRemoved(addFriendModal)
        expect(screen.queryByTestId('add-friend-modal')).toBeNull()
    })

    // it('should remove modal after add friend', async () => {
    //     render(<AddFriendModal theme="dark" />)
    //     const addButton = screen.getByTestId('add-friend-button')
    //     fireEvent.click(addButton)
    //     const usernameInput = screen.getByTestId('username-input')
    //     fireEvent.change(usernameInput, 'test')
    //     const addFriendButton = screen.getByTestId('add-button')
    //     fireEvent.click(addFriendButton)
    //     await waitForElementToBeRemoved(usernameInput)
    // })
})
