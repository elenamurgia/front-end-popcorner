import React, { createContext, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./screens/Chat";
import Signup from "./screens/newSignUp";
import Login from "./screens/newLogin";
// import Home from "./screens/Home";
import { ActivityIndicator } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import AddProfileInfo from "./screens/AddProfileInfo";
import Interests from "./app/(tabs)/Interests";
import MainPage from "./app/(tabs)/mainpage";
import UserInfo from "./app/(tabs)/UserInfo";
import AllMoviesScreen from "./screens/AllMoviesScreen";
import CastScreen from "./screens/CastScreen";

import MovieScreen from "./screens/MovieScreen";


const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
// // style={(marginRight:10)} onPress=(onSignOut)> <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}})>
// function ChatStack() {
//   return (
//     <Stack.Navigator>
//       {/* <Stack.Screen name="Home" component={Home} /> */}
//       {/* <Stack.Screen name="Chat" component={Chat} /> */}
//     </Stack.Navigator>
//   );
// }

function AuthStack() {
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
  const [userInfo, setUserInfo] = useState({
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
  const [existingUser, setExistingUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(newUserInput);

  return (
    <Stack.Navigator
      defaultScreenOptions={Login}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login">
        {(props) => (
          <Login
            {...props}
            setUser={setUser}
            user={user}
            setIsLoggedIn={setIsLoggedIn}
            setExistingUser={setExistingUser}
            existingUser={existingUser}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Signup">
        {(props) => (
          <Signup
            {...props}
            setNewUserInput={setNewUserInput}
            newUserInput={newUserInput}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AddProfileInfo">
        {(props) => (
          <AddProfileInfo
            {...props}
            setNewUserInput={setNewUserInput}
            newUserInput={newUserInput}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Interests">
        {(props) => (
          <Interests
            {...props}
            setNewUserInput={setNewUserInput}
            newUserInput={newUserInput}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="MainPage">
        {(props) => (
          <MainPage
            {...props}
            user={user}
            setNewUserInput={setNewUserInput}
            newUserInput={newUserInput}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="UserInfo">
        {(props) => (
          <UserInfo
            {...props}
            user={user}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            setNewUserInput={setNewUserInput}
            newUserInput={newUserInput}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Chat" component={Chat} />
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
  );
}


function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  const [finishedSignUp, setFinishedSignUp] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {finishedSignUp ? <Text>Hello </Text> : <AuthStack />}

    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  navContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
});
