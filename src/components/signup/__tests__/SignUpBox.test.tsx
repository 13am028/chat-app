import { render, screen } from '@testing-library/react'
import SignUpBox from '../SignUpBox'
import { MemoryRouter } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: jest.fn(),
}))

describe('SignUpBox component', () => {
    it('should render all the input fields', () => {
        //@ts-ignore
        useAuthState.mockReturnValueOnce([null, false])
        render(
            <MemoryRouter>
                <SignUpBox theme="light" />
            </MemoryRouter>,
        )
        expect(screen.getByLabelText('Display Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Username')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    })
})
