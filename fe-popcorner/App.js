import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabLayout from "./app/(tabs)/_layout";
import SignUp from "./app/(tabs)/SignUp";
import LoginPage from "./app/(tabs)/login";
import Interests from "./app/(tabs)/Interests";
import UserInfo from "./app/(tabs)/UserInfo";
import MainPage from "./app/(tabs)/mainpage";
import ChatScreen from "./screens/ChatsScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Example state for login status
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
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
          {(props) => <Interests {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>

        <Stack.Screen
          name="UserInfo"
          options={{ title: "UserInfo", headerBackTitle: "Back" }}
        >
          {(props) => (
            <UserInfo {...props} isLoggedIn={isLoggedIn} user={user} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ChatScreen"
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
            />
          )}
        </Stack.Screen>
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
