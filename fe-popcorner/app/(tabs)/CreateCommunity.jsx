import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import uuid from "react-native-uuid";
export default function CreateCommunity({ navigation, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const handleCreate = () => {
    const newCommunity = {
      title,
      description,
      logo,
      moderators: [user.username],
      members: [user.username],
      posts: [],
      events: [],
      memberCount: 1,
      chatId: uuid.v4(),
    };
    axios
      .post("https://popcorner.vercel.app/communities", newCommunity)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error("There was an error creating the community!", error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Community Title" />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Community Description"
      />
      <Text style={styles.label}>Logo URL:</Text>
      <TextInput style={styles.input} value={logo} onChangeText={setLogo} placeholder="Logo URL" />
      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Create Community</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 16,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    color: "#F2055C",
    fontSize: 24,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: "#EEEEEE",
    fontWeight: "bold",
  },
  label: {
    color: "#EEEEEE",
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#555",
    color: "#EEEEEE",
    borderColor: "#F2055C",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  createButton: {
    borderColor: "#F2055C",
    borderWidth: 2,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  createButtonText: {
    color: "#F2055C",
    fontSize: 18,
    fontWeight: "bold",
  },
});
