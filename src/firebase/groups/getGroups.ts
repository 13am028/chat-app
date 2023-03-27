import { auth, db } from '../init'
import { collection, getDocs, query, where } from 'firebase/firestore'

const getGroups = async () => {
    try {
        if (!auth.currentUser) return
        const myUID = auth.currentUser.uid

        const groupsReference = collection(db, 'groups')
        const userGroupsQuery = query(
            groupsReference,
            where(`users.${myUID}`, '==', true),
        )

        // Execute the query and retrieve the documents
        const querySnapshot = await getDocs(userGroupsQuery)

        // Iterate through the documents and extract group data
        const groups: Array<{ id: string; groupPic: string }> = []
        querySnapshot.forEach(doc => {
            // Not good particle to retreive everything in the group
            groups.push({ id: doc.id, groupPic: doc.data().groupPic })
        })

        return groups
    } catch (error: any) {
        console.error(error)
    }
}

export { getGroups }