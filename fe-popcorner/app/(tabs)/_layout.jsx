import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import UserInfo from "./UserInfo";
import PopularMovies from "../../components/Movies/PopularMovies";
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "./ChatScreen"; // Correct import
import MainPage from "./mainpage";

const Tab = createBottomTabNavigator();

export default function TabLayout({
  setIsLoggedIn,
  isLoggedIn,
  user,
  setUser,
}) {
  const navigation = useNavigation();

  function AuthStack() {
    return (
      <Stack.Navigator
        defaultScreenOptions={Login}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  }

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };
  const navigateToLogin = () => {
    navigation.navigate("LoginPage");
  };

  return (
    <></>
    // <View style={styles.container}>
    //   <Text style={styles.mainTitle}>Welcome to the app</Text>
    //   <TouchableOpacity onPress={navigateToSignUp} style={styles.nextButton}>
    //     <Text style={styles.nextButtonText}>Create an account</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={navigateToLogin} style={styles.nextButton}>
    //     <Text style={styles.nextButtonText}>Login</Text>
    //   </TouchableOpacity>
    // </View>

    // <NavigationContainer>
    //   {userVariable ? <MainPage /> : <AuthStack />}
    // </NavigationContainer>
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
