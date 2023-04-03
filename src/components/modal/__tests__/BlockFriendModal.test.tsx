import {
    fireEvent,
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import BlockFriendModal from '../BlockFriendModal'

describe('BlockFriendModal', () => {
    const user = { uid: 'test', displayName: 'test' }
    const onCLick = jest.fn()

    it('should render properly', () => {
        render(<BlockFriendModal user={user} onClick={onCLick} />)
        expect(screen.getByTestId('block-friend-button')).toBeInTheDocument()
    })

    it('should open the modal on button click', () => {
        render(<BlockFriendModal user={user} onClick={onCLick} />)
        const addButton = screen.getByTestId('block-friend-button')
        fireEvent.click(addButton)
        expect(screen.getByTestId('block-friend-modal')).toBeVisible()
    })

    it('should close the modal on close button click', async () => {
        render(<BlockFriendModal user={user} onClick={onCLick} />)
        const addButton = screen.getByTestId('block-friend-button')
        fireEvent.click(addButton)
        const addFriendModal = screen.getByTestId('block-friend-modal')
        const closeButton = screen.getByTestId('close-button')
        fireEvent.click(closeButton)
        await waitForElementToBeRemoved(addFriendModal)
        expect(screen.queryByTestId('block-friend-modal')).toBeNull()
    })
})
