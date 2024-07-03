import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import TabLayout from "./app/(tabs)/_layout";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import SignUp from "./app/(tabs)/SignUp";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabLayout">
        <Stack.Screen
          name="TabLayout"
          component={TabLayout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Sign Up" }}
        />
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
