import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import GroupMembers from '../GroupMembers'

describe('GroupMembers', () => {
    it('should render "Members" as the header', () => {
        render(
            <MemoryRouter
                initialEntries={[
                    { state: { groupId: 'groupId' }, pathname: '/members' },
                ]}
            >
                <GroupMembers />
            </MemoryRouter>,
        )
        expect(screen.getByText('Members')).toBeInTheDocument()
    })
})
