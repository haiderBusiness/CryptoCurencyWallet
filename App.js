import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ReceiveScreen from "./screens/ReceiveScreen";
import BalanceScreen from "./screens/BalanceScreen";
import { testGethConnection } from "./services/ethereumService";
import BottomNavigation from "./routes/BottomNavigation";
import Test from "./Test/Test";

export default function App() {
  // testGethConnection();
  return (
    <BottomNavigation />
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
