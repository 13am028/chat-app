import React from 'react'
import { render, screen } from '@testing-library/react'
import { AuthContextProvider, User } from '../AuthContext'

const mockUser: User = {
    uid: '123',
    email: 'test@test.com',
    displayName: 'Test User',
    username: 'testuser',
    avatar: 'https://example.com/avatar.png',
    status: '',
}

jest.mock('../../../firebase/utils', () => ({
    getUser: jest.fn(() => Promise.resolve(mockUser)),
}))

describe('AuthContextProvider', () => {
    it('should render children', async () => {
        render(
            <AuthContextProvider>
                <div data-testid="child">Test</div>
            </AuthContextProvider>,
        )

        expect(screen.getByTestId('child')).toBeInTheDocument()
    })
})
