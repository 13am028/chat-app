import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginBox from '../LoginBox'
import { logInWithEmailAndPassword } from '../../../firebase/auth'

jest.mock('../../../firebase/auth', () => ({
    logInWithEmailAndPassword: jest.fn(),
}))

describe('LoginBox', () => {
    it('renders login form', () => {
        render(<LoginBox />)
        const loginForm = screen.getByTestId('login-form')
        expect(loginForm).toBeInTheDocument()
    })

    it('can fill email input', () => {
        render(<LoginBox />)
        const emailInput = screen.getByTestId('email-input') as HTMLInputElement
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        expect(emailInput.value).toBe('test@example.com')
    })

    it('can fill password input', () => {
        render(<LoginBox />)
        const passwordInput = screen.getByTestId(
            'password-input',
        ) as HTMLInputElement
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        expect(passwordInput.value).toBe('password')
    })

    it('can toggle password visibility', () => {
        render(<LoginBox />)
        const showPasswordIcon = screen.getByTestId('show-password-icon')
        const passwordInput = screen.getByTestId(
            'password-input',
        ) as HTMLInputElement
        fireEvent.click(showPasswordIcon)
        expect(passwordInput.type).toBe('text')
        fireEvent.click(showPasswordIcon)
        expect(passwordInput.type).toBe('password')
    })

    it('can submit login form', async () => {
        render(<LoginBox />)
        const emailInput = screen.getByTestId('email-input')
        const passwordInput = screen.getByTestId('password-input')
        const loginButton = screen.getByTestId('login-submit-button')
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.click(loginButton)
        await waitFor(() =>
            expect(logInWithEmailAndPassword).toHaveBeenCalledTimes(1),
        )
    })
})
