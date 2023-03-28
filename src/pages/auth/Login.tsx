import styles from './auth.module.css'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/init'
import LoginBox from '../../components/login/LoginBox'
import SignInWithGoogleButton from '../../components/login/SignInWithGoogleButton'
import SignUpBox from '../../components/login/SignUpBox'
import './Login.css'

const Login = (props: any) => {
    const { theme } = props
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return
        }
        if (user) navigate('/home')
    }, [user, loading, navigate])

    return (
        <div className={styles.grid}>
            <div className={`background ${theme === 'dark' ? 'dark' : ''}`}>
                <img src="/logo3_1.png" alt="logo" />
            </div>
            <div className="login-form-container">
                <LoginBox theme={theme} />
                <SignInWithGoogleButton theme={theme} />
                <div className="divider">
                    <hr className="divider-line" />
                    <span className="divider-text">or</span>
                    <hr className="divider-line" />
                </div>
                <SignUpBox theme={theme} />
            </div>
        </div>
    )
}

export default Login
