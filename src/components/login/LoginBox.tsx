import React, { useState } from 'react'
import { logInWithEmailAndPassword } from '../../firebase/auth'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

const LoginBox = (props: any) => {
    const { theme } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await logInWithEmailAndPassword(email, password)
    }

    const loginFormClassNames = `login-form ${theme === 'dark' ? 'dark' : ''}`
    const emailInputClassNames = `form-control mt-1 ${
        theme === 'dark' ? 'dark text-light' : ''
    }`
    const passwordInputClassNames = `form-control mt-1 ${
        theme === 'dark' ? 'dark text-light' : ''
    }`
    const emailInputStyles = {
        backgroundColor: theme === 'dark' ? '#333' : '',
        borderColor: theme === 'dark' ? 'transparent' : '',
    }
    const passwordInputStyles = {
        backgroundColor: theme === 'dark' ? '#333' : '',
        borderColor: theme === 'dark' ? 'transparent' : '',
    }

    return (
        <form className={loginFormClassNames} data-testid="login-form">
            <div className="login-form-content">
                <h3 className="login-form-title">Sign In</h3>
                <div className="form-group-mt-3">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        className={emailInputClassNames}
                        style={emailInputStyles}
                        placeholder="Enter email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        data-testid="email-input"
                    />
                </div>
                <div className="form-group-mt-3 password-input-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className={passwordInputClassNames}
                        style={passwordInputStyles}
                        placeholder="Enter password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        data-testid="password-input"
                    />
                    <div
                        className="show-password-icon"
                        data-testid="show-password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <VisibilityOffIcon />
                        ) : (
                            <VisibilityIcon />
                        )}
                    </div>
                </div>

                <div className="d-grid gap-2 mt-3">
                    <button
                        type="submit"
                        className="login_submit"
                        onClick={handleSubmit}
                        data-testid="login-submit-button"
                    >
                        Login
                    </button>
                </div>
                <p className="forgot-password text-right mt-2">
                    <a href="#top" className="signup_link">
                        Forgot password?
                    </a>
                </p>
            </div>
        </form>
    )
}

export default LoginBox
