import React, { useState, useRef, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList, TouchableWithoutFeedback, Keyboard} from 'react-native';
import useThemeColors from "../../../hooks/useThemeColors"

import {useResponsiveBothHeightWidth, useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace, useResponsiveWidth} from "../../../hooks/useResponsiveness"
import MemoizedTextInput from "../../MemoizedTextInput"
import { interface_circle_xmark_black, interface_search_black } from "../../../assets/dummy/icons_pictures";
import { ScrollView } from 'react-native-gesture-handler';
import { getPaymentMethods, searchPaymentMethods } from '../../../backend/controllers/tradeController';

import CustomPressable from "../../RNComponents/CustomPressable"
import useLanguage from '../../../hooks/useLanguage';
import hexToRGBA from '../../../hooks/hexToRGBA';

let number = 0
export default function OfferTagsHorizontal({inputValue, onFinish}) {


    const themeColors = useThemeColors()

    const textStyle = {textColor: themeColors.text}
    const searchStyle = {backgroundColor: themeColors.background}
    const borderColor = hexToRGBA(themeColors.text, 0.1)

    const [searchText, setSearchText] = useState("")

    const [paymentMethods, setPaymentMethods] = useState([])



    useEffect(() => {
    setPaymentMethods(getPaymentMethods())
    }, [])


    console.log("DropDown: ", number)
  


    // console.log("re render: ", number)

    // console.log("re render")

 return (

  <View style={[styles.container]}>




    <View style={styles.content}>
        <FlatList
            data={paymentMethods}
            horizontal={true}
            
            renderItem={(({item, index}) => {
                const paddingVertical =  paymentMethods.length < 2 ? useResponsiveVerticalSpace(10) : 0
                return(
                    <CustomPressable 
                    style={
                    {...styles.item, 
                        backgroundColor: themeColors.background,
                        // paddingVertical: paddingVertical,
                        flex: 1
                    }
                    } 
                    onPress={() => {}} 
                    key={index}>
                    <Text style={[styles.itemText, textStyle]}>
                    {item}
                    </Text>
                    </CustomPressable>
                )
            })}

            keyExtractor={(item, index) => index.toString()}
        />

    </View>



  </View>
 );
}



const styles = StyleSheet.create({
 container: {
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flex: 1,
  zIndex: 10,
  height: "100%",
  position: "relative",
  // paddingLeft: useResponsiveHorizontalSpace(12),
  // borderWidth: useResponsiveBothHeightWidth(2),
  borderRadius: useResponsiveRadius(10),
  
  // marginHorizontal: useResponsiveHorizontalSpace(1),
  },

  border: {

    position: "absolute", 
    width: "100%", 
    height: "100%",
    zIndex: 1,
    borderRadius: useResponsiveRadius(10),
  },

  content: {
    paddingVertical: useResponsiveBothHeightWidth(5),
    height: useResponsiveHeight(60),
    flex: 1,
  },

 
  item: {
    paddingHorizontal: useResponsiveHorizontalSpace(10),
    marginTop: useResponsiveVerticalSpace(5),
    height: useResponsiveHeight(30),
    marginRight: useResponsiveHorizontalSpace(10),
    borderRadius: useResponsiveRadius(15),
    justifyContent: "center",
    alignItems: "flex-start",
  },

  itemText: {
    fontSize: useResponsiveFontSize(16),
  }

});