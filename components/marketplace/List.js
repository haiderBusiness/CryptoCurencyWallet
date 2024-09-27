
import React, { useEffect, useState, useRef, memo, useMemo, useCallback} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  // Animated,
  Dimensions,
  FlatList,
  Image
} from "react-native";

import {
    useResponsiveHeight,
    useResponsiveHorizontalSpace,
    useResponsiveRadius,
    useResponsiveVerticalSpace,
  } from "@hooks/useResponsiveness";


import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderWBT from "../HeaderWBT";

import PlaceHolderListHeader from "./PlaceHolderListHeader"

import useScrollController, { useScrollHandler } from './useScrollHandler'; 
import ListCell from "./ListCell";
import TestComponent from "../TestComponent";

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { rest, transform } from "lodash";

import {captureRef} from "react-native-view-shot";


const List = ({
    receivedListStyleStyle, 
    headerLayout, 
    // listRef, 
    dataArray, 
    scrollMaxSpeed, 
    scrollMinSpeed, 
    showStickyHeader,
    removeHeader,
    removeBigTitle,
    bigHeaderTitle,
    keyExtractor,
    listItem,
    listHeader,
    navigation,
    setTopHeaderOpacity,
    show = true,
    showSearchField
  }) => {
  
  
  
    const { width, height } = Dimensions.get("window");

    const listRef = useRef(null)
    const AnimatedViewRef = useRef(null)
  
    // console.log("out: ", buyingTopHeaderOpacity)
    const { onScroll, scrolling, topHeaderOpacity } = useScrollHandler(listRef,scrollMinSpeed, scrollMaxSpeed);

    


    //FIX remove react-native-view-shot (if not used)
    // const [snapshotImg, setSnapshotImg] = useState(null)
    // const snapshot = async () => {
    //     const result = await captureRef(AnimatedViewRef);
    //     setSnapshotImg(result)
    //     console.log("result: ", result)
        
    // }

    // useEffect(() => {
    //     console.log("snapshotImg: ", snapshotImg)
    // },[snapshotImg])
  
  
  
    const imageTranslatX = useSharedValue(0)
    const listTranslatX = useSharedValue(0)
  
  
  
    useEffect(() => {
      setTopHeaderOpacity(topHeaderOpacity)
    }, [topHeaderOpacity, show])
  
    
  
    const [display, setDisplay] = useState("flex")
    const [renders, setRenders] = useState(0)
  
    // useEffect(() => {
  
    //   if(!show) {
    //     imageTranslatX.value = withTiming(+width)
    //     // listTranslatX.value = withTiming(0)
    //     if(renders > 0) {
    //         snapshot()
    //     }
    //     setRenders(renders + 1)
    //     setDisplay("none")
    //   } else {
    //     imageTranslatX.value = withTiming(0)
    //     setTimeout(() => {
    //     setSnapshotImg(null)
    //     }, 4000)
    //     // listTranslatX.value = withTiming(0)
    //     setDisplay("flex")
    //   }
      
    // }, [show])
  
    const animatedStyle = useAnimatedStyle(() => {
      return{
        transform: [{translateX: imageTranslatX.value}]
      }
    })
  
  
  
  
    const renderItem = ({item, index}) => {
  
      // console.log('re-render: ',randomNumber(), ' at MarketPlaceList file')
  
  
      return(
        <>
         {/* <AdditionalComponent /> */}
  
         <ListCell
        item={item} 
        index={index}
        removeBigTitle={removeBigTitle}
        removeHeader={removeHeader}
        listItem={listItem}
        listHeader={listHeader} 
        bigHeaderTitle={bigHeaderTitle}
        searchField={showSearchField}
        navigation={navigation}
        />
        </>
  
      )
    }
  
    return(
        // <>



        // {snapshotImg && <Animated.View 
        // style={[animatedStyle,{
        //     width: "100%", height: "100%", position: "absolute", top:0,
        //     zIndex: 1,
        //     backgroundColor: receivedListStyleStyle.backgroundColor,
        //     backgroundColor: "red"
        // }]}
        // >
        //     <Image 
        //       resizeMode="contain"
        //       style={{
        //         width: "100%", height: "100%", 
        //         // backgroundColor: "green"
                
        //       }}
        //       source={{uri: snapshotImg}}
        //     />
        // </Animated.View> }
        
                /* {snapshotImg && 
            <Image 
              resizeMode="contain"
              style={{
                width: "100%", height: "100%", position: "absolute", top:0, 
              }}
              source={{uri: snapshotImg}}
            />
        } */



      <Animated.View style={[  
        // receivedListStyleStyle,
        {
        flex: 1,
        width: width,
        // display: show ? "flex" : "none"
        display: show ? "flex" : "none"
        }]}
        ref={AnimatedViewRef}
        >
      <FlashList
      contentContainerStyle={{paddingTop: headerLayout && headerLayout.height ? headerLayout.height : 0,}}
      ref={listRef}
      data={dataArray}
      renderItem={renderItem}
      // ListHeaderComponent={FlatListHeader}
      estimatedItemSize={230}
      onScroll={onScroll}
      scrollEnabled={scrolling}
      // onScroll={scrollingEnabled}
      stickyHeaderIndices={showStickyHeader}
      keyExtractor={keyExtractor}
      // scrollEventThrottle={16}
      // onMomentumScrollEnd={() => {console.log("momentum scroll ended")}}
      // onMomentumScrollEnd={onMomentumScrollEnd}
      // disableIntervalMomentum={false}
      // decelerationRate={"normal"}
      // refreshing={false}
      // windowSize={windowSize}
      // maxToRenderPerBatch={windowSize}
      // decelerationRate="fast"
      
     
      // decelerationRate={0}
      // stickyHeaderIndices={[0]}
      />
  
      {/* <FlatList
      ref={listRef}
      data={dataArray}
      renderItem={renderItem}
      onScroll={onScroll}
      stickyHeaderIndices={showStickyHeader}
      keyExtractor={keyExtractor}
      scrollEnabled={scrolling}
      // onMomentumScrollEnd={() => {console.log("momentum scroll ended")}}
      /> */}
   </Animated.View>
//    </>
    )
  }


  export default List;