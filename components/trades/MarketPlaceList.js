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

import {
  useResponsiveHeight,
  useResponsiveHorizontalSpace,
  useResponsiveRadius,
  useResponsiveVerticalSpace,
} from "@hooks/useResponsiveness";

// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import viewStyleSample from "../RNComponents/viewStyleSample";

import placeHolderArray from "./placeholder.json"

import TabsSlider from "./TabsSlider";
import List from "./List";


let numOfRenders = 0
export default function MarketPlaceList({

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
  showSearchField = true, 


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








  // console.log("tabBarheight: ", tabBarHeight);
  // const buyingTopHeaderOpacity = useRef(new Animated.Value(1)).current;

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

  const scrollMinSpeed =  scrollMaxSpeed / 2





  const [dataArray, setDataArray] = useState(listDataArray ? listDataArray : placeHolderArray)

  const [buyingArray, setBuyingArray] = useState(listDataArray && listDataArray.buying ? listDataArray.buying : [])
  const [sellingArray, setSellingArray] = useState(listDataArray && listDataArray.selling ? listDataArray.selling : [])

 const [isBuyingList, setIsBuyingList] = useState(true)
 const [isSellingList, setIsSellingList] = useState(false)


  
  useEffect(() => {
    if(numOfRenders < 1) 
      { 
      if(buyingArray && buyingArray.length > 0){

        const buyingFirstItem = buyingArray[0]
        const sellingFirstItem = buyingArray[0]
        const buyingSecondItem = buyingArray[1]
        const sellingSecondItem = buyingArray[1]


        if (showSearchField) {
          buyingArray.unshift("searchField")
          setBuyingArray(buyingArray)

          sellingArray.unshift("searchField");
          setSellingArray(sellingArray)
        }


        if(
          // (!headerStatus || !headerStatus.includes("bigTitle")) &&
          isStikcyListHeader
        ) {

          if(buyingFirstItem !== "listHeader") {
            buyingArray.unshift("listHeader")
            setBuyingArray(buyingArray)
          }
          if(sellingFirstItem !== "listHeader") {
            sellingArray.unshift("listHeader");
            setSellingArray(sellingArray)
          }
         
          
          
          
        }
        if(
          // (!headerStatus || !headerStatus.includes("bigTitle")) &&
        !removeBigTitle && !removeHeader && bigHeaderTitle) {

          if(isStikcyListHeader) {

            // if statment to prevent re adding the same item
            if(buyingSecondItem !== "bigTitle") {
              buyingArray.unshift("bigTitle")
              setBuyingArray(buyingArray)
            }
            if(sellingSecondItem !== "bigTitle") {
              sellingArray.unshift("bigTitle");
              setSellingArray(sellingArray)
            }
          } else {

            // if statment to prevent re adding the same item
            if(buyingSecondItem !== "bigTitle") {
              buyingArray.unshift("bigTitle")
              setBuyingArray(buyingArray)
            }
            if(sellingSecondItem !== "bigTitle") {
              sellingArray.unshift("bigTitle");
              setSellingArray(sellingArray)
            }
          }
          // dataArray.unshift("bigTitle")
          // setDataArray(dataArray)
        } 



        numOfRenders =+ 1
      }
    }

    

  }, [buyingArray, sellingArray])




  if (__DEV__) { 
    if(numOfRenders >= 2) {
      console.warn(`Reload to reflect changes in MarketPlaceList`)
    }
  }

  





  const [headerLayout, setHeaderLayout] = useState(null)
  const [buyingTopHeaderOpacity, setBuyingTopHeaderOpacity] = useState(null)
  const [sellingTopHeaderOpacity, setSellingTopHeaderOpacity] = useState(null)

  const handlrHeaderLayout = (layout) => {
    if(layout) {
      const { height, width, x, y } = layout;
      setHeaderLayout({ height, width, x, y });
    }

  };

  const [update, setUpdate] = useState(false)

  // setTimeout(()=> {
  //   setUpdate(!update)
  //   // console.log('re render:', ' at MarketPlaceList file')
  // }, 3000)


  function onSelectedTabChange (value, index) {

    if(index === 0) {
      // setUpdate(!update)
      // setDataArray(listDataArray.buying)
      // console.log("listDataArray.buying[0]: ", listDataArray.selling[0])
      // setIsSellingList(false)
      // setIsBuyingList(true)
      scrollTo(-1)
    } else if(index === 1) {
      // console.log("here")
      // setUpdate(!update)
      // setDataArray(listDataArray.selling)
      // console.log("listDataArray.buying[0]: ", listDataArray.selling[0])
      // setIsSellingList(true)
      // setIsBuyingList(false)
      scrollTo(2)
    } else {
      console.error(`Error: the value of selected tab is ${value} in MarketPlaceList`)
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


  const scrollViewRef = useRef(null);

  const { width, height } = Dimensions.get("window");


  const scrollTo = (index) => {

    if(scrollViewRef && scrollViewRef.current) {
      
      scrollViewRef.current.scrollTo({
        x:width * index,
        y:0,
        animated: true
      })
    }

  }

  console.log("here")

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
          onFirstTabAnimation={buyingTopHeaderOpacity}
          onSecondTabAnimation={sellingTopHeaderOpacity}
          // titleAndBackgroundAnimationValue={isBuyingList ? buyingTopHeaderOpacity : sellingTopHeaderOpacity}
          headerLayout={(layout) => setHeaderLayout(layout)}
          style={headerStyle ? headerStyle : defaultStyles}
          headerBlur={headerBlur}
          AdditionalComponent={TabsSlider}
          onSelectedTabChange={onSelectedTabChange}
          topTabsResultSpeed={"fast"}
        /> 
        }

        {/* -> Custom header if there is  */}
        {!removeHeader && !!customHeaderComponent &&customHeaderComponent}


       


          <ScrollView scrollEnabled={false} ref={scrollViewRef} horizontal={true} style={{flex: 1}}>

          
          {buyingArray && buyingArray.length > 0 &&
            <List
              receivedListStyleStyle
              headerLayout={headerLayout}
              listRef={listRef}
              dataArray={buyingArray}
              scrollMaxSpeed={scrollMaxSpeed}
              scrollMinSpeed={scrollMinSpeed}
              setTopHeaderOpacity={setBuyingTopHeaderOpacity}
            
              removeHeader={removeHeader}
              removeBigTitle={removeBigTitle}
              bigHeaderTitle={bigHeaderTitle}
              showStickyHeader={showStickyHeader}
              keyExtractor={keyExtractor}
              listItem={listItem}
              listHeader={listHeader}
              navigation={navigation}
              // show={isBuyingList}
              show={true}
              showSearchField={showSearchField}
            />
          }



          {sellingArray && sellingArray.length > 0 &&
            <List
              receivedListStyleStyle 
              headerLayout={headerLayout}
              listRef={listRef}
              dataArray={sellingArray}
              scrollMaxSpeed={scrollMaxSpeed}
              scrollMinSpeed={scrollMinSpeed}
              setTopHeaderOpacity={setSellingTopHeaderOpacity}
              removeHeader={removeHeader}
              removeBigTitle={removeBigTitle}
              bigHeaderTitle={bigHeaderTitle}
              showStickyHeader={showStickyHeader}
              keyExtractor={keyExtractor}
              listItem={listItem}
              listHeader={listHeader}
              navigation={navigation}
              // show={isSellingList}
              show={true}
              showSearchField={showSearchField}
            />
          }
          </ScrollView>

 
        {/* -> List */}


        {(!sellingArray || sellingArray.length < 1) && (!buyingArray || buyingArray.length < 1) && <View style={{flex: 1, color: "black", justifyContent: "center", alignItems: "center"}}>
          <Text>listDataArray is undefined... please a valid array</Text>
        </View>}
        

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
