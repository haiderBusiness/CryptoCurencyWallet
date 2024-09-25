import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomSwitch from '../../RNComponents/CustomSwitch';
import { useResponsiveBothHeightWidth, useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace } from '../../../hooks/useResponsiveness';
import { arrow_back_black, interface_arrow_trend_up_black_fill, interface_digital_payment_black, interface_expense_black, interface_hashtag_lock_black, interface_info_black, interface_population_globe_black } from '../../../assets/dummy/icons_pictures';
import RangeSlider from '../../RangeSlider';
import RangeSliderWidget from './RangeSliderWidget';
import DropDown from '../../DropDown';
import useLanguage from '../../../hooks/useLanguage';
import CustomPressable from '../../RNComponents/CustomPressable';
import OfferTagsHorizontal from './OfferTagsHorizontal';
import { useSafeAreaInsets } from "react-native-safe-area-context";


const {width, height} = Dimensions.get("window")

export default function TradeFilter({}) {

    const inset = useSafeAreaInsets();

    const themeColors = useThemeColors()

    const [paymentMethod, setPaymentMethod] = useState("")
    

    const textStyle = {color: themeColors.text}
    const errorTextStyle = {color: themeColors.red}

    const sectionBackgroundStyle = {
      backgroundColor: themeColors.background,
      borderRadius: useResponsiveRadius(10),
      paddingVertical: useResponsiveVerticalSpace(10),
      paddingHorizontal: useResponsiveHorizontalSpace(18),
    }


    //REVIEW below height is fixed and will only work if the snapTo prop of this modal in ModalsScreen is the same as here

    const snapTo = 0.95 // the same as the modal snapTo prop 

    const applyButtonHeight = useResponsiveHeight(40)
    const topNotchHeight = 14

    const fixedHeight = (height * snapTo) - (topNotchHeight + applyButtonHeight)


 return (
  <View style={{...styles.container}}>





    {/* //REVIEW Apply last used filter section  */}
    <View style={[styles.section, sectionBackgroundStyle]}>
     <Text style={[styles.sectionText, textStyle]}>
        {useLanguage("Apply last used filter")}
     </Text>

     <CustomSwitch activeColor={themeColors.green2} inActiveColor={themeColors.background4} />
    </View>



       {/* //REVIEW payment methods section  */}
    <View style={[{zIndex: 1}]}>
      <View style={styles.titleView}>
          <Text style={[styles.title, textStyle]}>
            {useLanguage("Payment method")}
          </Text>

          <Image source={interface_info_black} style={{...styles.infoImage}}/>
        </View>


        <CustomPressable 
        
        colorChangePercent={5}
        style={{...styles.section, ...sectionBackgroundStyle}}
        >

          <View style={{flexDirection: "row", alignItems: "center"}}>
            {/* <Image source={interface_expense_black} style={{...styles.paymentImage}}/> */}
            <Text style={[styles.sectionText, textStyle]}>
            {useLanguage("All payment methods")}
            </Text>
          </View>


          <Image source={arrow_back_black} style={{...styles.arrowImage}}/>
        
        </CustomPressable>
        

        {/* //REVIEW dropdown */}
       
        {/* <View style={[styles.section, sectionBackgroundStyle, {paddingHorizontal: 0, paddingVertical: 0}]}>
          <DropDown onFinish={setPaymentMethod}/>
        </View>  */}
        {/* 
        {paymentMethod && paymentMethod.length < 1 && <Text style={[styles.error, errorTextStyle]}>
            {useLanguage("No such payment method")}
        </Text>} */}

    </View>




    {/* //REVIEW trade limits section  */}
    <View style={[styles.tradeLimitView, {zIndex: 0,}]}>

      <View style={styles.titleView}>
        <Text style={[styles.title, textStyle]}>
          {useLanguage("Trade limit")}
          </Text>

        <Image source={interface_info_black} style={{...styles.infoImage}}/>
      </View>
  
      <View style={[,sectionBackgroundStyle]}>
      {/* <Text>Minimum</Text>
      <Text>Maximum</Text>  */}

        <RangeSliderWidget/>
      </View>

    </View>


    {/* //REVIEW user type section  */}
    {/* <View>
      <Text>User Type</Text>
    </View> */}


    {/* //REVIEW offer location section  */}

    <View style={[{zIndex: 1}]}>
      <View style={styles.titleView}>
          <Text style={[styles.title, textStyle]}>
            {useLanguage("Trader country")}
          </Text>

          <Image source={interface_info_black} style={{...styles.infoImage}}/>
        </View>


        <CustomPressable 
        colorChangePercent={5}
        style={{...styles.section, ...sectionBackgroundStyle}}
        >

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image source={interface_population_globe_black} style={{...styles.paymentImage}}/>
            <Text style={[styles.sectionText, textStyle]}>
            {useLanguage("All regions")}
            </Text>
          </View>


          <Image source={arrow_back_black} style={{...styles.arrowImage}}/>
        
        </CustomPressable>
        
    </View>


    {/* //REVIEW offer hashtags section  */}
    <View style={[{zIndex: 1}]}>
      <View style={styles.titleView}>
          <Text style={[styles.title, textStyle]}>
            {useLanguage("Offer hashtags")}
          </Text>

        <Image source={interface_info_black} style={{...styles.infoImage}}/>
      </View>



      <CustomPressable 
        colorChangePercent={5}
        style={{...styles.section, ...sectionBackgroundStyle}}
        >

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image source={interface_hashtag_lock_black} style={{...styles.paymentImage}}/>
            <Text style={[styles.sectionText, textStyle]}>
            {useLanguage("None selected")}
            </Text>
          </View>


          <Image source={arrow_back_black} style={{...styles.arrowImage}}/>
        
        </CustomPressable>

        {/* <View style={[styles.section,  {paddingHorizontal: 0, paddingVertical: 0}]}>
          <OfferTagsHorizontal onFinish={setPaymentMethod}/>
        </View>  */}
  
    </View>



    {/* //REVIEW Verified offers  */}
    <View style={[{}]}>
      <View style={styles.titleView}>
          <Text style={[styles.title, textStyle]}>
            {useLanguage("Trader verification")}
          </Text>

        <Image source={interface_info_black} style={{...styles.infoImage}}/>
      </View>

      <View style={[styles.section, sectionBackgroundStyle]}>
        <Text style={[styles.sectionText, textStyle]}>
            {useLanguage("Verified traders")}
        </Text>

        <CustomSwitch activeColor={themeColors.green2} inActiveColor={themeColors.background4} />
      </View>
    </View>


    {/* //REVIEW Recently active traders  */}

    <View style={[]}>
      <View style={styles.titleView}>
          <Text style={[styles.title, textStyle]}>
            {useLanguage("Trader verification")}
          </Text>

          <Image source={interface_info_black} style={{...styles.infoImage}}/>
        </View>
      <View style={[styles.section, sectionBackgroundStyle]}>
        <Text style={[styles.sectionText, textStyle]}>
            {useLanguage("Recently active traders")}
        </Text>

        <CustomSwitch activeColor={themeColors.green2} inActiveColor={themeColors.background4} />
      </View>
    </View>





  </View>
 );
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: '100%',
  paddingHorizontal: useResponsiveHorizontalSpace(18)


  },


  //common styles 
  infoImage: {
    width: useResponsiveBothHeightWidth(16),
    height: useResponsiveBothHeightWidth(16),
    opacity: 0.5
  },

  titleView : {
    flexDirection: "row",
    alignItems: "center",
    marginTop: useResponsiveVerticalSpace(15),
    marginBottom: useResponsiveVerticalSpace(10)
  },

  title: {
    fontSize: useResponsiveFontSize(18),
    fontWeight: "500",
    marginRight: useResponsiveHorizontalSpace(10)
  },

  error: {
    marginVertical: useResponsiveVerticalSpace(8),
    fontSize: useResponsiveFontSize(14),
  
  },


  // rest

  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },

  sectionText: {
    fontSize: useResponsiveFontSize(16),
    fontWeight: "500",
    marginRight: useResponsiveHorizontalSpace(20),
  },

  tradeLimitView: {
  },


  arrowImage: {
    width: useResponsiveBothHeightWidth(25),
    height: useResponsiveBothHeightWidth(25),
    opacity: 0.5,
    transform: [{scaleX: -1}],
    // backgroundColor: "red"
  },

  paymentImage: {
    width: useResponsiveBothHeightWidth(20),
    height: useResponsiveBothHeightWidth(20),
    opacity: 0.5,
    marginRight: useResponsiveHorizontalSpace(10)
  },

 



});