import React from 'react'
import { render, screen } from '@testing-library/react'
import SignUp from '../SignUp'
import { MemoryRouter } from 'react-router-dom'

describe('SignUp', () => {
    it('should render the logo image', () => {
        render(
            <MemoryRouter>
                <SignUp theme="light" />
            </MemoryRouter>,
        )
        const logoImage = screen.getByAltText('logo')
        expect(logoImage).toBeInTheDocument()
    })

    it('should render the SignUpBox component', () => {
        render(
            <MemoryRouter>
                <SignUp theme="light" />
            </MemoryRouter>,
        )
        const signUpBox = screen.getByTestId('signup-box')
        expect(signUpBox).toBeInTheDocument()
    })

    it('should add the "dark" class to the background div when theme is "dark"', () => {
        render(
            <MemoryRouter>
                <SignUp theme="dark" />
            </MemoryRouter>,
        )
        const backgroundDiv = screen.getByTestId('background')
        expect(backgroundDiv).toHaveClass('dark')
    })

    it('should not add the "dark" class to the background div when theme is "light"', () => {
        render(
            <MemoryRouter>
                <SignUp theme="light" />
            </MemoryRouter>,
        )
        const backgroundDiv = screen.getByTestId('background')
        expect(backgroundDiv).not.toHaveClass('dark')
    })
})
