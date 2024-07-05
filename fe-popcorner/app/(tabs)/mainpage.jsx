import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./login";
import TabTwoScreen from "./two";
import UserInfo from "./UserInfo";
import SignUp from "./SignUp";
import Interests from "./Interests";
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "./ChatScreen";
// import { useAuth } from "./AuthContext";

const Tab = createBottomTabNavigator();

function MainPage({ isLoggedIn, setIsLoggedIn, user, setUser, newUserInput }) {
  // const  = useAuth();
  console.log(newUserInput);
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" options={{ title: "", headerShown: false }}>
        {(props) => <HomeScreen {...props} />}
      </Tab.Screen>
      {/* {console.log(isLoggedIn)} */}
      {/* <Tab.Screen
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
      </Tab.Screen> */}
      <Tab.Screen
        name="ChatScreen"
        options={{ title: "Chat" }}
        initialParams={{ isLoggedIn, user }}
      >
        {(props) => (
          <ChatScreen {...props} isLoggedIn={isLoggedIn} user={user} />
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
            initialParams={{ isLoggedIn, user, setUser, setIsLoggedIn }}
          >
            {(props) => (
              <Interests
                {...props}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                newUserInput={newUserInput}
                setNewUserInput={setNewUserInput}
              />
            )}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
}

export default MainPage;
