import React from 'react'
import { render } from '@testing-library/react'
import Home from '../Home'
import { MemoryRouter } from 'react-router-dom'

describe('Home', () => {
    test('renders components', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>,
        )
    })
})
