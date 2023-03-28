import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/init'
import { useNavigate } from 'react-router-dom'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckboxCustom from './CheckboxCustom'
import signup from '../../functions/register'

const SignUpBox = (props: any) => {
    const { theme } = props
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [username, setUsername] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [cShowPassword, setCShowPassword] = useState(false)

    const formClasses = `signup__form ${theme === 'dark' ? 'dark' : ''}`
    const inputClasses = `form-control mt-1 ${
        theme === 'dark' ? 'dark text-light' : ''
    }`
    const instructionsClasses = `signup__instructions ${
        theme === 'dark' ? 'dark' : ''
    }`
    const passwordInputClassNames = `form-control mt-1 ${
        theme === 'dark' ? 'dark text-light' : ''
    }`

    const passwordInputStyles = {
        backgroundColor: theme === 'dark' ? '#333' : '',
        borderColor: theme === 'dark' ? 'transparent' : '',
    }
    const darkStyles = {
        backgroundColor: '#333',
        borderColor: 'transparent',
        color: 'white',
    }

    const lightStyles = {
        backgroundColor: '',
        borderColor: '',
        color: '',
    }

    useEffect(() => {
        if (loading) return
        if (user) navigate('/login')
    })

    const register = async (e: any) => {
        e.preventDefault()
        await signup(displayName, username, email, password, cPassword)
    }

    return (
        <form className={formClasses}>
            <div className="form-group-mt-3">
                <h1 className="signup__title">
                    Sign Up to chat with your friends and family
                </h1>
                {[
                    {
                        label: 'Display Name',
                        id: 'displayName',
                        value: displayName,
                        onChange: (event: any) =>
                            setDisplayName(event.target.value),
                        type: 'text',
                    },
                    {
                        label: 'Username',
                        id: 'username',
                        value: username,
                        onChange: (event: any) =>
                            setUsername(event.target.value),
                        type: 'text',
                    },
                    {
                        label: 'Email',
                        id: 'email',
                        value: email,
                        onChange: (event: any) => setEmail(event.target.value),
                        type: 'email',
                    },
                    {
                        label: 'Password',
                        id: 'password',
                        value: password,
                        onChange: (event: any) =>
                            setPassword(event.target.value),
                        type: 'password',
                    },
                    {
                        label: 'Confirm Password',
                        id: 'confirm-password',
                        value: cPassword,
                        onChange: (event: any) =>
                            setCPassword(event.target.value),
                        type: 'password',
                    },
                ].map((inputProps, index) => (
                    <div className="form-group-mt-3" key={index}>
                        <label
                            htmlFor={inputProps.id}
                            className="signup__label"
                        >
                            {inputProps.label}
                        </label>
                        {inputProps.id === 'password' ||
                        inputProps.id === 'confirm-password' ? (
                            <div className="password-input-container">
                                <input
                                    type={
                                        inputProps.id === 'password'
                                            ? showPassword
                                                ? 'text'
                                                : 'password'
                                            : cShowPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    id={inputProps.id}
                                    className={passwordInputClassNames}
                                    style={passwordInputStyles}
                                    required
                                    value={
                                        inputProps.id === 'password'
                                            ? password
                                            : cPassword
                                    }
                                    onChange={
                                        inputProps.id === 'password'
                                            ? e => setPassword(e.target.value)
                                            : e => setCPassword(e.target.value)
                                    }
                                />
                                <div
                                    className="show-password-cpassword-icon"
                                    onClick={
                                        inputProps.id === 'password'
                                            ? () =>
                                                  setShowPassword(!showPassword)
                                            : () =>
                                                  setCShowPassword(
                                                      !cShowPassword,
                                                  )
                                    }
                                >
                                    {inputProps.id === 'password' ? (
                                        showPassword ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )
                                    ) : cShowPassword ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <input
                                type={inputProps.type}
                                id={inputProps.id}
                                className={inputClasses}
                                style={
                                    theme === 'dark' ? darkStyles : lightStyles
                                }
                                value={inputProps.value}
                                onChange={inputProps.onChange}
                                required
                            />
                        )}
                        {inputProps.id === 'email' && (
                            <div className={instructionsClasses}>
                                You can use letters, numbers & periods
                            </div>
                        )}
                        {inputProps.id === 'password' && (
                            <div className={instructionsClasses}>
                                Use 8 or more characters with a mix of letters,
                                numbers & symbols
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="form-group-mt-3">
                <label
                    htmlFor="terms"
                    className="signup__label signup__label--checkbox"
                >
                    <CheckboxCustom theme={theme} />
                    <span className="signup__checkbox-label">
                        {' '}
                        I agree to the{' '}
                        <a href="#top" className="signup__link">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#top" className="signup__link">
                            Privacy Policy
                        </a>
                    </span>
                </label>
            </div>
            <button className="signup__submit" type="submit" onClick={register}>
                Sign Up
            </button>
            <p className="signup__already-have-account">
                Already have an account?{' '}
                <a href="/login" className="signup__link">
                    Log in here
                </a>
            </p>
        </form>
    )
}
export default SignUpBox
