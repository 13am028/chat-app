import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

/**
 * Use is like this
 * <DataRevealButton data="johndoe@example.com" type="email" />
 */
interface Props {
    data: string
    type: 'email' | 'phone'
}

const SpanRevealButton: React.FC<Props> = ({ data, type }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = () => {
        setIsVisible(!isVisible)
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const maskedData = () => {
        switch (type) {
            case 'email':
                // how some first and domain with fixed asterisk
                return data.replace(
                    /^([^\n]{1,4})(.*)(@.*)$/,
                    (match, first, middle, last) => {
                        return `${first}${'****'}${last}`
                    },
                )
            case 'phone':
                // show only last 4 digit
                return data.replace(
                    /^(\d{6})(\d{4})$/,
                    (match, first, last) => {
                        return `******${last}`
                    },
                )
            default:
                return data
        }
    }

    const displayedData = isVisible ? data : maskedData()
    let visibilityIcon

    if (isVisible) {
        if (isHovered) {
            visibilityIcon = (
                <VisibilityOffIcon
                    onClick={handleClick}
                    onMouseLeave={handleMouseLeave}
                />
            )
        } else {
            visibilityIcon = <VisibilityIcon onMouseEnter={handleMouseEnter} />
        }
    } else if (isHovered) {
        visibilityIcon = (
            <VisibilityIcon
                onClick={handleClick}
                onMouseLeave={handleMouseLeave}
            />
        )
    } else {
        visibilityIcon = <VisibilityOffIcon onMouseEnter={handleMouseEnter} />
    }

    return (
        <div className="user-data-inner-row" data-testid="user-data-inner-row">
            <span data-testid="displayed-data">{displayedData}</span>
            <a
                href="#top"
                className="reveal-button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                data-testid="reveal-button"
            >
                {visibilityIcon}
            </a>
        </div>
    )
}

export default SpanRevealButton
