import { fireEvent, render, screen } from '@testing-library/react'
import AccountDropdownMenu from './AccountDropdownMenu'
import { AuthContext } from '../context/AuthContext'

describe('AccountDropdownMenu', () => {
    it('should render the user avatar image', () => {
        const currentUser = {
            uid: '123',
            email: 'test@example.com',
            displayName: 'Test User',
            username: 'testuser',
            avatar: 'https://example.com/avatar.png',
        }
        render(
            <AuthContext.Provider value={{ currentUser }}>
                <AccountDropdownMenu />
            </AuthContext.Provider>,
        )
        const avatarImage = screen.getByTestId('profile-avatar')
        expect(avatarImage).toBeInTheDocument()
        expect(avatarImage).toHaveAttribute('src', currentUser.avatar)
    })

    it('should render the account dropdown menu', () => {
        const currentUser = {
            uid: '1',
            email: 'test@example.com',
            displayName: 'Test User',
            username: 'testuser',
            avatar: 'https://example.com/avatar.png',
        }

        render(
            <AuthContext.Provider value={{ currentUser }}>
                <AccountDropdownMenu />
            </AuthContext.Provider>,
        )

        const dropdownToggle = screen.getByTestId('account-dropdown-toggle')
        fireEvent.click(dropdownToggle)
        const dropdownMenu = screen.getByTestId('account-dropdown-menu')
        const profileLink = screen.getByTestId('profile-link')
        const settingsLink = screen.getByTestId('settings-link')
        const logoutLink = screen.getByTestId('logout-link')

        expect(dropdownToggle).toBeInTheDocument()
        expect(dropdownMenu).toBeInTheDocument()
        expect(profileLink).toBeInTheDocument()
        expect(settingsLink).toBeInTheDocument()
        expect(logoutLink).toBeInTheDocument()
    })
})
