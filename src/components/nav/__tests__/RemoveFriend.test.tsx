import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import RemoveFriend from '../RemoveFriend'

describe('RemoveFriend', () => {
    it('renders the component', () => {
        render(<RemoveFriend />)
        fireEvent.click(screen.getByTestId('remove-friend-button'))
        const modalTitle = screen.getByText('Remove Friend')
        expect(modalTitle).toBeInTheDocument()
    })

    it('updates the username when input value changes', () => {
        render(<RemoveFriend />)
        fireEvent.click(screen.getByTestId('remove-friend-button'))
        const input = screen.getByPlaceholderText(
            'username',
        ) as HTMLInputElement
        fireEvent.change(input, { target: { value: 'testuser' } })
        expect(input.value).toBe('testuser')
    })

    it('calls the handleRemoveFriend function when Remove button is clicked', async () => {
        render(<RemoveFriend />)
        fireEvent.click(screen.getByTestId('remove-friend-button'))
        const input = screen.getByPlaceholderText('username')
        const removeButton = screen.getByText('Remove')
        fireEvent.change(input, { target: { value: 'testuser' } })
        fireEvent.click(removeButton)
    })

    it('calls the handleClose function when Close button is clicked', async () => {
        render(<RemoveFriend />)
        fireEvent.click(screen.getByTestId('remove-friend-button'))
        const closeButton = screen.getByText('Close')
        fireEvent.click(closeButton)
    })
})
