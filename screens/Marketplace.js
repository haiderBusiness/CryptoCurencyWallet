import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Pressable } from "react-native";
import useThemeColors from "../hooks/useThemeColors";


import {
  useResponsiveVerticalSpace,
  useResponsiveHorizontalSpace,
  useResponsiveFontSize,
} from "../hooks/useResponsiveness";
import Trade from "../components/trade/Trade";
import { interface_plus_black, interfaceAddDocumentOutlineBlack, interfaceFilterOutlineBlack, interfaceHistoryOutlineBlack } from "../assets/dummy/icons_pictures";
import { getTrades, getOrders } from "../backend/controllers/tradeController";
import CustomList from "../components/custom_list/CustomList";

import Store from "../redux/Store.js"
import { useSelector } from "react-redux";
import { setTrades, setMarketPlaceFilters } from "../redux/actions";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScrollViewWithAnimatedHeader from "../components/ScrollViewWithAnimatedHeader.js";
import List from "../components/marketplace/MarketPlaceList.js";
import MarketPlaceList from "../components/marketplace/MarketPlaceList.js";
import Modal from "../components/modal/OldModal.js";







export default function Marketplace({ route, navigation }) {
  const themeColors = useThemeColors();

  const Tab = createMaterialTopTabNavigator()

  const trades  = useSelector((state) => state.trades);

  const dispatch = Store.dispatch

  const onFilterIconClick = () => {
    console.log("clicked")
    dispatch(setMarketPlaceFilters({"selling": "selling", "buying": "buying"}))
  }

  // useEffect(() => {
  //   dispatch(setTrades({"updated": "updated"}))
  // }, [])



  const ListItem = 
  // React.memo(
    ({ item, index }) => {
    //  console.log("item.coin: ", item.coin)
    
    return (
      <Trade
        tradeInfo={item}
        style={{ 
          paddingVertical: useResponsiveVerticalSpace(6),
          marginVertical: useResponsiveHorizontalSpace(6),
          // backgroundColor: "red",
          backgroundColor: themeColors.background3,
          paddingHorizontal: useResponsiveHorizontalSpace(18)
        }}
      />
    );
  }
// );


 




  return (
    // <ScrollViewWithAnimatedHeader headerTitle={"Main"}  style={{}} navigation={navigation}>

      // <CustomList
      //   listDataArray={trades.selling}
      //   listItem={ListItem}
      //   // headerTitle="MarketPlace"
      //   headerTitleComponent={({styles}) => {
      //     return(
      //       <View style={{...styles}}>
      //           <Text style={{fontSize: 17, fontWeight: "600"}}>Hello pepole</Text>
      //       </View>
 
      //     )
      //   }}
      //   bigHeaderTitle="Marketplace"
      //   headerRightImageSource1={interface_plus_black}
      //   headerRightImageSource2={interfaceHistoryOutlineBlack}
      //   headerLeftImageSource1={interfaceFilterOutlineBlack}
      //   scrollSpeed="slowest"
      //   listStyle={{backgroundColor: themeColors.background3}}
      //   headerStyle={{backgroundColor: themeColors.background3}}
      //   // removeBigTitle 
      //   // removeHeader
      //   // listHeader={() => (<Text>Hellooooooo</Text>)}
      //   // isStikcyListHeader={true}
      //   /> 



    //   <View style={{marginTop: 40, height: 600}}>
    //     {/* <Search/> */}

    <>

      <MarketPlaceList 
      listDataArray={trades}
      listItem={ListItem}
      headerTitle="MarketPlace"
      bigHeaderTitle="Marketplace"
      headerRightImageSource1={interface_plus_black}
      headerRightImageSource2={interfaceHistoryOutlineBlack}
      headerLeftImageSource1={interfaceFilterOutlineBlack}
      headerOnLeftImage1Click={onFilterIconClick}
      scrollSpeed="slowest"
      listStyle={{backgroundColor: themeColors.background3}}
      headerStyle={{backgroundColor: themeColors.background3}}
      navigation={navigation}
      // removeBigTitle 
      // removeHeader
      // listHeader={() => (<Text>Hellooooooo</Text>)}
      // isStikcyListHeader={true}
      />
    </>

    //   </View>
   

      
        

  // </ScrollViewWithAnimatedHeader>
  );
}



const SellingTab = ({ListItem, data}) => {

  return (
      <CustomList
      listDataArray={data}
      listItem={ListItem}
      headerTitle="MarketPlace"
      bigHeaderTitle="Marketplace"
      headerRightImageSource1={interface_plus_black}
      headerRightImageSource2={interfaceHistoryOutlineBlack}
      headerLeftImageSource1={interfaceFilterOutlineBlack}
      scrollSpeed="slowest"
      listStyle={{backgroundColor: themeColors.background3}}
      headerStyle={{backgroundColor: themeColors.background3}}
      // removeBigTitle 
      // removeHeader
      // listHeader={() => (<Text>Hellooooooo</Text>)}
      // isStikcyListHeader={true}
      /> 
  )
}


const BuyingTab = ({ListItem, data}) => {

  return (
      <CustomList
      listDataArray={data}
      listItem={ListItem}
      headerTitle="MarketPlace"
      bigHeaderTitle="Marketplace"
      headerRightImageSource1={interface_plus_black}
      headerRightImageSource2={interfaceHistoryOutlineBlack}
      headerLeftImageSource1={interfaceFilterOutlineBlack}
      scrollSpeed="slowest"
      listStyle={{backgroundColor: themeColors.background3}}
      headerStyle={{backgroundColor: themeColors.background3}}
      // removeBigTitle 
      // removeHeader
      // listHeader={() => (<Text>Hellooooooo</Text>)}
      // isStikcyListHeader={true}
      /> 
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: useResponsiveVerticalSpace(10),
  },

  child: {
    width: "100%",
    height: "100%",
   
  },

  lastTrade: {
    fontSize: useResponsiveFontSize(20),
    fontWeight: "700",
    textTransform: "capitalize",
    marginTop: useResponsiveVerticalSpace(30),
  },
});
