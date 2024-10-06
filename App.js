import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ReceiveScreen from "./screens/ReceiveScreen";
import BalanceScreen from "./screens/BalanceScreen";
import { testGethConnection } from "./services/ethereumService";
import BottomNavigation from "./routes/BottomNavigation";

import Test from "./Test/Test";
import { fetchAllCryptoRates } from "./backend/controllers/curencyDataController";

import { getTrades, getOrders } from "./backend/controllers/tradeController";

import Store from "./redux/Store";
import { Provider } from "react-redux";
import SplashScreen from "./screens/SplashScreen";
import Modal from "./components/modal/OldModal";
import ModalsScreen from "./screens/ModalsScreen";

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";


export default function App() {

  const [showSplashScreen, setShowSplashScreen] = useState(true)

  // async function retrieveCurrencies() {
  //   return await fetchAllCryptoRates()
    
  // }

  // useEffect(() => {
  //   console.log("data: ", retrieveCurrencies())
  // }, [])
  // testGethConnection();


 
  useEffect(() => {
    setTimeout(() => {
      // hide splash screen after 3 seconds
      setShowSplashScreen(false)
    }, 3000)
  })



  return (
    <Provider store={Store}>
    <SafeAreaProvider>
    <GestureHandlerRootView style={{flex: 1}}>
    {/* <NavigationContainer > */}



    {showSplashScreen ? 

    // loading screen 
    <SplashScreen/> :

    <>
    {/* Modals screen for displying views on top of everything eg. in app notifications */}
    <ModalsScreen/>

    {/* bottom navigation */}
    <BottomNavigation />
    </>

    }
    {/* </NavigationContainer> */}

    </GestureHandlerRootView>
    </SafeAreaProvider>
    </Provider>

    //  <GestureHandlerRootView style={{flex: 1}}>
    // <Test/>
    //  </GestureHandlerRootView>
    // {/* <Text>Open up App.js to start working on your app!</Text> */}

    // {/* <ReceiveScreen /> */}
    // {/* <BalanceScreen /> */}
    // {/* <Main /> */}

    // <StatusBar style="auto" />
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
