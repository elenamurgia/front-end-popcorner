import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CinemaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cinemas</Text>
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

export default CinemaScreen;
