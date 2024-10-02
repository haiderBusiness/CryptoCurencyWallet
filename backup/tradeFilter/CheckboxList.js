import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomPressable from '../../RNComponents/CustomPressable';
import Checkbox from '../../Checkbox';
import { useResponsiveBothHeightWidth, useResponsiveFontSize, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace } from '../../../hooks/useResponsiveness';
import { Image } from 'react-native';
import { interface_credit_card_white, interface_first_hashtag_bold_white, interface_first_hashtag_white, interface_second_hashtag_white, interface_third_hashtag_white } from '@icons';


export default function CheckboxList({themeColors = {}, useLanguage =() => {}, }) {



    const textStyle = {color: themeColors.text}
    const errorTextStyle = {color: themeColors.red}

    const sectionBackgroundStyle = {
      backgroundColor: themeColors.background,

      paddingVertical: useResponsiveVerticalSpace(10),
      paddingHorizontal: useResponsiveHorizontalSpace(18),
    }

    const [selected, setSelected] = useState([])

    const onPress = (text) => {
        if (selected.includes(text)) {
            // console.log("removing: ", text);
            const newArr = selected.filter((item) => item !== text);
            setSelected(newArr); // Set state with a new array
        } else {
            // console.log("adding: ", text);
            const newArr = [...selected, text]; // Create a new array by spreading the old one and adding the new item
            setSelected(newArr); // Set state with a new array
            // console.log("updated: ", newArr);
        }
    };

    console.log("re render")


    const CheckBoxFiled = ({text, style, imageSource}) => {

        const checked = selected.includes(text) ? true : false
        console.log("selected.includes(text): ", selected.includes(text))
        return(
            <CustomPressable 
            onPress={() => onPress(text)}
            style={{
             flexDirection: "row", 
             alignItems: "center", 
             // backgroundColor: "orange",
             width: "100%",
             ...sectionBackgroundStyle,
             ...style,
             }}>
                 <>



                 <Checkbox
                 style={{
                     borderRadius: useResponsiveRadius(6.5),
                     // opacity: 0.4,
                     marginRight: useResponsiveHorizontalSpace(10),
                     
                 }}
                 themeColors={themeColors}
                 size={useResponsiveBothHeightWidth(16)}
                 checked={checked}
                 />


                <View style={[
                    styles.paymentImageView, 
                    {backgroundColor: themeColors.mainColor}
                    ]}>
                    {imageSource && <Image source={imageSource} style={{...styles.paymentImage}}/>}
                </View> 
                 
                 <Text style={[styles.sectionText, textStyle]}>
                 {useLanguage(text)}
                 </Text>
         
         
                 
                 </>      
            </CustomPressable>
        )
    }


 return (
  <View style={{
    borderRadius: useResponsiveRadius(10), 
    backgroundColor: themeColors.background,
    overflow: "hidden"
    }}>
    <CheckBoxFiled text={"No third parties"} imageSource={interface_first_hashtag_white}/>
    
    <CheckBoxFiled text={"Invoices are accepted"} style={{marginTop: useResponsiveVerticalSpace(5)}} 
    imageSource={interface_second_hashtag_white}/>

    <CheckBoxFiled text={"No receipt needed"} style={{marginTop: useResponsiveVerticalSpace(5)}}
    imageSource={interface_third_hashtag_white}/>
    {/* <CheckBoxFiled/> */}



    <CustomPressable 
        
        // colorChangePercent={5}
        style={{
            ...styles.section, 
            ...sectionBackgroundStyle, 
            // marginTop: useResponsiveVerticalSpace(20)
        }}
        >

          <View style={{flexDirection: "row", alignItems: "center"}}>
            {/* <View style={[styles.paymentImageView, {backgroundColor: themeColors.purple}]}>
              <Image source={interface_credit_card_white} style={{...styles.paymentImage}}/>
            </View> */}

            <Text style={{
                color: themeColors.mainColor,
                size: useResponsiveFontSize(13),
                marginTop: 10
                }}>
            {useLanguage("See all hashtags")}
            </Text>
          </View>


          <Image source={arrow_back_black} style={{...styles.arrowImage}}/>
        
        </CustomPressable>
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
    width: useResponsiveBothHeightWidth(20),
    height: useResponsiveBothHeightWidth(20),
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
    marginLeft: useResponsiveHorizontalSpace(10),
    marginRight: useResponsiveHorizontalSpace(15),
    padding: useResponsiveBothHeightWidth(10),
    borderRadius: useResponsiveRadius(15),
    },
    paymentImage: {
    width: useResponsiveBothHeightWidth(20),
    height: useResponsiveBothHeightWidth(20),
    opacity: 1,

    },
});
   