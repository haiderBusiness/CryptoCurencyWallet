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
      setShowSplashScreen(false)
    }, 3000)
  })



  return (
    <Provider store={Store}>

    {showSplashScreen ? 
    <SplashScreen/> :
    <BottomNavigation />}
    </Provider>
    // <Test/>
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
