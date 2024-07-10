import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import axios from "axios";
import uuid from "react-native-uuid";
import CreateGroup from "./CreateGroup";
// import AddUserToChat from "./AddUserToGroup";
import addUserToGroup from "./AddUserToGroup";
export default function CreateCommunity({ navigation, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [groupChatId, setGroupChatId] = useState("");
  const handleCreate = async () => {
    const newGroupID = await CreateGroup(title);
    AddUserToChat(newGroupID);
    await addUserToGroup(newGroupID);
    const newCommunity = {
      title,
      description,
      logo,
      moderators: [user.username],
      members: [user.username],
      posts: [],
      events: [],
      memberCount: 1,
      chatId: newGroupID,
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
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Community Title"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Community Description"
      />
      <Text style={styles.label}>Logo URL:</Text>
      <TextInput
        style={styles.input}
        value={logo}
        onChangeText={setLogo}
        placeholder="Logo URL"
      />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2D0B9",
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
});
