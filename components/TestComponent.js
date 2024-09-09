import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TestComponent = ({}) => {

    console.log("re renders")
 return (
  <View style={styles.container}>
   <Text>TestComponent</Text>
  </View>
 );
}


export default memo(TestComponent)


const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  },
});