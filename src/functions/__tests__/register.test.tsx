import signup from '../register'
import { registerWithEmailAndPassword } from '../../firebase/auth'

jest.mock('../../firebase/auth', () => ({
    registerWithEmailAndPassword: jest.fn(),
}))

describe('signup', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('registers user with valid input', async () => {
        const displayName = 'Test User'
        const username = 'testuser'
        const email = 'test@example.com'
        const password = 'Password1!'
        const cPassword = 'Password1!'
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {})

        await signup(displayName, username, email, password, cPassword)

        expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
            username,
            displayName,
            email,
            password,
        )
        expect(spy).not.toHaveBeenCalled()
    })

    it('displays an error message when input is invalid', async () => {
        const displayName = 'Test User'
        const username = 'testuser'
        const email = 'invalidemail'
        const password = 'password'
        const cPassword = 'notmatching'
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {})

        await signup(displayName, username, email, password, cPassword)

        expect(registerWithEmailAndPassword).not.toHaveBeenCalled()
        expect(spy).toHaveBeenCalledTimes(1)
    })

    it('displays an error message when registration fails', async () => {
        const displayName = 'Test User'
        const username = 'testuser'
        const email = 'test@example.com'
        const password = 'Password1!'
        const cPassword = 'Password1!'
        const errorMessage = 'Some error occurred.'
        //@ts-ignore
        registerWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage))
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {})

        await signup(displayName, username, email, password, cPassword)

        expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
            username,
            displayName,
            email,
            password,
        )
        expect(spy).toHaveBeenCalledWith('Error creating user: ' + errorMessage)
    })
})
