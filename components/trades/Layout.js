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
import TestComponent from "../TestComponent";
import TabsSlider from "./TabsSlider";

let numOfRenders = 0
export default function Layout({

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
  headerOnLeftImage1Press,
  headerOnLeftImage2Press,
  headerOnLeftImage3Press,
  headerOnRightImage1Press,
  headerOnRightImage2Press,
  headerOnRightImage3Press,
  headerStyle = viewStyleSample,
  headerBlur = true,


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


  const themeColors = useThemeColors();


  const listRef = useRef(null)


  const scrollMaxSpeed = useMemo(() => {
    return scrollSpeed === "fast" ? 10000 :
           scrollSpeed === "normal" ? 6000 :
           scrollSpeed === "slow" ? 4000 :
           scrollSpeed === "slowest" ? 2500 :
           0; // Default value if none of the conditions match
  }, [scrollSpeed]);

  const scrollMinSpeed =  scrollMaxSpeed / 2





  const [dataArray, setDataArray] = useState(listDataArray ? listDataArray : placeHolderArray)


  
  useEffect(() => {
    if(numOfRenders < 1) 
      { 
      if(dataArray && dataArray.length > 0){
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
    }

    

  }, [])




  if (__DEV__) { 
    if(numOfRenders >= 2) {
      console.warn(`Reload to reflect changes in ${this.name}`)
    }
  }

  





  const [headerLayout, setHeaderLayout] = useState(null)
  const [topHeaderOpacity, setTopHeaderOpacity] = useState(null)

  const handlrHeaderLayout = (layout) => {
    if(layout) {
      const { height, width, x, y } = layout;
      setHeaderLayout({ height, width, x, y });
    }

  };

  const [update, setUpdate] = useState(false)

  setTimeout(()=> {
    setUpdate(!update)
    // console.log('re render:', ' at MarketPlaceList file')
  }, 3000)


  function onSelectedTabChange (value) {

    if(value && value.toLowerCase() === "buying") {
      setUpdate(!update)
      // setDataArray(listDataArray.buying)
      // console.log("listDataArray.buying[0]: ", listDataArray.selling[0])
    } else if(value && value.toLowerCase() === "selling") {
      setUpdate(!update)
      // setDataArray(listDataArray.selling)
      // console.log("listDataArray.buying[0]: ", listDataArray.selling[0])
    } else {
      console.error(`Error: the value of selected tab is ${value} in ${this.name}`)
    }
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
 

  const backgroundColor = receivedListStyleStyle.backgroundColor
  ? receivedListStyleStyle.backgroundColor
  : themeColors.background;

  return (
    // <SafeAreaView>
      <View style={{flex: 1, backgroundColor: backgroundColor}}>
        
         {/* -> Default header if not disabled  */}
        {!removeHeader && !customHeaderComponent &&      
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
          onLeftImage1Press={headerOnLeftImage1Press}
          onLeftImage2Press={headerOnLeftImage2Press}
          onLeftImage3Press={headerOnLeftImage3Press}
          onRightImage1Press={headerOnRightImage1Press}
          onRightImage2Press={headerOnRightImage2Press}
          onRightImage3Press={headerOnRightImage3Press}
          title={headerTitle}
          titleAndBackgroundAnimationValue={topHeaderOpacity}
          headerLayout={(layout) => setHeaderLayout(layout)}
          style={headerStyle ? headerStyle : defaultStyles}
          headerBlur={headerBlur}
          // AdditionalComponent={() => {
          //   return (
          //     <AdditionalComponent onSelectedTabChange={onSelectedTabChange} updateTabsSlider={false}/>
          //   )
          // }}
        /> 
        }

        {/* -> Custom header if there is  */}
        {!removeHeader && !!customHeaderComponent &&customHeaderComponent}


       

        <View style={{flex: 1,}}>
        {dataArray.buying && dataArray.buying.length > 0 &&
          <List
          receivedListStyleStyle 
          headerLayout={headerLayout}
          listRef={listRef}
          dataArray={dataArray.buying}
          scrollMaxSpeed={scrollMaxSpeed}
          scrollMinSpeed={scrollMinSpeed}
          setTopHeaderOpacity={setTopHeaderOpacity}
        
          removeHeader={removeHeader}
          removeBigTitle={removeBigTitle}
          bigHeaderTitle={bigHeaderTitle}
          showStickyHeader={showStickyHeader}
          keyExtractor={keyExtractor}
          listItem={listItem}
          listHeader={listHeader}
          navigation={navigation}
        />
        }

        {!dataArray || dataArray.length < 1 && <View style={{flex: 1, color: "black", justifyContent: "center", alignItems: "center"}}>
          <Text>listDataArray is undefined... please a valid array</Text>
        </View>}

        </View>
        {/* -> List */}

        

      </View>
    // </SafeAreaView>
  );
}


const AdditionalComponent = ({onSelectedTabChange, updateTabsSlider}) => {


  return(
      <TabsSlider onSelectedTabChange={(value) => onSelectedTabChange(value)} update={updateTabsSlider}/>
  )
}







const Test = ({
  receivedListStyleStyle, 
}) => {

  const RenderItem = ({item, index}) => {

    return(
      <>
       <AdditionalComponent />
      </>

    )
  }

  return(
    <View style={[ receivedListStyleStyle, {flex: 1, }]}>
      <RenderItem/>
    </View>
  )
}







const ListWithScrollListen = ({
  receivedListStyleStyle, 
  headerLayout, 
  listRef, 
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


  // children <-
  TopBarHeader,
}) => {


  const { onScroll, scrolling, topHeaderOpacity} = useScrollHandler(listRef,scrollMinSpeed, scrollMaxSpeed);

  useEffect(() => {
    setTopHeaderOpacity(topHeaderOpacity)
  }, [topHeaderOpacity])



  const renderItem = ({item, index}) => {

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
      navigation={navigation}
      />
      </>

    )
  }

  return(
    <>
      {TopBarHeader}
     <View style={[ receivedListStyleStyle, {flex: 1, }]}>
        <FlashList
        contentContainerStyle={{paddingTop: headerLayout && headerLayout.height ? headerLayout.height : 0}}
        ref={listRef}
        data={dataArray.sort((a,b) => a.priceAdjustmentPercentage - b.priceAdjustmentPercentage)}
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
 </>
  )
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
