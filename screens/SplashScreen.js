import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import { getTrades, getOrders } from "../backend/controllers/tradeController";

import Store from "../redux/Store.js"
import { setTrades } from "../redux/actions";

import Bokehlicia_Rocket from "../assets/Bokehlicia_Rocket.png"

export default function SplashScreen({}) {

  




  
  const dispatch = Store.dispatch

  const tradesFilter = async () => {
    const data = await getTrades(null)
    const selling = data.filter(item => item.tradeType === "selling").sort((a,b) => a.priceAdjustmentPercentage - b.priceAdjustmentPercentage)
    const buying = data.filter(item => item.tradeType === "buying").sort((a,b) => a.priceAdjustmentPercentage - b.priceAdjustmentPercentage)

    dispatch(setTrades({"selling": selling, "buying": buying}))
  }

  useEffect(() => {
   tradesFilter()
  }, [])


 return (
  <View style={styles.container}>
   <Image style={styles.image} source={Bokehlicia_Rocket}/>
  </View>
 );
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  },

  image: {
    width: 150,
    height: 150,
  }
});