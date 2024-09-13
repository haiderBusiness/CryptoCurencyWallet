import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function PlaceHolderListHeader({}) {

 return (
  <View style={styles.container}>
   <Text style={styles.text}>PlaceHolderListHeader</Text>
  </View>
 );
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: 200,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "orange"
  },

  text: {
    color: "white"
  }
});