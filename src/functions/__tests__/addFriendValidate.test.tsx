import addFriendValidate from '../addFriendValidate'
import { addFriend } from '../../firebase/friends/addFriends'

jest.mock('../../firebase/friends/addFriends')

describe('addFriendValidate', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should call addFriend with the given username', async () => {
        const username = 'johndoe'
        await addFriendValidate(username)
        expect(addFriend).toHaveBeenCalledWith(username)
    })

    it('should alert the user when the username is empty', async () => {
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {})
        await addFriendValidate('')
        expect(spy).not.toHaveBeenCalled()
        spy.mockRestore()
    })

    it('should alert the user when the username is not found', async () => {
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {})
        //@ts-ignore
        addFriend.mockResolvedValueOnce('not_found')
        await addFriendValidate('janedoe')
        expect(spy).toHaveBeenCalledWith('Username not found.')
        spy.mockRestore()
    })

    it('should alert the user when the username is already friends', async () => {
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {})
        //@ts-ignore
        addFriend.mockResolvedValueOnce('already_friends')
        await addFriendValidate('johndoe')
        expect(spy).toHaveBeenCalledWith(
            'You are already friends with johndoe.',
        )
        spy.mockRestore()
    })

    it('should alert the user when the username is successfully added as a friend', async () => {
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {})
        //@ts-ignore
        addFriend.mockResolvedValueOnce('success')
        await addFriendValidate('johndoe')
        expect(spy).toHaveBeenCalledWith(
            'johndoe has been successfully added as your friend.',
        )
        spy.mockRestore()
    })
})
