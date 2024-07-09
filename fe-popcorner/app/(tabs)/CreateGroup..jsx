import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { View, FlatList } from "react-native";
import { signOut } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../colors";

function CreateGroup({ navigation }) {
  const [groupName, setGroupName] = useState("");

  const newGroup = async () => {
    try {
      const docRef = await addDoc(collection(database, "groups"), {
        name: groupName,
        createdAt: new Date(),
      });
      navigation.navigate("Chat", { groupId: docRef.id });
      setGroupName("");
    } catch (err) {
      console.log(err);
      //   alert("Group name is invalid");
    }
  };
  return (
    <View style={styles.container}>
      <Text>Click here to add a new group</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Group Name"
        value={groupName}
        onChangeText={setGroupName}
      />
      <Button title="Create Group" onPress={newGroup} />
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
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 20,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 20,
    marginBottom: 10,
    marginTop: 5,
    fontWeight: "bold",
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 5,
  },
  interestText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  interestBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
  },
  btnActive: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
  },
  interestsOuterBox: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  nextButtonText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default CreateGroup;
