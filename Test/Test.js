import React, {useRef, useState, memo, useCallback} from 'react';
import { View, Text, StyleSheet, Dimensions, } from 'react-native';
import {GestureHandlerRootView, PanGestureHandler, GestureDetector, FlatList } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withSpring, useAnimatedGestureHandler, useDerivedValue, runOnJS } from 'react-native-reanimated';

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";


import testArray from "./testArray.json"
import tradeArrayJson from "../assets/dummy/data/trade_array.json"
import TestItem from './TestItem';
import CustomPressable from '../components/RNComponents/CustomPressable';
import { FlashList } from '@shopify/flash-list';
import CustomList from '../components/custom_list/CustomList';
import Order from '../components/order/Order';
// import { SafeAreaProvider,  } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');





const App = () => {
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollOffset = useRef(0); // Store the previous scroll offset
  const lastScrollTime = useRef(Date.now()); // Store the previous scroll timestamp
  const flatListRef = useRef(null); // Reference to the FlatList component

  const [isScrollingDownDisabled, setIsScrollingDownDisabled] = useState(true); // State to track if scrolling down is disabled

  const debounceTimeout = useRef(null);


  const enableFlatListScrolling = (flatListRef) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: true }); // Enable scrolling
      console.log("scrolling enabled")
    }
  }

  const disableFlatListScrolling = (flatListRef) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: false }); // Enable scrolling
    }
  }

  const onScroll = useCallback((event) => {
    const currentOffset = event.nativeEvent.contentOffset.y; // Get current scroll offset
    const currentTime = Date.now(); // Get current timestamp

    const offsetDifference = Math.abs(currentOffset - lastScrollOffset.current); // Calculate offset difference
    const timeDifference = (currentTime - lastScrollTime.current) / 1000; // Calculate time difference in seconds

    // Calculate speed (pixels per second), considering that timeDifference should never be 0
    // const speed = offsetDifference / (timeDifference || 1);
    // setScrollSpeed(speed);

    const speed = Math.min(Math.max(offsetDifference / (timeDifference || 1), 0), 10000);

    // Update refs for the next calculation
    lastScrollOffset.current = currentOffset;
    lastScrollTime.current = currentTime;


    // if (speed >= 6000) {
    //   // Trigger the desired action here
    //   // Alert.alert("Scroll Speed Alert", "You are scrolling faster than 400 pixels/second!");
    //   // console.log("reached 10000 or more" )
    //   setIsScrollingDownDisabled(false)
    //   // disableFlatListScrolling(flatListRef)
    // } if (speed <= 3000 ) {
    //   // console.log("reached 5000 or less" )
    //   setIsScrollingDownDisabled(true)
    //   // enableFlatListScrolling(flatListRef)
    // }

    

     // Clear previous debounce timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Debounce the state update
      debounceTimeout.current = setTimeout(() => {
        if (speed >= 6000) {
          setIsScrollingDownDisabled(false);
        } else if (speed <= 3000) {
          setIsScrollingDownDisabled(true);
        }
      }, 0); // Adjust debounce duration as necessary
  }, []);

  // Function to enable or disable scrolling down
  const toggleScrollingDown = (disable) => {
    setIsScrollingDownDisabled(disable);
  };



  // setTimeout(() => {
  //   if (flatListRef.current) {
  //     flatListRef.current.setNativeProps({ scrollEnabled: true }); // Enable scrolling
  //     console.log("scrolling enabled")
  //   }
  // }, 5000);

  console.log("re render")

  const onMomentumScrollEnd = () => {
    // Set the speed to 0 when scrolling stops
    setScrollSpeed(0);
  };

  const renderItem = ({ item }) => {
    return <TestItem item={item} />;
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.speedText}>Scroll Speed: {scrollSpeed.toFixed(0)} pixels/second</Text>

      <CustomPressable onPress={() => toggleScrollingDown(!isScrollingDownDisabled)}  style={styles.button}>
        <Text style={styles.text}>
          {isScrollingDownDisabled ? 'Enable Scrolling Down' : 'Disable Scrolling Down'}
        </Text>
      </CustomPressable> */}


      <FlashList
        ref={flatListRef}
        data={testArray}
        scrollEnabled={isScrollingDownDisabled}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onScroll={onScroll}
        scrollEventThrottle={1} // Frequency of onScroll events
        estimatedItemSize={230}
      />
      {/* Toggle scrolling down with a button or condition */}

    </View>
  );
};





const AA = ({}) => {

  const ListItem = ({ item, index }) => {

    // console.log("index: ", index)
    
    return (
      <Order
        order={item}
        style={{ 
          // paddingTop: useResponsiveVerticalSpace(16),
          // backgroundColor: themeColors.background,
          // paddingHorizontal: useResponsiveHorizontalSpace(18)
        }}
      />
    );
  };

  return(
    <>
    <CustomList
    listItem={ListItem}
    listDataArray={tradeArrayJson}
    />
    </>
  )
}

const Test = () => {
  return (
    <SafeAreaProvider>
      {/* <App /> */}
      <AA/>
    </SafeAreaProvider>
  );
};

export default Test;








const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "pink",
    marginTop: 35,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "orange"
  },
  scrollView: {
    flex: 1,
    backgroundColor: "green"
  },
  content: {
    height: height * 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "yellow"
  },

  button: {
    height: 50,
    width: "100%",
    backgroundColor: "#89a832",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    color: "white",
  },

  speedText: {
    marginVertical: 10,
    color: "white",
    fontSize: 15,
  }
});