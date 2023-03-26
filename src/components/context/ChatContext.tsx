import React, { createContext, useContext, useReducer } from 'react'
import { AuthContext, User } from './AuthContext'

type ChatContextProps = {
    data: {
        chatId: string
        user: User
    }
    dispatch: React.Dispatch<any>
}

export const ChatContext = createContext<ChatContextProps>({
    data: {
        chatId: 'null',
        user: {
            uid: '',
            email: '',
            displayName: '',
            username: '',
            avatar: '',
        },
    },
    dispatch: () => null,
})

export const ChatContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { currentUser } = useContext(AuthContext)

    const INITIAL_STATE = {
        chatId: 'null',
        user: {},
    }

    type Action = { type: 'CHANGE_USER'; payload: User }

    const chatReducer = (state: any, action: Action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    user: action.payload,
                    chatId:
                        (currentUser?.uid ?? '') > action.payload.uid
                            ? (currentUser?.uid ?? '') + action.payload.uid
                            : action.payload.uid + (currentUser?.uid ?? ''),
                }

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider
            value={{ data: state, dispatch }}
            data-testid="chat-context-provider"
        >
            {children}
        </ChatContext.Provider>
    )
}
