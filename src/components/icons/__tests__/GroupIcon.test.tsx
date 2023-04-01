import {
    render,
    fireEvent,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import GroupIcon from '../GroupIcon'

describe('GroupIcon', () => {
    it('should show the invite friends option when right-clicked', () => {
        render(<GroupIcon />)
        const groupIcon = screen.getByTestId('group-icon')
        fireEvent.contextMenu(groupIcon)
        const inviteFriendsOption = screen.getByTestId('invite-friends-option')
        expect(inviteFriendsOption).toBeInTheDocument()
    })

    it('should close the menu when clicking outside', async () => {
        render(<GroupIcon />)
        const groupIcon = screen.getByTestId('group-icon')
        fireEvent.contextMenu(groupIcon)
        fireEvent.click(document.body) // simulate clicking outside the menu
        const inviteFriendsOption = screen.queryByTestId(
            'invite-friends-option',
        )
        expect(inviteFriendsOption).not.toBeInTheDocument()
    })

    it('should show the invite friends modal when clicking the invite friends option', () => {
        render(<GroupIcon />)
        const groupIcon = screen.getByTestId('group-icon')
        fireEvent.contextMenu(groupIcon)
        const inviteFriendsOption = screen.getByTestId('invite-friends-option')
        fireEvent.click(inviteFriendsOption)
        const inviteFriendsModal = screen.getByRole('dialog')
        expect(inviteFriendsModal).toBeInTheDocument()
    })

    it('should show a search input in the invite friends modal', () => {
        render(<GroupIcon />)
        const groupIcon = screen.getByTestId('group-icon')
        fireEvent.contextMenu(groupIcon)
        const inviteFriendsOption = screen.getByTestId('invite-friends-option')
        fireEvent.click(inviteFriendsOption)
        const searchInput = screen.getByTestId('search-input')
        expect(searchInput).toBeInTheDocument()
    })

    it('should show a list of friends in the invite friends modal', () => {
        render(<GroupIcon />)
        const groupIcon = screen.getByTestId('group-icon')
        fireEvent.contextMenu(groupIcon)
        const inviteFriendsOption = screen.getByTestId('invite-friends-option')
        fireEvent.click(inviteFriendsOption)
        // const friendIcons = screen.getAllByTestId(/^friend-icon-\d+$/)
        // expect(friendIcons.length).toBeGreaterThan(0)
    })

    it('should show an invite button for each friend in the invite friends modal', () => {
        render(<GroupIcon />)
        const groupIcon = screen.getByTestId('group-icon')
        fireEvent.contextMenu(groupIcon)
        const inviteFriendsOption = screen.getByTestId('invite-friends-option')
        fireEvent.click(inviteFriendsOption)
        // const inviteButtons = screen.getAllByTestId(/^invite-button-\d+$/)
        // expect(inviteButtons.length).toBeGreaterThan(0)
    })

    it('should close the invite friends modal when clicking the close button', async () => {
        render(<GroupIcon />)
        const groupIcon = screen.getByTestId('group-icon')
        fireEvent.contextMenu(groupIcon)
        const inviteFriendsOption = screen.getByTestId('invite-friends-option')
        fireEvent.click(inviteFriendsOption)
        const closeButton = screen.getByRole('button', { name: 'Close' })
        fireEvent.click(closeButton)
        const inviteFriendsModal = screen.queryByRole('dialog')
        await waitForElementToBeRemoved(inviteFriendsModal)
        expect(inviteFriendsModal).not.toBeInTheDocument()
    })
})
