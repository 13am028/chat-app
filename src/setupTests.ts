// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

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

    const mockFirebaseInstance = new MockFirebase(fixtureData)

    jest.mock('firebase/app', () => ({
        initializeApp: jest.fn(),
    }))

    jest.mock('firebase/firestore', () => ({
        getFirestore: jest.fn(() => mockFirebaseInstance.firestore()),
    }))

    jest.mock('firebase/auth', () => ({
        getAuth: jest.fn(),
        onAuthStateChanged: jest.fn(),
    }))
}

mockFirebase()
