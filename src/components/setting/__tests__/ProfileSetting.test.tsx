import { render, screen, fireEvent } from '@testing-library/react'
import { AuthContext } from '../../context/AuthContext'
import ProfileSetting from '../ProfileSetting'

const currentUser = {
    uid: '1234',
    email: 'johndow@example.com',
    displayName: 'Johndow',
    username: 'Johndow',
    avatar: '',
    status: '',
}
const mockSetCurrentUser = jest.fn()
const mockAuthProps = {
    currentUser: currentUser,
    setCurrentUser: mockSetCurrentUser,
}

describe('ProfileSetting component', () => {
    test('renders my profile section', () => {
        render(
            <AuthContext.Provider value={mockAuthProps}>
                <ProfileSetting />
            </AuthContext.Provider>,
        )

        expect(screen.getByText('My Profile')).toBeInTheDocument()
        expect(screen.getByText('USERNAME')).toBeInTheDocument()
        expect(screen.getByText('EMAIL')).toBeInTheDocument()
    })

    test('renders change password button', () => {
        render(
            <AuthContext.Provider value={mockAuthProps}>
                <ProfileSetting />
            </AuthContext.Provider>,
        )

        expect(screen.getByTestId('change-password-button')).toBeInTheDocument()
    })

    test('renders enable two-factor auth button', () => {
        render(
            <AuthContext.Provider value={mockAuthProps}>
                <ProfileSetting />
            </AuthContext.Provider>,
        )

        expect(screen.getByTestId('enable-2fa-button')).toBeInTheDocument()
    })

    test('opens and closes change avatar modal', () => {
        render(
            <AuthContext.Provider value={mockAuthProps}>
                <ProfileSetting />
            </AuthContext.Provider>,
        )

        const changeAvatarButton = screen.getByTestId('change-avatar-button')
        fireEvent.click(changeAvatarButton)
        const modal = screen.getByTestId('change-avatar-modal')
        expect(modal).toBeInTheDocument()

        const closeButton = screen.getByLabelText('Close')
        fireEvent.click(closeButton)
    })
})
