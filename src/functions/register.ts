import { registerWithEmailAndPassword } from '../firebase/auth'

const isValidPassword = (password: string) => {
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]\\:';"<>,.?/]).{8,}$/
    return passwordPattern.test(password)
}

const isEmailValid = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
    return emailPattern.test(email)
}

const signup = async (
    displayName: string,
    username: string,
    email: string,
    password: string,
    cPassword: string,
) => {
    if (!displayName || !username || !email || !password) {
        alert('Please fill in all fields.')
        return
    }
    if (!isEmailValid(email)) {
        alert('Please enter a valid email address.')
        return
    }
    if (!isValidPassword(password)) {
        alert(
            'Please enter a valid password. Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        )
        return
    }
    if (password !== cPassword) {
        alert('Passwords have to match')
        return
    }
    // Check that the checkbox is checked
    const checkbox = document.getElementById('terms')
    // @ts-ignore
    if (checkbox && !checkbox.checked) {
        alert('Please agree to the terms of service and privacy policy.')
        return
    }
    try {
        await registerWithEmailAndPassword(
            username,
            displayName,
            email,
            password,
        )
    } catch (error: any) {
        alert('Error creating user: ' + error.message)
    }
}

export default signup
