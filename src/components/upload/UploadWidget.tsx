import React from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { updateAvatar } from '../../firebase/utils'

const UploadWidget = ({ handleURL }: { handleURL: (url: string) => void }) => {
    const showWidget = () => {
        let widget = (window as any).cloudinary.createUploadWidget(
            {
                cloudName: 'du690nkqz',
                uploadPreset: 'ocwggr1b',
            },
            async (error: any, result: any) => {
                if (!error && result && result.event === 'success') {
                    const url: string = result.info.url
                    await updateAvatar(url)
                    handleURL(url)
                }
            },
        )
        widget.open()
    }

    return (
        <div
            className="modal-box modal-upload"
            onClick={showWidget}
            data-testid="upload-image-button"
        >
            <div className="modal-icon">
                <i className="fas fa-upload"></i>
                <AddPhotoAlternateIcon style={{ fontSize: 40 }} />
            </div>
            <div className="modal-label">Upload Image</div>
        </div>
    )
}

export default UploadWidget
