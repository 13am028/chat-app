import React from 'react'
import { render, screen } from '@testing-library/react'
import UploadWidget from '../UploadWidget'

const handleURL = (url: string) => {}

describe('UploadWidget component', () => {
    it('renders without errors', () => {
        render(<UploadWidget handleURL={handleURL} />)
        expect(screen.getByTestId('upload-image-button')).toBeInTheDocument()
    })
})
