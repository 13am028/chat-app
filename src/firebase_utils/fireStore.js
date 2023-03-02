import {db} from "./firebaseInit";
import {collection, getDocs} from "firebase/firestore";

// Get all documents from a Firestore collection
const getCollection = async (collectionName) => {
    const q = collection(db, collectionName);
    const docs = await getDocs(q);
    return docs.docs.map((doc) => ({
        id: doc.id, ...doc.data()
    }));
};

export {getCollection}