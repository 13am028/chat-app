import MockFirebase from 'mock-cloud-firestore'

const mockFirebase = () => {
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
    const firestore = mockFirebaseInstance.firestore()

    jest.mock('firebase/app', () => ({
        initializeApp: jest.fn(),
    }))

    jest.mock('firebase/firestore', () => ({
        getFirestore: jest.fn(() => firestore),
    }))

    jest.mock('firebase/auth', () => ({
        getAuth: jest.fn(() => ({
            onAuthStateChanged: jest.fn(),
        })),
    }))
}

mockFirebase()
