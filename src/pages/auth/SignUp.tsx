import React from 'react'
import styles from './auth.module.css'
import './SignUp.css'
import SignUpBox from '../../components/signup/SignUpBox'

const SignUp = (props: any) => {
    const { theme } = props

    return (
        <div className={styles.grid}>
            <div
                className={`background ${theme === 'dark' ? 'dark' : ''}`}
                data-testid="background"
            >
                <img src="/logo3_1.png" alt="logo" />
            </div>
            <div className="signup-form-container" data-testid="signup-box">
                <SignUpBox theme={theme} />
            </div>
        </div>
    )
}

export default SignUp
