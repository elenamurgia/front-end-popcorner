import React, { useEffect, useCallback, useState } from "react";
// import EditScreenInfo from "@/components/EditScreenInfo";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigation } from "@react-navigation/native";

function LoginPage({ isLoggedIn, setIsLoggedIn, setUser }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigation = useNavigation(); // Get the navigation object
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigateToUserInfo = () => {
    setIsLoggedIn(true);
    navigation.navigate("UserInfo");
  };
  const navigateToMainPage = () => {
    navigation.navigate("MainPage");
  };

  const handleUsername = (text) => {
    setUserInput({ ...userInput, username: text });
  };
  const handleEmail = (text) => {
    setUserInput({ ...userInput, email: text });
  };
  const handlePassword = (text) => {
    setUserInput({ ...userInput, password: text });
  };

  const handleSubmit = () => {
    setUser(userInput);
    setIsRegistered(true);
    setIsLoggedIn(true);
    navigateToMainPage();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Welcome to our Login page</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleUsername}
      />
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="Email"
        onChangeText={handleEmail}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        onChangeText={handlePassword}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {isRegistered && (
        <Text style={styles.successText}>Registration successful!</Text>
      )}

      {/* <Text> {register.username} </Text> */}
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
    paddingBottom: 50,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20, // Increased margin between boxes
    width: "80%", // Shortened width
  },
  submitButton: {
    backgroundColor: "purple",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    width: "80%",
    marginVertical: 10,
    color: "white",
  },
  submitButtonText: {
    color: "white",
  },
  successText: {
    color: "green",
    marginTop: 10,
    fontSize: 17,
  },
});

export default LoginPage;
