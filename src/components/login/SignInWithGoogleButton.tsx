import React from 'react'
import { signInWithGoogle } from '../../firebase/auth'
import Button from 'react-bootstrap/Button'

const SignInWithGoogleButton = (props: any) => {
    const { theme } = props
    return (
        <Button
            className={`signInWithGoogleButton ${
                theme === 'dark' ? 'dark' : ''
            }`}
            onClick={signInWithGoogle}
            data-testid="sign-in-with-google-button"
        >
            <img
                src="https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227"
                alt="Google logo"
            />
            Sign in with Google
        </Button>
    )
}

export default SignInWithGoogleButton
