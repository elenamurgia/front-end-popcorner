import { useNavigation, useNavigationState } from "@react-navigation/native";
import React, { useState } from "react";
import { Drawer } from "react-native-paper";

export const DrawerComponent = ({ onClose }) => {
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(({ routes, index }) => {
    const outerRoute = routes?.[index];
    if (outerRoute?.state) {
      return outerRoute.state.routes[outerRoute.state.index]?.name;
    }
    return outerRoute?.name;
  });

  return (
    <Drawer.Section title="Some title" className="flex-1">
      <Drawer.Item
        label="Home"
        active={
          currentRouteName === "MainPage" || currentRouteName === "HomeScreen"
        }
        onPress={() => {
          navigation.navigate("HomeScreen");
          onClose();
        }}
      />
      <Drawer.Item
        label="Communities"
        active={currentRouteName === "Communities"}
        onPress={() => {
          navigation.navigate("Communities");
          onClose();
        }}
      />
    </Drawer.Section>
  );
};
