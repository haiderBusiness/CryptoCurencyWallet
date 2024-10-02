import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

const {width, height} = Dimensions.get("window")
export default function Test({}) {

    const [show, setShow] = useState(true)



 return (
  <Animated.View style={styles.container}>

    {show && 
    <Animated.View

    style={styles.view}
    entering={LinearTransition}
    exiting={LinearTransition}

    >
    <Text style={{fontSize: 35}}>Test</Text>
    </Animated.View>}

    <TouchableOpacity onPress={() => setShow(!show)} style={styles.button}>
    <Text style={{fontSize: 35, color: "white"}}>{show ? "Hide" : "Show"}</Text>
    </TouchableOpacity>
  </Animated.View>
 );
}



const styles = StyleSheet.create({
 container: {
  width: width,
  height: height,
  alignItems: 'center',
  justifyContent: 'center',
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: 200,
    width: 340,
    zIndex: 9999,
    // width: 200,
    // height: 150,
  },

  button: {
    position: "absolute",

    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    width: 200,
    height: 80,
  }
});