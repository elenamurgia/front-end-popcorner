import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
export function CommunitiesList({ navigation }) {
  const [communities, setCommunities] = useState([]);
  const [err, setErr] = useState(null);
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
    color: "#F2055C", // Title color
  },
  description: {
    fontSize: 16,
    color: "#F2055C", // Description color
    marginTop: 8,
  },
});
