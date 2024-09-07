import React, {useRef, useState, memo, useCallback} from 'react';
import { View, Text, StyleSheet, Dimensions, } from 'react-native';
import {GestureHandlerRootView, PanGestureHandler, GestureDetector, FlatList } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withSpring, useAnimatedGestureHandler, useDerivedValue, runOnJS } from 'react-native-reanimated';

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";


import testArray from "./testArray.json"
import TestItem from './TestItem';
import CustomPressable from '../components/RNComponents/CustomPressable';
// import { SafeAreaProvider,  } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

// const App = () => {
//   const scrollY = useSharedValue(0);
//   const flatListRef = useRef(null);

//   // Scroll handler with speed adjustment
//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       // Apply scaling to slow down the scroll speed
//       scrollY.value = event.contentOffset.y * 0.9; // Adjust the scale factor to slow down the scroll speed (0.5 = 50% slower)
//     },
//   });

//   const renderItem = ({ item }) => {
//     return (
//       <TestItem item={item} />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={testArray}
//         renderItem={renderItem}
//         onScroll={scrollHandler}
//         scrollEventThrottle={16} // Adjust for smoother scrolling
//         showsVerticalScrollIndicator={true}
//         bounces={true} // Optional: Disable bounce effect
//       />
//     </View>
//   );
// };


// const App = () => {
//   const [scrollSpeed, setScrollSpeed] = useState(0);
//   const lastScrollOffset = useRef(0); // Store the previous scroll offset
//   const lastScrollTime = useRef(Date.now()); // Store the previous scroll timestamp
//   const flatListRef = useRef(null); // Reference to the FlatList component

//   const SCROLL_SPEED_THRESHOLD = 2000; // Speed threshold in pixels/second
//   const SLOWDOWN_FACTOR = 0.5; // Factor by which to slow down the scroll

//   const onScroll = (event) => {
//     const currentOffset = event.nativeEvent.contentOffset.y; // Get current scroll offset
//     const currentTime = Date.now(); // Get current timestamp

//     const offsetDifference = Math.abs(currentOffset - lastScrollOffset.current); // Calculate offset difference
//     const timeDifference = (currentTime - lastScrollTime.current) / 1000; // Calculate time difference in seconds

//     const speed = offsetDifference / timeDifference; // Calculate speed (pixels per second)
//     setScrollSpeed(speed);

//     // If the speed exceeds the threshold, slow down the scroll
//     if (speed > SCROLL_SPEED_THRESHOLD) {
//       const adjustedOffset = lastScrollOffset.current + offsetDifference * SLOWDOWN_FACTOR;

//       // Programmatically adjust the scroll position
//       if (flatListRef.current) {
//         // flatListRef.current.scrollToOffset({
//         //   offset: adjustedOffset,
//         //   animated: false, // Disable animation to make the adjustment seamless
//         // });
//       }
//     }

//     // Update refs
//     lastScrollOffset.current = currentOffset;
//     lastScrollTime.current = currentTime;
//   };

//   const renderItem = ({ item }) => {
//     return (
//       <TestItem item={item} />
//     );
//   };

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView>
//         <View style={styles.container}>
//           <Text style={styles.speedText}>Scroll Speed: {scrollSpeed.toFixed(2)} pixels/second</Text>
//           {/* <FlatList
//             ref={flatListRef}
//             data={testArray}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             onScroll={onScroll}
//             scrollEventThrottle={16} // Frequency of onScroll events
//             decelerationRate="fast"
//           /> */}
//         </View>
//       </SafeAreaView>
//      </SafeAreaProvider>
    

//   );
// };



const App = () => {
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollOffset = useRef(0); // Store the previous scroll offset
  const lastScrollTime = useRef(Date.now()); // Store the previous scroll timestamp
  const flatListRef = useRef(null); // Reference to the FlatList component

  const SCROLL_SPEED_THRESHOLD = 2000; // Speed threshold in pixels/second
  const SLOWDOWN_FACTOR = 0.5; // Factor by which to slow down the scroll
  const [isScrollingDownDisabled, setIsScrollingDownDisabled] = useState(true); // State to track if scrolling down is disabled

  const debounceTimeout = useRef(null);
  // const onScroll = (event) => {
  //   const currentOffset = event.nativeEvent.contentOffset.y; // Get current scroll offset
  //   const currentTime = Date.now(); // Get current timestamp

  //   const offsetDifference = Math.abs(currentOffset - lastScrollOffset.current); // Calculate offset difference
  //   const timeDifference = (currentTime - lastScrollTime.current) / 1000; // Calculate time difference in seconds

  //   const speed = offsetDifference / timeDifference; // Calculate speed (pixels per second)
  //   setScrollSpeed(speed);

  //   // Check if the user is scrolling down
  //   const isScrollingDown = currentOffset > lastScrollOffset.current;

  //   // Disable scrolling down if the condition is met
  //   if (isScrollingDown && isScrollingDownDisabled) {
  //     // Prevent further downward scrolling
  //     if (flatListRef.current) {
  //       // flatListRef.current.scrollToOffset({
  //       //   offset: lastScrollOffset.current, // Keep the scroll at the last known position
  //       //   animated: false,
  //       // });
  //     }
  //   } else {
  //     // If not scrolling down or scrolling down is allowed, update the last scroll position
  //     lastScrollOffset.current = currentOffset;
  //     lastScrollTime.current = currentTime;
  //   }
  // };


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
      }, 50); // Adjust debounce duration as necessary
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


      <FlatList
        ref={flatListRef}
        data={testArray}
        scrollEnabled={isScrollingDownDisabled}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onScroll={onScroll}
        scrollEventThrottle={16} // Frequency of onScroll events
      />
      {/* Toggle scrolling down with a button or condition */}

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "red",
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


const Test = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
};

export default Test;
