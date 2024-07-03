import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CommunitiesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Communities</Text>
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
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default CommunitiesScreen;
