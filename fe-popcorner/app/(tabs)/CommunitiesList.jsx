import React, { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";

import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import addUserToGroup from "./AddUserToGroup";
import { auth, database } from "../../config/firebase";
export function CommunitiesList({ navigation, user }) {
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
        alert("Error fetching communities:", err);
      });
  };

  const handleJoin = async (item, user) => {
    const userToAdd = user.username;
    const userEmailReady = currentUser.replace(".", "-");

    setExistingMembers(item.members);

    if (currentUser) {
      if (!item.members.includes(currentUser)) {
        await addUserToGroup(item.chatId);
        axios
          .post(`https://popcorner.vercel.app/communities/${item.title}`, {
            user: userToAdd,
          })
          .then((response) => {
            // alert(response);
          });
        axios
          .post(`https://popcorner.vercel.app/users/${userEmailReady}/communities`, { community: item.title })
          .then((response) => {
            // alert(response);
          });
      } else {
        alert("You are already a member of this community");
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCommunities();
    }, [])
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("CommunityDetails", { community: item })}>
      <View style={styles.itemContent}>
        <Image source={{ uri: item.logo }} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <TouchableOpacity onPress={() => handleJoin(item, user)} style={styles.buttonBox}>
          <Text style={styles.createButtonText}> Join </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate("CreateCommunity")}>
        <Text style={styles.createButtonText}>Create Community</Text>
      </TouchableOpacity>
      <FlatList data={communities} renderItem={renderItem} keyExtractor={(item) => item.id} />

      {err ? <Text> Error in loading </Text> : <Text> {""} </Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#333", // Background color
    padding: 16,
  },
  createButton: {
    borderColor: "#F2055C", // Button border color
    borderWidth: 2,
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonBox: {
    backgroundColor: "#474747",
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
    color: "#F2055C", // Button text color
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    // Transparent item background color
    borderColor: "#F2055C", // Item border color
    borderWidth: 1,
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F31E6C",
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
    color: "#EEEEEE", // Title color
  },
  description: {
    fontSize: 16,
    color: "#EEEEEE", // Description color
    marginTop: 8,
  },
});
