import { collection, addDoc } from "firebase/firestore";
import { database } from "../../config/firebase";

async function createGroup(inputGroupName) {
  try {
    const docRef = await addDoc(collection(database, "groups"), {
      name: inputGroupName,
      createdAt: new Date(),
      groupMembers: [],
    });
    return docRef.id;
  } catch (err) {
    console.log("Error creating group:", err);
    throw err;
  }
}

export default createGroup;
