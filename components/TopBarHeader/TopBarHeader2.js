import React, {useEffect, useState, memo} from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace, useResponsiveWidth, useResponsiveBothHeightWidth } from "@hooks/useResponsiveness";
import { interfaceFilterOutlineBlack, interfaceAddDocumentOutlineBlack, interfaceHistoryOutlineBlack, interfaceShieldTrustGreen } from "@assets/dummy/icons_pictures";
import useThemeColors from "@hooks/useThemeColors"

import CustomPressable from "@RNComponents/CustomPressable"
import LeftIcons from "./LeftIcons"

import Animated, { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

import { BlurView } from 'expo-blur';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RightIcons from "./RightIcons";

const defaultIconHeight = useResponsiveHeight(30)
const defaultContentBottomMargin = useResponsiveHorizontalSpace(8)

let test = null

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const TopBarHeader2 = ({
  //icons 
  leftImageSource1 = interfaceFilterOutlineBlack,
  leftImageSource2, 
  leftImageSource3, 
  rightImageSource1,
  rightImageSource2,
  rightImageSource3,

  //icons styles
  leftImage1Style = {size: useResponsiveBothHeightWidth(30)},
  leftImage2Style = {size: useResponsiveBothHeightWidth(30)},
  leftImage3Style = {size: useResponsiveBothHeightWidth(30)},
  rightImage1Style = {size: useResponsiveBothHeightWidth(30)},
  rightImage2Style = {size: useResponsiveBothHeightWidth(30)},
  rightImage3Style = {size: useResponsiveBothHeightWidth(30)},

  //icons on press
  onLeftImage1Press,
  onLeftImage2Press,
  onLeftImage3Press,
  onRightImage1Press,
  onRightImage2Press,
  onRightImage3Press,
  leftComponent,
  rightComponent,
  title,
  titleComponent,
  headerBlur = true,
  blurBackgroundOpacity = 0.8,
  style,
  height = useResponsiveHeight(40),
  animatedScrollY,
  showWhenReaches = useResponsiveHeight(36),
  topExtraSpace = 0

}) => {



  //REVIEW RECIVED PROPS MANIPULATION

  const LeftComponent = leftComponent
  const RightComponent = rightComponent
  const TitleComponent = titleComponent
  
  //console.log("instest.top", insets.top)

  let leftImagesCount = leftImageSource1 ? 1 : 0
  leftImagesCount = leftImageSource2 ? leftImagesCount + 1 : leftImagesCount
  leftImagesCount = leftImageSource3 ? leftImagesCount + 1 : leftImagesCount

  let rightImagesCount = rightImageSource1 ? 1 : 0
  rightImagesCount = rightImageSource2 ? rightImagesCount + 1 : rightImagesCount
  rightImagesCount = rightImageSource3 ? rightImagesCount + 1 : rightImagesCount

  const themeColors = useThemeColors()

  const BACKGROUND_COLOR = style &&  style.flex !== 1000 && style.backgroundColor ?  style.backgroundColor : themeColors.background




  //REVIEW Animation
  const titleOpacity = useSharedValue(0)
  const backgroundOpacity = useSharedValue(0)
  const colorBackgroundOpacity = useSharedValue(1)

  const scrollReachHeight = showWhenReaches;


  useDerivedValue(() => {
    if(animatedScrollY) {
      // runOnJS(console.log)("You scrolled between 300 and 400 pixels!");
      if(animatedScrollY.value > scrollReachHeight) {
        titleOpacity.value = withTiming(1)
        backgroundOpacity.value = 1
        colorBackgroundOpacity.value = withTiming(blurBackgroundOpacity)
      } else {
        colorBackgroundOpacity.value = 1
        backgroundOpacity.value = 0
        titleOpacity.value = 0
      }

    }

  });

  // console.log("here")


  const insets = useSafeAreaInsets();

  const noIcons = !LeftComponent && leftImagesCount < 1 && rightImagesCount < 1




  // const MARGINTOP = noIcons ? 0 : topSafeArea 
  const COMPONENT_HEIGHT =  height + topExtraSpace
  //  const PADDINGTOP = noIcons ? 0 : topSafeArea - contentHeight



  return (
    <View 
    // onLayout={numberOfrenders < 2 ? handleLayout : null} 
    style={{
      ...styles.container, 
      ...style, 
      height: COMPONENT_HEIGHT,
      backgroundColor: "transparent", // set to transparent because the background color of this component is passed to background view 
      }}>

            { headerBlur && 
            <Animated.View
            style={{
              width: "100%", 
              height: COMPONENT_HEIGHT, 
              position: "absolute",
              top: 0,
              zIndex: 0,
              opacity: backgroundOpacity
              // backgroundColor: "white"
              }}
            >

   
            <AnimatedBlurView 
              intensity={100}
              style={{
                width: "100%", 
                height: "100%", 
                // backgroundColor: "red"

              }}
              />
           </Animated.View>}

              { //REVIEW background view
              <Animated.View 
              style={{
                width: "100%", 
                height: COMPONENT_HEIGHT, 
                position: "absolute",
                top: 0,
                zIndex: 0,
                backgroundColor: BACKGROUND_COLOR,
                // opacity: 0.5
                // paddingTop: insets.top * 1.3,
                // backgroundColor: backgroundColor,
                opacity: colorBackgroundOpacity
                // backgroundColor: "white"
                }}/>}

              
      <View style={{
        ...styles.topHeader, 
        height: height,
 
        }}>

 

       {!LeftComponent ? 
       <LeftIcons 
       styles={styles}
       BACKGROUND_COLOR={BACKGROUND_COLOR}
       leftImage1Style={leftImage1Style}
       leftImage2Style={leftImage2Style}
       leftImage3Style={leftImage3Style}
       leftImageSource1={leftImageSource1}
       leftImageSource2={leftImageSource2}
       leftImageSource3={leftImageSource3}
       onLeftImage3Press={onLeftImage3Press}
       onLeftImage2Press={onLeftImage2Press}
       onLeftImage1Press={onLeftImage1Press}
       /> 
       : <LeftComponent/>}

       
        {noIcons && <View style={{width: "100%", minHeight: defaultIconHeight, opacity: 0}}/>}



        {!TitleComponent &&
          <Animated.View pointerEvents="none" 
          style={{...styles.titleView, 
            opacity: titleOpacity, 
          }}
          >
            <Text style={styles.title}>
              {title ? title : "Title"}
            </Text>
          </Animated.View>
        }

        {TitleComponent &&
          <TitleComponent styles={styles.titleView}/>
        }



       

        {!RightComponent ? 
        <RightIcons
        styles={styles}
        BACKGROUND_COLOR={BACKGROUND_COLOR}
        rightImage1Style={rightImage1Style}
        rightImage2Style={rightImage2Style}
        rightImage3Style={rightImage3Style}
        rightImageSource1={rightImageSource1}
        rightImageSource2={rightImageSource2}
        rightImageSource3={rightImageSource3}
        onRightImage3Press={onRightImage3Press}
        onRightImage2Press={onRightImage2Press}
        onRightImage1Press={onRightImage1Press}
        />
        : <RightComponent/>}


        {/* {<View style={{width: 10, height: 10}}/>} */}
      </View>




        {/* bottom line/border */}
      <Animated.View style={{width: "100%", height: useResponsiveBothHeightWidth(0.5),opacity: backgroundOpacity}}>
        <View style={{width: "100%", height: useResponsiveBothHeightWidth(0.5), backgroundColor: themeColors.text, opacity:0.1}}/>
      </Animated.View>

    </View>
  );
}


export default TopBarHeader2;




const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",

    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0)",
    // height: useResponsiveHeight(70)
    // opacity: 0.5,
   
    // backgroundColor: "red",
    // backgroundColor: "red"         // AdditionalComponent={TabsSlider}
  },

  topHeader: {
    // backgroundColor: "red",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.06)",
    paddingTop: useResponsiveVerticalSpace(8),
    paddingBottom: useResponsiveVerticalSpace(8),
    // backgroundColor: "red"
    // borderBottomWidth: useResponsiveHeight(0.5),
    
    // paddingHorizontal: useResponsiveHorizontalSpace(10)
  },

  iconView: {
    width: useResponsiveBothHeightWidth(30),
    height: useResponsiveBothHeightWidth(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: useResponsiveRadius(30),

  },

  icon: {
    width: useResponsiveBothHeightWidth(16),
    height: useResponsiveBothHeightWidth(16),
  },

  titleView: {
    position: 'absolute', 
    top: 0,
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: useResponsiveVerticalSpace(10),
  },
  title: {
    fontSize: useResponsiveFontSize(18),
    fontWeight: "600",
    // backgroundColor: "blue",
    // marginBottom: 5,
  },



  
  bigTitleView: {
    paddingLeft: useResponsiveHorizontalSpace(18),
  },

  text: {
    color: "red",
  },

  bigTitle: {
    fontSize: useResponsiveFontSize(34),
    fontWeight: "bold",
  },

  


});
