import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../Home'
import { MemoryRouter } from 'react-router-dom'

describe('Home', () => {
    test('renders navigation components', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>,
        )
        expect(screen.getByTestId('nav')).toBeInTheDocument()
    })
})
