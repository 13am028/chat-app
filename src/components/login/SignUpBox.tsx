import React from 'react'
import { Link } from 'react-router-dom'

const SignUpBox = (props: any) => {
    const { theme } = props
    return (
        <form>
            <div className={`signup-box ${theme === 'dark' ? 'dark' : ''}`}>
                <p className="signup-text">
                    Don't have an account?{' '}
                    <Link to="/signup" className="signup_link">
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default SignUpBox
