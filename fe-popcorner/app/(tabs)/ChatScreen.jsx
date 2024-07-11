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

export default function ChatScreen() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const collectionRef = collection(database, "groups");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const fetchedGroups = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(fetchedGroups);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (groups.length > 0 && currentUser) {
      const memberOf = groups.filter((singleGroup) =>
        singleGroup.groupMembers.includes(currentUser)
      );
      setFilteredGroups(memberOf);
    }
  }, [groups, currentUser]);

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
    <View className="flex-grow bg-BlackBackground justify-center items-center ">
      <Text className="text-5xl font-bold text-hotPink mb-5 items-center justify-center mt-5">
        Chat List
      </Text>
      {isLoading ? (
        <Text>Loading chats...</Text>
      ) : (
        <FlatList
          data={filteredGroups}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.itemContent}>
              <TouchableOpacity
                className="bg-hotPink justify-center margin-5 rounded px-7 text-White m-1 py-5 my-2"
                onPress={() =>
                  navigation.navigate("Chat", { groupId: item.id })
                }
                onLongPress={() => {
                  setGroupId(item.id);
                  fetchGroupDetails(item.id);
                }}
              >
                <Text style={styles.groupName}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    width: "100%",
    backgroundColor: "#333",
    alignItems: "center",
    padding: 30,
  },
  mainTitle: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 40,
    fontWeight: "bold",
  },
  listContainer: {
    flexGrow: 1,
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  item: {
    backgroundColor: "#D41F2D",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  memberButton: {
    color: "white",
  },
  groupItem: {
    borderRadius: 10,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  groupName: {
    fontSize: 18,
    color: "white",
  },
  chatCardOuter: {
    flex: 1,
    // marginVertical: 10,
    backgroundColor: "red",
    // justifyContent: "space-between",
    borderRadius: 20,
  },
  chatCard: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: "maroon",
    justifyContent: "space-between",
    borderRadius: 20,
  },
});
