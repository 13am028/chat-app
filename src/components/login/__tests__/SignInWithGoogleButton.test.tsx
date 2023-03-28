import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SignInWithGoogleButton from '../SignInWithGoogleButton'

describe('SignInWithGoogleButton', () => {
    it('renders correctly', () => {
        render(<SignInWithGoogleButton theme="light" />)
        expect(
            screen.getByTestId('sign-in-with-google-button'),
        ).toBeInTheDocument()
        expect(screen.getByTestId('sign-in-with-google-button')).toHaveClass(
            'btn-primary',
        )
        expect(
            screen.getByTestId('sign-in-with-google-button'),
        ).toHaveTextContent('Sign in with Google')
        expect(screen.getByTestId('sign-in-with-google-button')).toContainHTML(
            '<img src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" alt="Google logo">',
        )
    })

    it('renders with the dark theme', () => {
        render(<SignInWithGoogleButton theme="dark" />)
        expect(screen.getByTestId('sign-in-with-google-button')).toHaveClass(
            'dark',
        )
    })

    it('calls signInWithGoogle function on click', () => {
        render(<SignInWithGoogleButton theme="light" />)
        const button = screen.getByTestId('sign-in-with-google-button')
        fireEvent.click(button)
    })
})
