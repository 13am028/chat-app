import React from 'react'
import Checkbox from '@mui/material/Checkbox'

const CheckboxCustom = (props: any) => {
    const { theme } = props
    return (
        <Checkbox
            style={{
                color: theme === 'dark' ? 'white' : '',
                marginLeft: -10,
            }}
            id="terms"
            required
        />
    )
}

export default CheckboxCustom
