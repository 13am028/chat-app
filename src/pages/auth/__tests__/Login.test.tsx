import Login from '../Login'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: jest.fn(),
}))

describe('Login', () => {
    it('renders login form', () => {
        //@ts-ignore
        useAuthState.mockReturnValueOnce([null, false])
        render(
            <MemoryRouter>
                <Login theme="light" />
            </MemoryRouter>,
        )
    })
})
