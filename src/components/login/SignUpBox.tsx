import React from 'react'
import { Link } from 'react-router-dom'

const SignUpBox = (props: any) => {
    const { theme } = props
    return (
        <form>
            <div
                className={`signup-box ${theme === 'dark' ? 'dark' : ''}`}
                data-testid="signup-box"
            >
                <p className="signup-text">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="signup_link"
                        data-testid="signup-link"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default SignUpBox
