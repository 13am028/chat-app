import { render, fireEvent, screen } from '@testing-library/react'
import SignUpBox from '../SignUpBox'
import { MemoryRouter } from 'react-router-dom'

describe('SignUpBox component', () => {
    it('should render all the input fields', () => {
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

    it('should update the state when user types in the inputs', () => {
        render(
            <MemoryRouter>
                <SignUpBox theme="light" />
            </MemoryRouter>,
        )
        fireEvent.change(screen.getByLabelText('Display Name'), {
            target: { value: 'John Doe' },
        })
        expect(screen.getByLabelText('Display Name')).toHaveValue('John Doe')

        fireEvent.change(screen.getByLabelText('Username'), {
            target: { value: 'johndoe' },
        })
        expect(screen.getByLabelText('Username')).toHaveValue('johndoe')

        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'johndoe@example.com' },
        })
        expect(screen.getByLabelText('Email')).toHaveValue(
            'johndoe@example.com',
        )

        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        })
        expect(screen.getByLabelText('Password')).toHaveValue('password123')

        fireEvent.change(screen.getByLabelText('Confirm Password'), {
            target: { value: 'password123' },
        })
        expect(screen.getByLabelText('Confirm Password')).toHaveValue(
            'password123',
        )
        fireEvent.submit(screen.getByTestId('signup-form'))
    })

    it('should toggle password visibility when show/hide password button is clicked', () => {
        render(
            <MemoryRouter>
                <SignUpBox theme="light" />
            </MemoryRouter>,
        )
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        })
        fireEvent.click(screen.getAllByTestId('show-password-button')[0])
        expect(screen.getByLabelText('Password')).toHaveAttribute(
            'type',
            'text',
        )
        fireEvent.click(screen.getAllByTestId('show-password-button')[0])
        expect(screen.getByLabelText('Password')).toHaveAttribute(
            'type',
            'password',
        )
    })
})
