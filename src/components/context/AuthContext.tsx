import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../../firebase/init'
import { getUser } from '../../firebase/utils'
import { onAuthStateChanged } from 'firebase/auth'

export type User = {
    uid: string
    email: string | null
    displayName: string | null
    username: string | null
    avatar: string | null
}

type AuthContextProps = {
    currentUser: User | null
    setCurrentUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextProps>({
    currentUser: null,
    setCurrentUser: () => {},
})

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async () => {
            if (!auth.currentUser) return
            const currentUser = await getUser(auth.currentUser.uid)
            console.log(currentUser)
            setCurrentUser(
                currentUser
                    ? {
                          uid: currentUser.uid,
                          email: currentUser.email,
                          displayName: currentUser.displayName,
                          username: currentUser.username,
                          avatar: currentUser.avatar,
                      }
                    : null,
            )
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser }}
            data-testid="auth-context-provider"
        >
            {children}
        </AuthContext.Provider>
    )
}
