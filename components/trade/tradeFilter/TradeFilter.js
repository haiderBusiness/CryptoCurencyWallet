import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import useThemeColors from '../../../hooks/useThemeColors';
import CustomSwitch from '../../RNComponents/CustomSwitch';
import { useResponsiveBothHeightWidth, useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace } from '../../../hooks/useResponsiveness';
import { arrow_back_black, interface_arrow_trend_up_black_fill, interface_credit_card_white, interface_digital_payment_black, interface_expense_black, interface_hashtag_lock_black, interface_info_black, interface_population_globe_black } from '@icons';
import RangeSlider from '../../RangeSlider';
import RangeSliderWidget from './RangeSliderWidget';
import DropDown from '../../DropDown';
import useLanguage from '../../../hooks/useLanguage';
import CustomPressable from '../../RNComponents/CustomPressable';
import OfferTagsHorizontal from './OfferTagsHorizontal';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CheckboxList from './CheckboxList';
import { btc, currencies_white, currency_exchange_white, eth, interface_population_globe_bold_white, usdc, usdt } from '../../../assets/dummy/icons_pictures';
import TabsSlider from '../../TabsSlider';
import CryptoDropdown from './CryptoDropdown';


const {width, height} = Dimensions.get("window")


const cryptoSelectionArray = [
  {"name": "USDT", "image": usdt},
  {"name": "USDC", "image": usdc},
  {"name": "ETH", "image": eth},
  {"name": "BTC", "image": btc},
]

export default function TradeFilter({}) {

    const inset = useSafeAreaInsets();

    const themeColors = useThemeColors()

    const [paymentMethod, setPaymentMethod] = useState("")
    

    const textStyle = {color: themeColors.text}
    const errorTextStyle = {color: themeColors.red}

    const HORIZONTAL_PADDING = useResponsiveHorizontalSpace(18)

    const sectionBackgroundStyle = {
      backgroundColor: themeColors.background,
      borderRadius: useResponsiveRadius(10),
      paddingVertical: useResponsiveVerticalSpace(10),
      paddingHorizontal: HORIZONTAL_PADDING,
    }

    const backgroundStyle = {
      backgroundColor: themeColors.background
    }


    //REVIEW below height is fixed and will only work if the snapTo prop of this modal in ModalsScreen is the same as here

    const snapTo = 0.95 // the same as the modal snapTo prop 

    const applyButtonHeight = useResponsiveHeight(40)
    const topNotchHeight = 14

    const fixedHeight = (height * snapTo) - (topNotchHeight + applyButtonHeight)


 return (
  <View style={{...styles.container}}>


      <View
      style={{ ...styles.header, }}
      >
      <Text style={styles.bigTitle}>{"Trade filters"}</Text>
      <Text style={styles.slugText}>{"Disply trades based on your filters"}</Text>

    </View>


    {/* //REVIEW Apply last used filter section  */}
    <View style={[styles.section, sectionBackgroundStyle]}>
     <Text style={[styles.sectionText, textStyle]}>
        {useLanguage("Apply last used filter")}
     </Text>

     <CustomSwitch 
     borderRadius={useResponsiveRadius(8)}
     activeColor={themeColors.green2} 
     inActiveColor={themeColors.background4} />
    </View>

    <Text style={styles.infoText}>
      {
      useLanguage("Activate to auto-apply your last-used filter to future settings for the same currency and trade side")
      }.
    </Text>



    {/* //REVIEW buying/selling selection  */}
    <View style={{
      marginTop: useResponsiveVerticalSpace(20),
      }}>

      <TabsSlider parentHorizontalPadding={HORIZONTAL_PADDING}/>

      <Text style={styles.infoText}>
      {
      useLanguage("Choose whether you are buying or selling Crypto")
      }.
    </Text>
    </View>


        {/* //REVIEW crypto selection selection  */}
      <View style={[styles.section, sectionBackgroundStyle]}>

      {/* <TabsSlider data={cryptoSelectionArray} parentHorizontalPadding={HORIZONTAL_PADDING}/> */}

      <CryptoDropdown data={cryptoSelectionArray} themeColors={themeColors}/>

      <Text style={styles.infoText}>
      {
      useLanguage("Choose Crypto type")
      }.
    </Text>
    </View>





    {/* //REVIEW offer location section  */}

    <View style={[backgroundStyle, 
      {
        borderRadius: useResponsiveRadius(10),
        marginTop: useResponsiveVerticalSpace(20)
       
      }]}>



    <CustomPressable 

        // colorChangePercent={5}
        style={[
          styles.section, 
          sectionBackgroundStyle,
          {borderRadius: 0}

          // marginTop: useResponsiveVerticalSpace(20)
        ]}
        >

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View style={[styles.paymentImageView, {backgroundColor: themeColors.purple}]}>
              <Image source={interface_credit_card_white} style={{...styles.paymentImage}}/>
            </View>

            <Text style={[styles.sectionText, textStyle]}>
            {useLanguage("All payment methods")}
            </Text>
          </View>


          <Image source={arrow_back_black} style={{...styles.arrowImage}}/>
        
        </CustomPressable>





        <CustomPressable 
        
        style={[
          styles.section, 
          sectionBackgroundStyle,
          {marginTop: useResponsiveVerticalSpace(10), borderRadius: 0},
        ]}
        >

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View style={[styles.paymentImageView, {backgroundColor: themeColors.mainColor}]}>
              <Image source={currency_exchange_white} style={{...styles.paymentImage}}/>
            </View>

            <Text style={[styles.sectionText, textStyle]}>
            {useLanguage("All currencies")}
            </Text>
          </View>


          <Image source={arrow_back_black} style={{...styles.arrowImage}}/>
        
        </CustomPressable>

        <CustomPressable 
        style={[
          styles.section, 
          sectionBackgroundStyle,
          {marginTop: useResponsiveVerticalSpace(10), borderRadius: 0},
        ]}
        >

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View style={[styles.paymentImageView, {backgroundColor: themeColors.lightEasternBlue}]}>
              <Image source={interface_population_globe_bold_white} style={{...styles.paymentImage}}/>
            </View>

            <Text style={[styles.sectionText, textStyle]}>
            {useLanguage("All regions")}
            </Text>
          </View>


          <Image source={arrow_back_black} style={{...styles.arrowImage}}/>
        
        </CustomPressable>
        
    </View>

    <Text style={styles.infoText}>
      {
      useLanguage("Change this to find trades created by vendors from your specified location")
      }.
    </Text>

    


    {/* //REVIEW offer hashtags section  */}
    <View style={[{zIndex: 1}]}>
      <View style={styles.titleView}>
          <Text style={[styles.title, textStyle]}>
            {useLanguage("Offer hashtags")}
          </Text>

        {/* <Image source={interface_info_black} style={{...styles.infoImage}}/> */}
      </View>



      <View 
        // style={{...sectionBackgroundStyle}}
        >
{/* 
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Image source={interface_hashtag_lock_black} style={{...styles.iconImage}}/>
            <Text style={[styles.sectionText, textStyle]}>
            {useLanguage("None selected")}
            </Text>
          </View> */}


          {/* <Image source={arrow_back_black} style={{...styles.arrowImage}}/> */}

          <CheckboxList useLanguage={useLanguage} themeColors={themeColors}/>
        
        </View>



        {/* <View style={[styles.section,  {paddingHorizontal: 0, paddingVertical: 0}]}>
          <OfferTagsHorizontal onFinish={setPaymentMethod}/>
        </View>  */}
  
    </View>



    {/* //REVIEW Verified offers  */}
    <View style={[{}]}>
      {/* <View style={styles.titleView}>
          <Text style={[styles.title, textStyle]}>
            {useLanguage("Trader verification")}
          </Text>

        <Image source={interface_info_black} style={{...styles.infoImage}}/>
      </View> */}

      <View style={[styles.section, sectionBackgroundStyle, {marginTop: useResponsiveVerticalSpace(20)} ]}>
        <Text style={[styles.sectionText, textStyle, ]}>
            {useLanguage("Verified traders")}
        </Text>

        <CustomSwitch 
        borderRadius={useResponsiveRadius(8)}
        activeColor={themeColors.green2} 
        inActiveColor={themeColors.background4} />
      </View>
    </View>



    <Text style={styles.infoText}>
      {
      useLanguage("Only display offers from users that have met certain performance criteria including evidence of fair trading and a minimum volume requirement. Please always review offers cautiously and trade at your discretion")
      }.
    </Text>




    {/* //REVIEW Recently active traders  */}

    <View style={{marginTop: useResponsiveVerticalSpace(20) }}>
      {/* <View style={styles.titleView}>
          <Text style={[styles.title, textStyle]}>
            {useLanguage("Trader verification")}
          </Text>

          <Image source={interface_info_black} style={{...styles.infoImage}}/>
        </View> */}
      <View style={[styles.section, sectionBackgroundStyle]}>
        <View style={{flexDirection: "row", alignItems: "center"}}>

        <Text style={[styles.sectionText, textStyle, {marginRight: useResponsiveHorizontalSpace(10)}]}>
            {useLanguage("Recently active traders")}
        </Text>

        <CustomPressable style={{padding: 10, backgroundColor: themeColors.background, borderRadius: 10}}
        >
        <Image source={interface_info_black} 
        style={{...styles.infoImage}}
        />
        </CustomPressable>

        </View>

        <CustomSwitch 
        borderRadius={useResponsiveRadius(8)}
        activeColor={themeColors.green2} 
        inActiveColor={themeColors.background4} />
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

  header: {
    width: "100%",
    paddingTop: useResponsiveVerticalSpace(15),
    paddingBottom: useResponsiveVerticalSpace(20),
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },

  bigTitle: {
    fontSize: useResponsiveFontSize(34),
    fontWeight: "bold",
  },

  slugText: {
    marginTop: useResponsiveVerticalSpace(5),
    fontSize: useResponsiveFontSize(14),
    opacity: 0.6
    // fontWeight: "bold",
  },


  //common styles 
  infoImage: {
    width: useResponsiveBothHeightWidth(16),
    height: useResponsiveBothHeightWidth(16),
    opacity: 0.5
  },

  infoText: {
    marginTop: useResponsiveVerticalSpace(10),
    marginHorizontal: useResponsiveHorizontalSpace(18),
    fontSize: useResponsiveFontSize(13.5),
    opacity: 0.6,
    lineHeight: useResponsiveHeight(20)
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
    opacity: 0.3,
    transform: [{scaleX: -1}],
    // backgroundColor: "red"
  },

  iconImage: {
    marginRight: useResponsiveHorizontalSpace(10),
    width: useResponsiveBothHeightWidth(20),
    height: useResponsiveBothHeightWidth(20),
    opacity: 0.5,
  },

  paymentImageView: {
    marginRight: useResponsiveHorizontalSpace(15),
    padding: useResponsiveBothHeightWidth(5),
    borderRadius: useResponsiveRadius(8),
  },
  paymentImage: {
    width: useResponsiveBothHeightWidth(20),
    height: useResponsiveBothHeightWidth(20),
    opacity: 1,
  
  },

});