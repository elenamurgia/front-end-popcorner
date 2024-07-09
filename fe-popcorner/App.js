import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabLayout from "./app/(tabs)/_layout";
import SignUp from "./app/(tabs)/SignUp";
import LoginPage from "./app/(tabs)/login";
import Interests from "./app/(tabs)/Interests";
import UserInfo from "./app/(tabs)/UserInfo";
import MainPage from "./app/(tabs)/mainpage";
import MovieScreen from "./screens/MovieScreen";
import ChatScreen from "./app/(tabs)/ChatScreen"; // Correct import
import AllMoviesScreen from "./screens/AllMoviesScreen";
import CastScreen from "./screens/CastScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [newUserInput, setNewUserInput] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    interests: {},
    email: "",
    dateOfBirth: "",
    username: "",
    password: "",
    communities: {},
    events: {},
    cinemas: {},
    isBannedFrom: {},
    moderator: {},
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabLayout">
        <Stack.Screen
          name="TabLayout"
          component={TabLayout}
          options={{ headerShown: false }}
          initialParams={{
            isLoggedIn: isLoggedIn,
            user: user,
            setIsLoggedIn: setIsLoggedIn,
            setUser: setUser,
          }}
        />
        <Stack.Screen
          name="SignUp"
          options={{ title: "Sign Up", headerBackTitle: "Back" }}
        >
          {(props) => (
            <SignUp
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              newUserInput={newUserInput}
              setNewUserInput={setNewUserInput}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="LoginPage"
          options={{ title: "Login In", headerBackTitle: "Back" }}
        >
          {(props) => (
            <LoginPage
              {...props}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Interests"
          options={{ title: "Interests", headerBackTitle: "Back" }}
        >
          {(props) => (
            <Interests
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setNewUserInput={setNewUserInput}
              newUserInput={newUserInput}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="UserInfo"
          options={{ title: "User Info", headerBackTitle: "Back" }}
        >
          {(props) => (
            <UserInfo {...props} isLoggedIn={isLoggedIn} user={user} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ChatScreen" // Corrected to match the import name
          options={{ title: "Chat Screen", headerBackTitle: "Back" }}
        >
          {(props) => (
            <ChatScreen {...props} isLoggedIn={isLoggedIn} user={user} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="MainPage"
          options={{ title: "", headerShown: false }}
        >
          {(props) => (
            <MainPage
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              setUser={setUser}
              user={user}
              newUserInput={newUserInput}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="MovieScreen"
          component={MovieScreen}
          options={{ title: "", headerBackTitle: "Back" }}
        ></Stack.Screen>

        <Stack.Screen
          name="AllMoviesScreen"
          component={AllMoviesScreen}
          options={{ title: "", headerBackTitle: "Back" }}
        ></Stack.Screen>

        <Stack.Screen
          name="CastScreen"
          component={CastScreen}
          options={{ title: "", headerBackTitle: "Back" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
