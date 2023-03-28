import React from 'react'
import { render, screen } from '@testing-library/react'
import UploadWidget from '../UploadWidget'

describe('UploadWidget component', () => {
    it('renders without errors', () => {
        render(<UploadWidget />)
        expect(screen.getByTestId('upload-image-button')).toBeInTheDocument()
    })
})
