import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
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


export default function Marketplace({ route, navigation }) {
  const themeColors = useThemeColors();


  const data = useCallback(() => { return getTrades(null)}, [])


  const ListItem = 
  // React.memo(
    ({ item, index }) => {
    //  console.log("item.coin: ", item.coin)
    return (
      <Trade
        orderInfo={item}
        style={{ 
          paddingTop: useResponsiveVerticalSpace(16),
          backgroundColor: themeColors.background,
          paddingHorizontal: useResponsiveHorizontalSpace(18)
        }}
      />
    );
  }
// );


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
          // removeBigTitle 
          // removeHeader
          // listHeader={() => (<Text>Hellooooooo</Text>)}
          // isStikcyListHeader={true}
          />
  );
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
