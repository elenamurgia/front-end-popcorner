import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  Alert,
} from "react-native";
import {
  collection,
  onSnapshot,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, database } from "../../config/firebase";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const collectionRef = collection(database, "groups");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser.email);
    }
  }, []);

  useEffect(() => {
    if (route.params && route.params.groupId) {
      const { groupId } = route.params;
      fetchGroupDetails(groupId);
    }
  }, [route.params]);

  const fetchGroupDetails = async (groupId) => {
    const groupDoc = doc(database, "groups", groupId);
    const docSnap = await getDoc(groupDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setGroupName(data.name);
      setGroupMembers(data.groupMembers || []);
      setIsEditing(true);
    } else {
      alert("Document does not exist");
    }
  };

  const updateGroupUsers = async (groupId) => {
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
        setGroupMembers(updatedMembers);
        Alert.alert("Success", "You have joined the group.");
      } else {
        Alert.alert(
          "Already a Member",
          "You are already a member of this group."
        );
      }
    } else {
      alert("Document does not exist");
    }
  };

  const handleJoinGroup = async (groupId) => {
    await fetchGroupDetails(groupId);
    updateGroupUsers(groupId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatCard}>
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => navigation.navigate("Chat", { groupId: item.id })}
              onLongPress={() => {
                setGroupId(item.id);
                fetchGroupDetails(item.id);
              }}
            >
              <Text style={styles.groupName}>{item.name}</Text>
              {item.groupMembers?.map((member, index) => (
                <Text key={index}>{member}</Text>
              ))}
            </TouchableOpacity>
            <Button
              style={styles.memberButton}
              title={isEditing ? "Already a member" : "Join Group"}
              onPress={() => handleJoinGroup(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  memberButton: {
    color: "white",
  },
  groupItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  groupName: {
    fontSize: 18,
    color: "white",
  },
  chatCard: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "space-between",
  },
});
