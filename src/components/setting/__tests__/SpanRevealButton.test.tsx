import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SpanRevealButton from '../SpanRevealButton'

describe('SpanRevealButton', () => {
    it('renders masked data by default', () => {
        render(<SpanRevealButton data="johndoe@example.com" type="email" />)
        expect(screen.getByTestId('user-data-inner-row')).toHaveTextContent(
            'john****@example.com',
        )
    })

    it('reveals data on click', () => {
        render(<SpanRevealButton data="johndoe@example.com" type="email" />)
        fireEvent.click(screen.getByTestId('reveal-button'))
        expect(screen.getByTestId('user-data-inner-row')).toHaveTextContent(
            'johndoe@example.com',
        )
    })

    it('hides data on second click', () => {
        render(<SpanRevealButton data="johndoe@example.com" type="email" />)
        fireEvent.click(screen.getByTestId('reveal-button'))
        fireEvent.click(screen.getByTestId('reveal-button'))
        expect(screen.getByTestId('user-data-inner-row')).toHaveTextContent(
            'john****@example.com',
        )
    })

    it('reveals data on mouseover', () => {
        render(<SpanRevealButton data="johndoe@example.com" type="email" />)
        fireEvent.mouseOver(screen.getByTestId('reveal-button'))
        // expect(screen.getByTestId('user-data-inner-row')).toHaveTextContent('johndoe@example.com')
    })

    it('hides data on mouseout', () => {
        render(<SpanRevealButton data="johndoe@example.com" type="email" />)
        fireEvent.mouseOver(screen.getByTestId('reveal-button'))
        fireEvent.mouseOut(screen.getByTestId('reveal-button'))
        expect(screen.getByTestId('user-data-inner-row')).toHaveTextContent(
            'john****@example.com',
        )
    })
})
