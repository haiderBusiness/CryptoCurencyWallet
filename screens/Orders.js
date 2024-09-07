import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Orders({}) {

  const insets = useSafeAreaInsets();
  console.log("instest.top orders", insets.top)
  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
      <Text>Orders</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
   width: '100%',
   height: '100%',
   alignItems: 'center',
   justifyContent: 'flex-start',
   backgroundColor: "red"
   },
 });