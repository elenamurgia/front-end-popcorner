import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./login";
import TabTwoScreen from "./two";
import UserInfo from "./UserInfo";
import SignUp from "./SignUp";
import Interests from "./Interests";
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "./ChatScreen";
import { Header } from "../../components/Header";
import { BottomNavigation, Icon, PaperProvider } from "react-native-paper";

import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

function MainPage({ isLoggedIn, setIsLoggedIn, user, setUser, newUserInput }) {
  return (
    <PaperProvider>
      <View className="flex-col justify-between items-center">
        <Header username="Test" title="PopCorner" />
      </View>
      <Tab.Navigator
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.navigate(route.name, route.params);
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="HomeScreen"
          options={{
            title: "",
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => {
              return <Icon source="home" size={size} color={color} />;
            },
          }}
        >
          {(props) => <HomeScreen {...props} />}
        </Tab.Screen>

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
            options={{ title: "User profile", headerShown: false }}
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
      </Tab.Navigator>
    </PaperProvider>
  );
}

export default MainPage;
