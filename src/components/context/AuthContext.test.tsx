import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext, AuthContextProvider } from './AuthContext';

describe('AuthContextProvider', () => {
    it("renders children with AuthContext", () => {
        const { getByTestId } = render(
            <AuthContextProvider>
                <div data-testid="child" />
            </AuthContextProvider>
        );

        expect(getByTestId("child")).toBeInTheDocument();
    });
});

const ChildComponent = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div data-testid="child-component">
            {currentUser ? `Welcome ${currentUser.displayName}` : 'Please sign in'}
        </div>
    );
};
