// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.test.{js,jsx,ts,tsx}',
    ],
    coveragePathIgnorePatterns: ['src/index.tsx', 'src/reportWebVitals.ts'],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
}

const mockFirebase = () => {
    const MockFirebase = require('mock-cloud-firestore')
    const fixtureData = {
        __collection__: {
            servers: {
                __doc__: {
                    server1: {
                        name: 'Server 1',
                        owner: 'user1',
                    },
                    server2: {
                        name: 'Server 2',
                        owner: 'user2',
                    },
                },
            },
        },
    }

    const mockUser = {
        uid: '12345',
        email: 'test@example.com',
        displayName: 'Test User',
    }

    const mockAuth = {
        signInWithEmailAndPassword: jest
            .fn()
            .mockResolvedValue({ user: mockUser }),
        createUserWithEmailAndPassword: jest
            .fn()
            .mockResolvedValue({ user: mockUser }),
        signInWithPopup: jest.fn().mockResolvedValue({ user: mockUser }),
        signOut: jest.fn().mockResolvedValue(undefined),
        onAuthStateChanged: jest.fn(),
        currentUser: jest.fn(() => mockUser),
    }

    const mockFirebaseInstance = new MockFirebase(fixtureData)

    jest.mock('firebase/app', () => ({
        initializeApp: jest.fn(),
    }))

    jest.mock('firebase/firestore', () => ({
        getFirestore: jest.fn(() => mockFirebaseInstance.firestore()),
        doc: jest.fn(),
        onSnapshot: jest.fn(),
    }))

    jest.mock('firebase/auth', () => ({
        getAuth: jest.fn(() => mockAuth),
        onAuthStateChanged: jest.fn(),
        GoogleAuthProvider: jest.fn(),
    }))
}

mockFirebase()
