import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import addUserToGroup from "./AddUserToGroup";
import { auth, database } from "../../config/firebase";
export function CommunitiesList({ navigation }) {
  const [communities, setCommunities] = useState([]);
  const [existingMembers, setExistingMembers] = useState([]);
  const [err, setErr] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser.email);
    }
  }, []);

  const fetchCommunities = () => {
    axios
      .get("https://popcorner.vercel.app/communities")
      .then((data) => {
        const retrievedCommunities = data.data;
        const parsedData = retrievedCommunities.map((comm) => {
          const key = Object.keys(comm)[0];
          const community = comm[key];
          return { ...community, id: key };
        });
        setCommunities(parsedData);
      })
      .catch((err) => {
        console.error("Error fetching communities:", err);
        // setErr(err);
      });
  };

  // useEffect(() => {
  //   console.log(existingMembers);
  // }, [existingMembers]);

  const handleJoin = async (item) => {
    // await addUserToGroup()
    console.log(item.members);
    setExistingMembers(item.members);
    if (!item.members.includes(currentUser)) {
      console.log(currentUser);
      setExistingMembers([...existingMembers, currentUser]);
      //   axios
      //     .patch("https://popcorner.vercel.app/communities")
      //     .send({ members: existingMembers })
      //     .then((response) => {
      //       alert(response);
      //     });
      //   await addUserToGroup(item.chatId);
      // } else {
      //   alert("You are already a member of this community");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCommunities();
    }, [])
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("CommunityDetails", { community: item })
      }
    >
      <View style={styles.itemContent}>
        <Image source={{ uri: item.logo }} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleJoin(item)}
          style={styles.buttonBox}
        >
          <Text style={styles.createButtonText}> Join </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateCommunity")}
      >
        <Text style={styles.createButtonText}>Create Community</Text>
      </TouchableOpacity>
      <FlatList
        data={communities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {err ? <Text> Error in loading </Text> : <Text> {""} </Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#E2D0B9",
    padding: 16,
  },
  createButton: {
    backgroundColor: "#D41F2D",
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonBox: {
    backgroundColor: "maroon",
    padding: 15,
    marginLeft: 15,
    marginBottom: 20,
    // borderBlockColor: "black",
    // height: "100%",
    // borderRadius: 8,
    // marginBottom: 16,
    // alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#D41F2D",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
  },
});
