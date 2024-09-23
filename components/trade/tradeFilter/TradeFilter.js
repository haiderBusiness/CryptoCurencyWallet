import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomSwitch from '../../RNComponents/CustomSwitch';
import { useResponsiveBothHeightWidth, useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace } from '../../../hooks/useResponsiveness';
import { interface_info_black } from '../../../assets/dummy/icons_pictures';
import RangeSlider from '../../RangeSlider';
import RangeSliderWidget from './RangeSliderWidget';
import DropDown from '../../DropDown';
import useLanguage from '../../../hooks/useLanguage';

export default function TradeFilter({}) {

    const themeColors = useThemeColors()
    

    const textStyle = {textColor: themeColors.text}

    const sectionBackgroundStyle = {
      backgroundColor: themeColors.white,
      borderRadius: useResponsiveRadius(10),
      paddingVertical: useResponsiveVerticalSpace(10),
      paddingHorizontal: useResponsiveHorizontalSpace(18),
    }


 return (
  <View style={{...styles.container}}>





    {/* //REVIEW Apply last used filter section  */}
    <View style={[styles.applyLastFiltersView, sectionBackgroundStyle]}>
     <Text style={[styles.applyLastFiltersText, textStyle]}>
        {useLanguage("Apply last used filter")}
     </Text>

     <CustomSwitch activeColor={themeColors.green2} inActiveColor={themeColors.background4} />
    </View>



       {/* //REVIEW payment methods section  */}
       <View style={[{zIndex: 1}]}>
    <View style={styles.titleView}>
        <Text style={[styles.title, textStyle]}>
          {useLanguage("payment_method")}
        </Text>

        <Image source={interface_info_black} style={{...styles.infoImage}}/>
      </View>

      <View style={[styles.applyLastFiltersView, sectionBackgroundStyle, {paddingHorizontal: 0, paddingVertical: 0}]}>
        <DropDown/>
        {/* <Image source={interface_info_black} style={{...styles.infoImage}}/> */}
      </View>

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
    <View>
      <Text>User Type</Text>
    </View>



    {/* //REVIEW offer tags section  */}
    <View>
      <Text>Offer tags</Text>
    </View>


    {/* //REVIEW offer location section  */}
    <View>
      <Text>Offer location</Text>
    </View>


    {/* //REVIEW offer location section  */}
    <View>
      <Text>Offer tags</Text>
    </View>



    {/* //REVIEW switches section  */}
    <View>
      <Text>Verified offers switch</Text>
      <Text>Recently active traders</Text>
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


  // rest

  applyLastFiltersView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },

  applyLastFiltersText: {
    fontSize: useResponsiveFontSize(16),
    fontWeight: "500",
    marginRight: useResponsiveHorizontalSpace(20),
  },

  tradeLimitView: {
  },




});