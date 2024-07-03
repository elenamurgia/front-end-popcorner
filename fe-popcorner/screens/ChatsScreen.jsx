import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 100,
  },
});

export default ChatScreen;
