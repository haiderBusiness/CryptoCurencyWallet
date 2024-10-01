import React, { memo, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace } from '../hooks/useResponsiveness';
import CustomPressable from './RNComponents/CustomPressable';
import useThemeColors from '../hooks/useThemeColors';
import Animated,{ FadeIn, FadeOut, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';




const placeHolderArr = [
  {"name": "Buying"},
  {"name": "Selling"},
  
]
const emptyFunc = () => {}
function TabsSlider({
  onSelectedTabChange = emptyFunc, 
  resultSpeed = "fast", 
  style={},
  activeBackgroundColor,
  inactiveBackgroundColor,
  data = placeHolderArr,

  //TODO pass this prop to work properly 
  parentHorizontalPadding
}) {



    const {width, height} = Dimensions.get("window")

    // screen wisth minus margin and padding
    // const tabWidth = (width - useResponsiveHorizontalSpace(18) - useResponsiveHorizontalSpace(5)) / 2.15

    const [tabWidth, setTabWidth] = useState(0)


    const [selectedTab, setSelectedTab] = useState(0)

    const handlePress = (button, index) => {
      onSelectedTabChange(button.name, index)
      setSelectedTab(index)
    }

    const themeColors = useThemeColors()


    // function randomNumber() {
    //  const min = 1000000000; // Minimum 10-digit number
    //  const max = 9999999999; // Maximum 10-digit number
    //  return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
    // console.log('re-render: ',randomNumber(), ' at TabsSlider file')


    const tabPositionX = useSharedValue(0)
    const inactiveTabTextOpacity = useSharedValue(0.4)
    const activeTabTextOpacity = useSharedValue(1)

    const activeTextColor = themeColors.mainColorOpposite
    const inactiveTextColor = themeColors.text


    const activeColorAnim = useSharedValue(1);
    const inactiveColorAnim = useSharedValue(0);

    const startColorAnimation = () => {
      // colorAnim.value = withTiming(colorAnim.value === 0 ? 1 : 0, {
      //   duration: 1000,
      // });
    };

    const savedIndex = useRef(0);


    // let savedIndex = 0
    // let savedIndex = useSharedValue(0)

    const margin_between_tabs = useResponsiveHorizontalSpace(6)
    // const extra_padding = useResponsiveHorizontalSpace(4)

    const onTabPress = (button, index) => {
      

      if (resultSpeed === "fast") {
        handlePress(button, index)
      } else if (resultSpeed === "medium") {
        setTimeout(() => {
          handlePress(button, index)
        }, 200)
      } else if (resultSpeed === "slow") {
        setTimeout(() => {
          handlePress(button, index)
        }, 500)
      }

      // const multiplier = index === 0 ? (index + 0.03) : (index + 0.07)

      
      
      tabPositionX.value = withTiming((tabWidth + margin_between_tabs) * index, {}, () => {
        // runOnJS(handlePress)(button, index)
      })





      // console.log("updatedIndex.value: ", updatedIndex.value, index)

      if(index === savedIndex.current){
        activeTabTextOpacity.value = withTiming(1)
        inactiveTabTextOpacity.value = withTiming(0.4)
      } else {
        activeTabTextOpacity.value = withTiming(0.4)
        inactiveTabTextOpacity.value = withTiming(1)
        savedIndex.current = index
      }
      

      
    }

    const animatedBackgroundStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: tabPositionX.value}]
      }
    })

    const animatedTextStyleInactive = useAnimatedStyle(() => {
      return {
        opacity: inactiveTabTextOpacity.value,
        color: inactiveTextColor
      }
    })

    const animatedTextStyleActive = useAnimatedStyle(() => {
      return {
        opacity: activeTabTextOpacity.value,
        color: activeTextColor
      }
    })



    // const animatedTextStyle3 = useAnimatedStyle(() => {
    //   return {
    //     color: textColor,
    //   }
    // })

   

    const handleLayout = (event) => {
      const { height, width, x, y } = event.nativeEvent.layout;
      const tabWidth = (width - useResponsiveHorizontalSpace(18) - useResponsiveHorizontalSpace(5)) / 2.15

    const availableWidth = width - parentHorizontalPadding ;
    setTabWidth(availableWidth / data.length); // Divide the available width by the number of tabs

      console.log('layout width: :', width, ' at TabsSlider file')
    };

 return (

    <View onLayout={handleLayout} style={[styles.container, style]}>


      <View style={[
        styles.tabsView, 
        {
          // backgroundColor: themeColors.background4,
          backgroundColor: themeColors.background4,
          alignItems: "center",
          shadowOffset: { width: -1, height: 1 },
          shadowColor: "rgba(0,0,0,0.3)",
          shadowOpacity: 0.1,
          shadowRadius: useResponsiveRadius(7),
          elevation: 10,
          borderWidth: 1,
          borderColor:"rgba(0,0,0,0.03)", 
          // borderWidth: 1,
          // borderColor: themeColors.background2
        }
        ]}>


      <Animated.View
        style={[animatedBackgroundStyle, {
          backgroundColor: themeColors.background,
          height: "100%", 
          width: tabWidth,
          position: "absolute",
          top: useResponsiveVerticalSpace(4),
          marginHorizontal: margin_between_tabs,
          borderRadius: useResponsiveRadius(8),
          zIndex: 0,
          
        }]}
        />


        <View style={[
        styles.tabsView, 
        {
          // backgroundColor: themeColors.background4,
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
          // marginLeft: 5,
        }
        ]}>


        {data.map((button, index) => {

            const selected = selectedTab === index;
            const textColor = selected ? themeColors.mainColorOpposite : themeColors.text

            console.log("selectedTab: ", selectedTab, index)

           

            //  const animatedStyle = selectedTab === 0 ? animatedTextStyleUnActive : animatedTextStyleInActive

            const tabTextOpacity = useSharedValue(0)

           
            const animatedStyle =
            selectedTab
              ? animatedTextStyleActive
              : animatedTextStyleInactive;

              if(selected) {
                tabTextOpacity.value = withTiming(1)
              } else {
                tabTextOpacity.value = withTiming(0.4)
              }

            const animatedTextStyleActive = useAnimatedStyle(() => {
              return {
                opacity: tabTextOpacity.value,
                // color: textColor
              }
            })


            // const tabWidth = (index + 1) === (data.length) ? tabWidth - : 10

            return(
                <Pressable style={{
                  ...styles.tabView,

                   marginLeft: margin_between_tabs / 2,
                   marginRight: margin_between_tabs / 2,
                  // marginRight: (index + 1) === (data.length) ? 10 : 10, 
                  width: tabWidth ,
                }}
                key={index}
                onPress={() => onTabPress(button, index)}
                >

        
                  <Animated.Text 
                  style={[
                    animatedTextStyleActive,
                    styles.tabText,
                    {color: themeColors.text}
                    ]}>
                      {button.name}
                  </Animated.Text>

                </Pressable>
            )
        })}
        </View>
        {/* <Tab name={"Buying"}/> */}
      </View>
    </View>
 );
}



const areEqual = (prevProps, nextProps) => true;


export default  memo(TabsSlider, areEqual)





const styles = StyleSheet.create({
 container: {
  minWidth: '100%',
//   alignItems: 'center',
//   justifyContent: 'center',
  // backgroundColor: "red"
  },

  tabsView: {
    // width: "100%",
    // width: "100%",
    flexDirection: "row",
    //  justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: useResponsiveHeight(45),
    // marginHorizontal: useResponsiveHorizontalSpace(18),

    paddingVertical: useResponsiveVerticalSpace(4),
    // paddingHorizontal: useResponsiveHorizontalSpace(5),
    borderRadius: useResponsiveRadius(10),
    
  },

  tabView: {
    // backgroundColor: "green",
    // marginHorizontal: useResponsiveHorizontalSpace(10),
    // width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: useResponsiveRadius(8),
  },

  tabText: {
    fontSize: useResponsiveFontSize(15),
    fontWeight: "600",
    // backgroundColor: "orange"
  },

  
});