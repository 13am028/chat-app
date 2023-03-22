import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
    username: string | null;
};

type AuthContextProps = {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextProps>({
    currentUser: null,
    setCurrentUser: () => {},
});

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(
                user
                    ? {
                          uid: user.uid,
                          email: user.email,
                          displayName: user.displayName,
                          username: user.uid,
                      }
                    : null,
            );
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
