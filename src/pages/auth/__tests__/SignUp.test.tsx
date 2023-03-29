import React from 'react'
import { render, screen } from '@testing-library/react'
import SignUp from '../SignUp'
import { MemoryRouter } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: jest.fn(),
}))

describe('SignUp', () => {
    it('should render the SignUpBox component', () => {
        //@ts-ignore
        useAuthState.mockReturnValueOnce([null, false])
        render(
            <MemoryRouter>
                <SignUp theme="light" />
            </MemoryRouter>,
        )
        const logoImage = screen.getByAltText('logo')
        const signUpBox = screen.getByTestId('signup-box')

        expect(logoImage).toBeInTheDocument()
        expect(signUpBox).toBeInTheDocument()
    })

    it('should add the "dark" class to the background div when theme is "dark"', () => {
        //@ts-ignore
        useAuthState.mockReturnValueOnce([null, false])
        render(
            <MemoryRouter>
                <SignUp theme="dark" />
            </MemoryRouter>,
        )
        const backgroundDiv = screen.getByTestId('background')
        expect(backgroundDiv).toHaveClass('dark')
    })

    it('should not add the "dark" class to the background div when theme is "light"', () => {
        //@ts-ignore
        useAuthState.mockReturnValueOnce([null, false])
        render(
            <MemoryRouter>
                <SignUp theme="light" />
            </MemoryRouter>,
        )
        const backgroundDiv = screen.getByTestId('background')
        expect(backgroundDiv).not.toHaveClass('dark')
    })
})
