import React, { useEffect } from "react";
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

export default function App() {

  // async function retrieveCurrencies() {
  //   return await fetchAllCryptoRates()
    
  // }

  // useEffect(() => {
  //   console.log("data: ", retrieveCurrencies())
  // }, [])
  // testGethConnection();


  const tradesFilter = async () => {
    const data = useCallback(() => { return getTrades(null)}, [])
    data.filter(item => item.tradeType === "selling")
    data.filter(item => item.tradeType === "buying")
  }


  return (
    <Provider store={Store}>
    <BottomNavigation />
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
