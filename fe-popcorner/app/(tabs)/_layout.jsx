import React, { useState } from "react";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Link, Tabs } from "expo-router";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
// import Colors from "@/constants/Colors";
// import { useColorScheme } from "@/components/useColorScheme";
// import { useClientOnlyValue } from "@/components/useClientOnlyValue";

import LoginPage from "./login";
import TabTwoScreen from "./two";
import UserInfo from "./UserInfo";
import SignUp from "./SignUp";
import Interests from "./Interests";
import PopularMovies from "../../components/PopularMovies";
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "../../screens/ChatsScreen";

// Create the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function TabLayout({
  setIsLoggedIn,
  isLoggedIn,
  user,
  setUser,
}) {
  // const colorScheme = useColorScheme();
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Example state for login status

  const navigation = useNavigation(); // Get the navigation object

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
          <Tab.Screen
            name="ChatScreen"
            options={{ title: "ChatScreen" }}
            initialParams={{ isLoggedIn, user }}
          >
            {/* Pass props as children */}
            {(props) => (
              <ChatScreen {...props} isLoggedIn={isLoggedIn} user={user} />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="UserInfo"
            options={{ title: "User profile" }}
            initialParams={{ isLoggedIn, user }}
          >
            {/* Pass props as children */}
            {(props) => (
              <UserInfo {...props} isLoggedIn={isLoggedIn} user={user} />
            )}
          </Tab.Screen>

          <Tab.Screen name="HomeScreen" options={{ title: "HomeScreen" }}>
            {(props) => <HomeScreen {...props} />}
          </Tab.Screen>
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
