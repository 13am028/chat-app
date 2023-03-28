import { render, screen } from '@testing-library/react'
import CustomSVG from '../CustomSVG'

describe('CustomSVG', () => {
    it('should render the custom SVG component', () => {
        render(<CustomSVG />)
        const customSVGElement = screen.getByTestId('custom-svg')

        expect(customSVGElement).toBeInTheDocument()
    })
})
