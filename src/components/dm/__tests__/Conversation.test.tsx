import { render } from '@testing-library/react'
import { ChatContext } from '../../context/ChatContext'
import Conversation from '../Conversation'

const mockData = {
    chatId: 'mock-chat-id',
    user: {
        uid: '1',
        username: 'mock',
        displayName: 'mock',
        email: 'email',
        avatar: '',
    },
}

window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('Conversation', () => {
    test('should render', () => {
        render(
            <ChatContext.Provider value={{ data: mockData, dispatch: jest.fn }}>
                <Conversation />
            </ChatContext.Provider>,
        )
    })
})
