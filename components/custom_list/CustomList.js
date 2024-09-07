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
} from "react-native";

import useThemeColors from "@hooks/useThemeColors";

import TopBarHeader from "./ListTopBarHeader";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import {
  useResponsiveHeight,
  useResponsiveHorizontalSpace,
  useResponsiveRadius,
  useResponsiveVerticalSpace,
} from "@hooks/useResponsiveness";

// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import viewStyleSample from "../RNComponents/viewStyleSample";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderWBT from "../HeaderWBT";
import placeHolderArray from "./placeholder.json"
import PlaceHolderListHeader from "./PlaceHolderListHeader"

import useScrollController, { useScrollHandler } from './useScrollHandler'; 

import ListCell from "./ListCell";

let numOfRenders = 0
export default function CustomList({

  // -> General <-
  children,
  navigation,


  // -> TopBarHeader <-
  removeHeader = false,
  removeBigTitle = false,
  removeTopBarTitle = false,
  bigHeaderTitle = "bigHeaderTitle",
  headerTitle = "headerTitle",
  headerLeftComponent,
  headerRightComponent,
  headerLeftImageSource1,
  headerLeftImageSource2, 
  headerLeftImageSource3, 
  headerRightImageSource1,
  headerRightImageSource2,
  headerRightImageSource3,
  headerTitleComponent,
  headerOnLeftImage1Click,
  headerOnLeftImage2Click,
  headerOnLeftImage3Click,
  headerOnRightImage1Click,
  headerOnRightImage2Click,
  headerOnRightImage3Click,
  headerStyle = viewStyleSample,


  // -> List <-
  customHeaderComponent,
  listDataArray,
  listItem,
  listHeader,
  isStikcyListHeader = false,
  listStyle = viewStyleSample,
  scrollSpeed = "slow"
}) {
  const receivedListStyleStyle = listStyle.flex !== 1000 ? listStyle : {};

  // const tabBarHeight = useBottomTabBarHeight();

  const themeColors = useThemeColors();



  const { width, height } = Dimensions.get("window");

  const backgroundColor = receivedListStyleStyle.backgroundColor
    ? receivedListStyleStyle.backgroundColor
    : themeColors.background;


  // console.log("tabBarheight: ", tabBarHeight);
  // const topHeaderOpacity = useRef(new Animated.Value(1)).current;

  // r

  const listRef = useRef(null)


  // const [scrolling, setScrolling] = useState(true)


  // const scrollMaxSpeed = scrollSpeed === "fast" ? 10000 : scrollSpeed === "normal" ? 6000 : scrollSpeed === "slow" === 4000
  // const scrollMinSpeed = scrollMaxSpeed / 2
  const scrollMaxSpeed = useMemo(() => {
    return scrollSpeed === "fast" ? 10000 :
           scrollSpeed === "normal" ? 6000 :
           scrollSpeed === "slow" ? 4000 :
           scrollSpeed === "slowest" ? 2500 :
           0; // Default value if none of the conditions match
  }, [scrollSpeed]);

  const scrollMinSpeed = useMemo(() => scrollMaxSpeed / 2, [scrollMaxSpeed]);

  // const { onScroll } = useScrollHandler(scrolling, setScrolling, listRef, topHeaderOpacity, fadeInTopHeader, fadeOutTopHeader, scrollMinSpeed, scrollMaxSpeed);
  const { onScroll, scrolling, topHeaderOpacity} = useScrollHandler(listRef,scrollMinSpeed, scrollMaxSpeed);

  // const scrollingEnabled = useScrollController(listRef);




  const [dataArray, setDataArray] = useState(listDataArray ? listDataArray : placeHolderArray)
  // const [numOfRenders, setNumOfRenders] = useState(0)

  // const [headerStatus, setHeaderStatus] = useState("listHeader and bigTitle")

  // console.log("refreshed")

  
  useEffect(() => {
    if(numOfRenders < 1) 
      { 
      if(
        // (!headerStatus || !headerStatus.includes("bigTitle")) &&
         isStikcyListHeader) {
        dataArray.unshift("listHeader")
        setDataArray(dataArray)
      }
      if(
        // (!headerStatus || !headerStatus.includes("bigTitle")) &&
       !removeBigTitle && !removeHeader && bigHeaderTitle) {
        dataArray.unshift("bigTitle")
        setDataArray(dataArray)
      } 

      numOfRenders =+ 1
    }
    

    // if(numOfRenders < 2) {
    //   setNumOfRenders(numOfRenders + 1)
     
    // }

    

  }, [])




  

  // const onMomentumScrollEnd = useCallback(() => {

  //   console.log("scrolling",scrolling)
  //   setScrolling(true); // The scroll momentum has stopped, so the user is no longer scrolling
  // }, []);


  if (__DEV__) { 
    if(numOfRenders >= 2) {
      console.warn(`Reload to reflect changes in CustomList`)
    }
  }

  



  // Custom comparison function to check if item has changed
  const areEqual = (prevProps, nextProps) => {
    // Perform a shallow comparison of item props
    return prevProps.item === nextProps.item;
  };



  const MemoizedRenderTopBarHeader = memo(() => {

    return(
      <>
        <TopBarHeader 
        leftComponent={headerLeftComponent}
        rightComponent={headerRightComponent}
        leftImageSource1={headerLeftImageSource1}
        leftImageSource2={headerLeftImageSource2} 
        leftImageSource3={headerLeftImageSource3} 
        rightImageSource1={headerRightImageSource1}
        rightImageSource2={headerRightImageSource2}
        rightImageSource3={headerRightImageSource3}
        titleComponent={headerTitleComponent}
        onLeftImage1Click={headerOnLeftImage1Click}
        onLeftImage2Click={headerOnLeftImage2Click}
        onLeftImage3Click={headerOnLeftImage3Click}
        onRightImage1Click={headerOnRightImage1Click}
        onRightImage2Click={headerOnRightImage2Click}
        onRightImage3Click={headerOnRightImage3Click}
        title={headerTitle}
        titleAndBackgroundAnimationValue={topHeaderOpacity}
        style={headerStyle}
        />
    </>
    )
  }, areEqual);


  const RenderTopBarHeader = () => {
    return <MemoizedRenderTopBarHeader/>;
  };


  const renderItem = ({item, index}) => {
    return(
      <ListCell
      item={item} index={index}
      removeBigTitle={removeBigTitle}
      removeHeader={removeHeader}
      listItem={listItem}
      listHeader={listHeader} 
      bigHeaderTitle={bigHeaderTitle}
      navigation={navigation}

      />
    )
  }



  const windowSize = placeHolderArray.length > 50 ? placeHolderArray.length / 4 : 21;

  const keyExtractor = (item, index) => index;

  const showStickyHeader =
  !removeHeader && isStikcyListHeader ? [0] 
  :
  !removeBigTitle && isStikcyListHeader ? [1] 
  : 
  isStikcyListHeader ? [0] 
  : null
 

  return (
    // <SafeAreaView>
      <View style={{flex: 1, backgroundColor: themeColors.backgroundColor}}>

        
        
         {/* -> Default header if not disabled  */}
        {!removeHeader && !customHeaderComponent && <RenderTopBarHeader/> }

        {/* -> Custom header if there is  */}
        {!removeHeader && !!customHeaderComponent &&customHeaderComponent}

        {/* -> List */}
        <View style={[ receivedListStyleStyle, {flex: 1}]}>
          <FlashList
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
       </View>
      </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: useResponsiveVerticalSpace(10),
  },

  child: {
    width: "100%",
    height: "100%",
    paddingHorizontal: useResponsiveHorizontalSpace(18),
  },

  text: {
    color: "white",
  },
});
