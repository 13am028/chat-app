import { render } from '@testing-library/react'
import App from './App'
import { useAuthState } from 'react-firebase-hooks/auth'

describe('ProtectedRoutes', () => {
    it('should render App', () => {
        // @ts-ignore
        useAuthState.mockReturnValueOnce([null, false, null])
        render(<App />)
    })
})
