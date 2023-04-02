import { doc, getDoc } from 'firebase/firestore'
import { db } from '../init'
import { getUser } from '../utils'

const getGroupMembers = async (groupId: string) => {
    const groupDoc = await getDoc(doc(db, 'groups', groupId))
    if (!groupDoc.exists()) {
        return []
    }
    const usersUIDs = groupDoc.data().users
    let groupUsers = []
    for (const uid in usersUIDs) {
        const user = await getUser(uid)
        groupUsers.push(user)
    }
    return groupUsers
}

export default getGroupMembers
