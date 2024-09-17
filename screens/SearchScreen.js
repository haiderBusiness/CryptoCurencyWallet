import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Search from "../components/search/Search";

export default function SearchScreen({route, navigation}) {

  const insets = useSafeAreaInsets();
  console.log("instest.top orders", insets.top)

  const onCancel = () => {
    navigation.goBack()
    console.log("test1")
  }
  return (
    // <View style={{...styles.container, paddingTop: insets.top}}>
      <Search onCancel={onCancel}/>
    /* </View> */
  );
}



const styles = StyleSheet.create({
  container: {
   width: '100%',
   height: '100%',
   alignItems: 'center',
   justifyContent: 'flex-start',
   backgroundColor: "ornage"
   },
 });