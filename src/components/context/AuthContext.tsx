import React, {createContext, useEffect, useState} from "react";
import {auth} from "../../firebase";
import {onAuthStateChanged} from "firebase/auth";

type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
};

type AuthContextProps = {
    currentUser: User | null;
};

export const AuthContext = createContext<AuthContextProps>({
    currentUser: null,
});

export const AuthContextProvider = ({children}: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};
