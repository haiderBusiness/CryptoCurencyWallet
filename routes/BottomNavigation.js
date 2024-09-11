import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
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
  home2_black,
  home2_fill_black,
  marketplace_black,
  marketplace_fill_black,
  market2_black, 
  market2_fill_black,
  orders_black,
  orders_fill_black,
  settings_black,
  settings_fill_black,
  wallet_black,
  wallet_fill_black,

  wallet2_black,
  wallet2_fill_black,

  interface_euro_black,
  interface_euro_black_fill,

  interface_rectangle_list_black,
  interface_rectangle_list_fill_black,

} from "../assets/bottom_navigation";
import { Colors } from "../constants/Colors";
import HeaderWBT from "../components/HeaderWBT";
import useThemeColors from "../hooks/useThemeColors";
import { BlurView } from "expo-blur";

const Stack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

const BottomNav = () => {

  const themeColors = useThemeColors();

  const noHeader = () => <></> 


  const tabBarBackground = () => {
    return(
      <>
      <View 
      style={{
        ...StyleSheet.absoluteFillObject,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: "hidden",
        backgroundColor: themeColors.background3,
        opacity: 0.5,
        }}
      />


      <BlurView 
      intensity={100}
      style={{
        ...StyleSheet.absoluteFillObject,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: "hidden",
        backgroundColor: "transparent"
        }}
        />
      </>
    )
  }



  const TabBarIcon = ({route, focused, color, size }) => {
    let imageSource;
    if (route.name === "Main") {
      imageSource = focused ? home2_fill_black : home2_black;
    } else if (route.name === "Marketplace") {
      imageSource = focused ? market2_fill_black : market2_black;
    } else if (route.name === "Orders") {
      imageSource = focused ? interface_euro_black_fill : interface_euro_black;
    } else if (route.name === "Wallet") {
      imageSource = focused ? interface_rectangle_list_fill_black : interface_rectangle_list_black;
    } 
    
    // else if (route.name === "Settings") {
    //   imageSource = focused ? settings_fill_black : settings_black;
    // }

    // You can return any component that you like here!
    // return <Ionicons name={iconName} size={size} color={color} />;
    return (
      <Image source={imageSource} style={{ width: 24, height: 24 }} />
    );
  };


  const tabBarLabel = ({focused, color, size }) => {

    const opacity = focused ? 1 : 0
    return(
      <View 
      style={{
        width: 5,
        height: 5,
        borderRadius: 10,
        backgroundColor: themeColors.text,
        opacity: opacity
        }}
      />
    )
  }


  return (
    <BottomStack.Navigator
      screenOptions={({ route }) => ({

        tabBarIcon: ({focused, color, size }) => {
          return (<TabBarIcon route={route} focused={focused} color={color} size={size} />)
        },
        
        
        // tabBarActiveTintColor: "tomato",
        // tabBarInactiveTintColor: "gray",
        // tabBarShowLabel: false,
        tabBarLabel: tabBarLabel,

        tabBarBackground: tabBarBackground,
        tabBarStyle: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
          position: "absolute"
          //
        },
      })}
    >
      <BottomStack.Screen
        // options={{ tabBarBadge: 3, tabBarActiveTintColor: "#000000" }}
        // options={{ header: (props) => <HeaderWBT {...props} /> }}
        options={{ header: noHeader }}
        name="Main"
        component={Main}
      />
      <BottomStack.Screen 
      options={{ header: noHeader }}
      name="Marketplace" 
      component={Marketplace} 
      />
      <BottomStack.Screen 
      options={{ header: noHeader }}
      name="Orders" component={Orders} />
      <BottomStack.Screen 
      options={{ header: noHeader }}
      name="Wallet" component={Wallet} />
      {/* <BottomStack.Screen 
      options={{ header: noHeader }}
      name="Settings" component={Settings} /> */}
    </BottomStack.Navigator>
  );
};
export default function BottomNavigation({}) {
  const themeColors = useThemeColors();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: themeColors.background,
      // secondaryContainer: "red",
      // secondaryContainer: "red",
      // primary: "red",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ 
        headerShown: false,
        }}>
        <Stack.Screen name="BottomNav" component={BottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
