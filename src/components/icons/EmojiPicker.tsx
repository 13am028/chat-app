import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import Button from 'react-bootstrap/Button'

type EmojiPickerComponentProps = {
    onEmojiSelect: (emoji: { emoji: string }) => void
}
function EmojiPickerComponent({ onEmojiSelect }: EmojiPickerComponentProps) {
    const [showPicker, setShowPicker] = useState(false)

    return (
        <>
            <Button
                variant="contained"
                className="submit-button"
                size="sm"
                onClick={() => setShowPicker(prevShowPicker => !prevShowPicker)}
                style={{ width: '80px' }}
            >
                <EmojiEmotionsIcon />
            </Button>
            {showPicker && (
                <div className="emojiPickerContainer">
                    <EmojiPicker onEmojiClick={onEmojiSelect} />
                </div>
            )}
        </>
    )
}

export default EmojiPickerComponent
