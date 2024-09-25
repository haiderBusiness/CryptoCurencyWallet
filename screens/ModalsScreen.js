import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Modal from '../components/modal/Modal.js';
import TradeFilter from '../components/trade/tradeFilter/TradeFilter.js';
import BottomSheet from '../components/modal/BottomSheet';

import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';


import Store from "../redux/Store.js"
import { useSelector } from "react-redux";
import { setTrades } from "../redux/actions";
import useThemeColors from '../hooks/useThemeColors.js';
import CustomPressable from '../components/RNComponents/CustomPressable.js';
import { useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace } from '../hooks/useResponsiveness.js';

import { useSafeAreaInsets } from "react-native-safe-area-context";


const {height} = Dimensions.get('screen');

const applyFiltersButtonVerticalPadding = useResponsiveVerticalSpace(15)
const applyFiltersButtonHeight = useResponsiveHeight(45) + applyFiltersButtonVerticalPadding


export default function ModalsScreen({}) {

const bottomSheetRef = useRef(null)

const expandHandler = useCallback(() => {
  bottomSheetRef.current?.expand()
},)


const themeColors = useThemeColors()


//REVIEW MARKET PLACE FILTERS <-
const marketPlaceFilters = useSelector((state) => state.marketPlaceFilters)

const [showMarketPlaceFilters, setShowMarketPlaceFilters] = useState(false)





useEffect(() => {
 
  if(marketPlaceFilters)  {
    console.log("marketPlaceFilters", marketPlaceFilters)
    setShowMarketPlaceFilters(true)
  } else {
    setShowMarketPlaceFilters(false)
  }
}, [marketPlaceFilters])


const tradeFilterModalHeight = "92.5%"



 return (
  <>
      {/* <Modal 
      // spaceBetweenContent={0} 
      animationType="slide" 
      zIndex={1} 
      Content={TradeFilter} 
      showModal={true}
      showSmallWidget={true}
      /> */}
      {/* <BottomSheet show={false} ref={bottomSheetRef} snapTo={'70%'} backgroundColor={"white"}>
        <View>
          <Text>
            Hello there 
          </Text>
        </View>
      </BottomSheet> */}

       <Modal 
      // spaceBetweenContent={0} 
      animationType="slide" 
      zIndex={1} 
      Content={TradeFilter} 
      show={showMarketPlaceFilters}
      showTopNotch={true}
      // animationTime={1000}
      onHide={setShowMarketPlaceFilters}
      snapTo={tradeFilterModalHeight}
      backgroundColor={themeColors.background4}
      AdditionalComponent={<ApplyFiltersButton snapTo={tradeFilterModalHeight}/>}
      additionalComponentHeight={applyFiltersButtonHeight}
      >
        <TradeFilter/>
      </Modal>
  </>

 );
}


const ApplyFiltersButton = ({snapTo}) => {

  // const {height} = {}

  const inset = useSafeAreaInsets();
  const themColors = useThemeColors()

  const percentage = parseFloat(snapTo.replace('%', '')) / 100;

  const openHeight = ((height * percentage) - useResponsiveHeight(75));
  // (height * percentage) * 0.12

  const top = openHeight

  console.log("height: ", height)
  const marginVertical = useResponsiveVerticalSpace(0)
  const componentHeight = useResponsiveHeight(0) + marginVertical
  return(
    <View style={[styles.applyFiltersView, {top: top}]}>
      <CustomPressable style={{...styles.applyFiltersButton, backgroundColor: themColors.mainColor}}>
            <Text 
            style={{
              ...styles.applyFiltersText, 
              color: themColors.mainColorOpposite
            }}
            >
              Apply filters
            </Text>
      </CustomPressable>
    </View>
  )
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  },

  applyFiltersView: {
    width: "100%",
    // backgroundColor: "orange",
    position: "absolute",
    alignItems: "center",
  },

  applyFiltersButton: {
    backgroundColor: "green",
    height: useResponsiveHeight(42.5),
    paddingHorizontal: "35%",
    borderRadius: useResponsiveRadius(10),
    justifyContent: "center",
    alignItems: "center",

    shadowOffset: { width: -1, height: 1 },
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOpacity: 0.35,
    shadowRadius: useResponsiveRadius(7),
    elevation: 10,
  },

  applyFiltersText: {
    fontSize: useResponsiveFontSize(16),
    fontWeight: "500"
  }
});