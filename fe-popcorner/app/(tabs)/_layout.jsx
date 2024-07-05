import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import UserInfo from "./UserInfo";
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "./ChatScreen"; // Correct import

const Tab = createBottomTabNavigator();

export default function TabLayout({
  setIsLoggedIn,
  isLoggedIn,
  user,
  setUser,
}) {
  const navigation = useNavigation();

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };
  const navigateToLogin = () => {
    navigation.navigate("LoginPage");
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Tab.Navigator>
          {/* <Tab.Screen
            name="ChatScreen"
            options={{ title: "Chat" }}
            initialParams={{ isLoggedIn, user }}
          >
            {(props) => (
              <ChatScreen {...props} isLoggedIn={isLoggedIn} user={user} />
            )}
          </Tab.Screen> */}
          <Tab.Screen
            name="UserInfo"
            options={{ title: "User Profile" }}
            initialParams={{ isLoggedIn, user }}
          >
            {(props) => (
              <UserInfo {...props} isLoggedIn={isLoggedIn} user={user} />
            )}
          </Tab.Screen>
          {/* <Tab.Screen name="HomeScreen" options={{ title: "Home" }}>
            {(props) => <HomeScreen {...props} />}
          </Tab.Screen> */}
        </Tab.Navigator>
      ) : (
        <View>
          <Text style={styles.mainTitle}>Welcome to the app</Text>
          <TouchableOpacity
            onPress={navigateToSignUp}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Create an account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToLogin} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mainTitle: {
    fontSize: 40,
    textAlign: "center",
    paddingBottom: 20,
    fontWeight: "bold",
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
