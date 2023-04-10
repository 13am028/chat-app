import React from 'react'
import { render, screen } from '@testing-library/react'
import FriendInvite from '../FriendInvite'

describe('FriendInvite', () => {
    const item = {
        uid: '1',
        displayName: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
    }
    const onInvite = jest.fn()

    beforeEach(() => {
        onInvite.mockClear()
    })

    it('should render display name and invite button', () => {
        render(<FriendInvite item={item} onInvite={onInvite} />)

        expect(screen.getByTestId('display-name')).toHaveTextContent('John Doe')
        expect(
            screen.getByTestId(`invite-button-${item.uid}`),
        ).toHaveTextContent('Invite')
    })
})
