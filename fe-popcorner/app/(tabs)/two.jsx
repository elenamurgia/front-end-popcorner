import { StyleSheet, Text, View } from "react-native";

// import EditScreenInfo from "@/components/EditScreenInfo";
// import { Text, View } from "@/components/Themed";

export default function TabTwoScreen({ isLoggedIn, user }) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
      <Text>Your are logged in: {isLoggedIn ? "Yes" : "No"}</Text>
      {isLoggedIn && <Text>User info: {user.username}</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
