import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LoginPage from "./login";
import TabTwoScreen from "./two";
import UserInfo from "./UserInfo";
import SignUp from "./SignUp";
import Interests from "./Interests";
import HomeScreen from "../../screens/HomeScreen";
// import { useColorScheme } from "@/components/useColorScheme";
import { useNavigation } from "@react-navigation/native";

function MainPage() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigateToSignUp = () => {
    setIsLoggedIn(false);
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="TabTwoScreen"
            options={{ title: "Two" }}
            initialParams={{ isLoggedIn, user }}
          >
            {(props) => (
              <TabTwoScreen {...props} isLoggedIn={isLoggedIn} user={user} />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="LoginPage"
            options={{ title: "Login" }}
            initialParams={{ isLoggedIn, setIsLoggedIn, setUser }}
          >
            {(props) => (
              <LoginPage
                {...props}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            )}
          </Tab.Screen>
          {isLoggedIn ? (
            <Tab.Screen
              name="UserInfo"
              options={{ title: "User profile" }}
              initialParams={{ isLoggedIn, user }}
            >
              {(props) => (
                <UserInfo {...props} isLoggedIn={isLoggedIn} user={user} />
              )}
            </Tab.Screen>
          ) : (
            <>
              <Tab.Screen
                name="SignUp"
                options={{ title: "SignUp" }}
                initialParams={{ setIsLoggedIn, user, setUser }}
              >
                {(props) => (
                  <SignUp
                    {...props}
                    setIsLoggedIn={setIsLoggedIn}
                    user={user}
                    setUser={setUser}
                  />
                )}
              </Tab.Screen>
              <Tab.Screen
                name="Interests"
                options={{ title: "Select interests" }}
                initialParams={{ isLoggedIn, user, setUser }}
              >
                {(props) => (
                  <Interests
                    {...props}
                    isLoggedIn={isLoggedIn}
                    user={user}
                    setUser={setUser}
                  />
                )}
              </Tab.Screen>
            </>
          )}
          <Tab.Screen name="HomeScreen" options={{ title: "HomeScreen" }}>
            {(props) => <HomeScreen {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <View>
          <Text style={styles.mainTitle}> Welcome to the app </Text>
          <TouchableOpacity
            onPress={navigateToSignUp}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToSignUp}
            style={styles.nextButton}
          >
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

export default MainPage;
