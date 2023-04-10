import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Group from '../Group'

describe('Group', () => {
    // skip it for now
    it.skip('renders the group name', () => {
        HTMLElement.prototype.scrollIntoView = jest.fn()
        const groupName = 'Test Group'
        render(
            <MemoryRouter
                initialEntries={[{ state: { groupName }, pathname: '/' }]}
            >
                <Routes>
                    <Route path="/" element={<Group />} />
                </Routes>
            </MemoryRouter>,
        )
        expect(screen.getByText(groupName)).toBeInTheDocument()
    })
})
