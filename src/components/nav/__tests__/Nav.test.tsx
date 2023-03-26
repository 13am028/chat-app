import React from 'react'
import { render, screen } from '@testing-library/react'
import Nav from '../Nav'
import { MemoryRouter } from 'react-router-dom'

describe('Nav', () => {
    it('renders the component', () => {
        render(
            <MemoryRouter>
                <Nav />
            </MemoryRouter>,
        )
        const navElement = screen.getByTestId('nav')
        expect(navElement).toBeInTheDocument()
    })
})
