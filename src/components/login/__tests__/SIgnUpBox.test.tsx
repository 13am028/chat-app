import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SignUpBox from '../SignUpBox'

describe('SignUpBox', () => {
    it('renders the signup text', () => {
        render(
            <BrowserRouter>
                <SignUpBox theme="light" />
            </BrowserRouter>,
        )

        const signUpText = screen.getByText(/Don't have an account?/i)
        expect(signUpText).toBeInTheDocument()
    })

    it('renders the signup link', () => {
        render(
            <BrowserRouter>
                <SignUpBox theme="light" />
            </BrowserRouter>,
        )

        const signUpLink = screen.getByRole('link', { name: /Sign up/i })
        expect(signUpLink).toBeInTheDocument()
        expect(signUpLink.getAttribute('href')).toBe('/signup')
    })

    it('renders the dark theme', () => {
        render(
            <BrowserRouter>
                <SignUpBox theme="dark" />
            </BrowserRouter>,
        )

        const signUpBox = screen.getByTestId('signup-box')
        expect(signUpBox).toHaveClass('dark')
    })
})
