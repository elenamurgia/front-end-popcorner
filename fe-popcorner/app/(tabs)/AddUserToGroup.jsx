import { getDoc, doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, database } from "../../config/firebase";

const addUserToGroup = async (groupId) => {
  const currentUser = auth.currentUser?.email;

  if (!currentUser) {
    Alert.alert("Error", "No user is logged in.");
    return;
  }

  const groupDoc = doc(database, "groups", groupId);
  const docSnap = await getDoc(groupDoc);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const existingMembers = data.groupMembers || [];

    if (!existingMembers.includes(currentUser)) {
      const updatedMembers = [...existingMembers, currentUser];
      await updateDoc(groupDoc, {
        groupMembers: updatedMembers,
      });
      Alert.alert("Success", "You have joined the group.");
    } else {
      Alert.alert(
        "Already a Member",
        "You are already a member of this group."
      );
    }
  } else {
    Alert.alert("Error", "Document does not exist.");
  }
};

export default addUserToGroup;
