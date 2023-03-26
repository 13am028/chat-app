import React from 'react'
import { render, screen } from '@testing-library/react'
import { AuthContextProvider } from '../AuthContext'

describe('AuthContextProvider', () => {
    it('renders children', () => {
        render(
            <AuthContextProvider>
                <div>Child Component</div>
            </AuthContextProvider>,
        )

        expect(screen.getByText('Child Component')).toBeInTheDocument()
    })
})
