import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Modal from '../components/modal/Modal.js';
import TradeFilter from '../components/trade/TradeFilter';
import BottomSheet from '../components/modal/BottomSheet';

import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';


import Store from "../redux/Store.js"
import { useSelector } from "react-redux";
import { setTrades } from "../redux/actions";



export default function ModalsScreen({}) {

const bottomSheetRef = useRef(null)

const expandHandler = useCallback(() => {
  bottomSheetRef.current?.expand()
},)


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
      >
        <TradeFilter/>
      </Modal>
  </>

 );
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  },
});