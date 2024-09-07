import React from "react";
import { View, Text, Image } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Main, Marketplace, Orders, Wallet, Settings } from "../screens";
import {
  home_black,
  home_fill_black,
  marketplace_black,
  marketplace_fill_black,
  orders_black,
  orders_fill_black,
  settings_black,
  settings_fill_black,
  wallet_black,
  wallet_fill_black,
} from "../assets/bottom_navigation";
import { Colors } from "../constants/Colors";
import HeaderWBT from "../components/HeaderWBT";
import useThemeColors from "../hooks/useThemeColors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNav = () => {

  const noHeader = () => <></> 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let imageSource;
          if (route.name === "Main") {
            imageSource = focused ? home_fill_black : home_black;
          } else if (route.name === "Marketplace") {
            imageSource = focused ? marketplace_fill_black : marketplace_black;
          } else if (route.name === "Orders") {
            imageSource = focused ? orders_fill_black : orders_black;
          } else if (route.name === "Wallet") {
            imageSource = focused ? wallet_fill_black : wallet_black;
          } else if (route.name === "Settings") {
            imageSource = focused ? settings_fill_black : settings_black;
          }

          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={color} />;
          return (
            <Image source={imageSource} style={{ width: 24, height: 24 }} />
          );
        },
        // tabBarActiveTintColor: "tomato",
        // tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        background: "red",
        tabBarStyle: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
          //
        },
      })}
    >
      <Tab.Screen
        // options={{ tabBarBadge: 3, tabBarActiveTintColor: "#000000" }}
        // options={{ header: (props) => <HeaderWBT {...props} /> }}
        options={{ header: noHeader }}
        name="Main"
        component={Main}
      />
      <Tab.Screen 
      options={{ header: noHeader }}
      name="Marketplace" 
      component={Marketplace} 
      />
      <Tab.Screen 
      options={{ header: noHeader }}
      name="Orders" component={Orders} />
      <Tab.Screen 
      options={{ header: noHeader }}
      name="Wallet" component={Wallet} />
      <Tab.Screen 
      options={{ header: noHeader }}
      name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
export default function BottomNavigation({}) {
  const themeColors = useThemeColors();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: themeColors.background,
      secondaryContainer: "red",
      secondaryContainer: "red",
      primary: "red",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomNav" component={BottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
