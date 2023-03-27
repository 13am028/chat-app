import { addFriend } from '../firebase/friends/addFriends'

const alertSuccessfully = (username: string) => {
    alert(`${username} has been successfully added as your friend.`)
}

const alertNotFound = () => {
    alert(`Username not found.`)
}

const alertAlreadyFriends = (username: string) => {
    alert(`You are already friends with ${username}.`)
}

const addFriendValidate = async (username: string) => {
    // Check that the username is not empty
    if (username.trim() === '') {
        return
    }

    const result = await addFriend(username)

    if (result === 'success') {
        alertSuccessfully(username)
    } else if (result === 'not_found') {
        alertNotFound()
    } else if (result === 'already_friends') {
        alertAlreadyFriends(username)
    }
}

export default addFriendValidate
