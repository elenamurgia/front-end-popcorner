import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
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
export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const collectionRef = collection(database, "groups");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            onPress={() => navigation.navigate("Chat", { groupId: item.id })}
          >
            <Text style={styles.groupName}>{item.name}</Text>
          </TouchableOpacity>
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
