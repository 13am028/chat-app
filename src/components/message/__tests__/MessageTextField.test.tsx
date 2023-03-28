import { render, fireEvent, screen } from '@testing-library/react'
import MessageTextField from '../MessageTextField'

describe('MessageTextField', () => {
    it('should render', async () => {
        render(<MessageTextField />)
        const button = screen.getByTestId('submit-button')
        fireEvent.click(button)
    })
})
