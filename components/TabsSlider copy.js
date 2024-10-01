import React, { memo, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace } from '../hooks/useResponsiveness';
import CustomPressable from './RNComponents/CustomPressable';
import useThemeColors from '../hooks/useThemeColors';
import Animated,{ runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const emptyFunc = () => {}
function TabsSlider({
  onSelectedTabChange = emptyFunc, 
  resultSpeed, 
  style={},

  //TODO pass this prop to work properly 
  parentHorizontalPadding
}) {



    const data = [
      {"name": "Buying"},
      {"name": "Selling"},
      {"name": "Buying"},
      {"name": "Selling"},
    ]

    const {width, height} = Dimensions.get("window")

    // screen wisth minus margin and padding
    // const tabWidth = (layout.width - useResponsiveHorizontalSpace(18) - useResponsiveHorizontalSpace(5)) / 2.15

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


    const tabPositionX = useSharedValue(0 + 0.03)
    const unActiveTabTextOpacity = useSharedValue(0.4)
    const activeTabTextOpacity = useSharedValue(1)

    const margin_between_tabs = useResponsiveHorizontalSpace(6)

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
      
      tabPositionX.value = withTiming((tabWidth * index) + margin_between_tabs, {}, () => {
        // runOnJS(handlePress)(button, index)
      })

      if(index === 0){
        unActiveTabTextOpacity.value = withTiming(0.4)
        activeTabTextOpacity.value = withTiming(1)
      } else {
        unActiveTabTextOpacity.value = withTiming(1)
        activeTabTextOpacity.value = withTiming(0.4)
      }

      
    }

    const animatedBackgroundStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: tabPositionX.value}]
      }
    })

    const animatedTextStyle2 = useAnimatedStyle(() => {
      return {
        opacity: unActiveTabTextOpacity.value
      }
    })

    const animatedTextStyle1 = useAnimatedStyle(() => {
      return {
        opacity: activeTabTextOpacity.value
      }
    })


    const handleLayout = (event) => {
      const { height, width, x, y } = event.nativeEvent.layout;

    const availableWidth = width - parentHorizontalPadding;
    setTabWidth(availableWidth / data.length); // Divide the available width by the number of tabs

      console.log('layout width: :', width, ' at TabsSlider file')
    };

 return (

    <View onLayout={handleLayout} style={[styles.container, style]}>


      <View style={[
        styles.tabsView, 
        {
          backgroundColor: themeColors.background4,
          backgroundColor: "red",
          alignItems: "center"
        }
        ]}>


      <Animated.View
        style={[animatedBackgroundStyle, {
          backgroundColor: "#FFFFFF",
          height: "100%", 
          width: tabWidth - margin_between_tabs,
          position: "absolute",
          top: useResponsiveVerticalSpace(4),
          // marginHorizontal: useResponsiveHorizontalSpace(5),
          borderRadius: useResponsiveRadius(8),
          zIndex: 10,
          
        }]}
        />


        <View style={[
        styles.tabsView, 
        {
          backgroundColor: themeColors.background4,
          backgroundColor: "red",
          alignItems: "center",
          // marginLeft: 5,
        }
        ]}>


        {data.map((button, index) => {

            const selected = selectedTab === index;
            const backgroundColor = selected ? themeColors.purple : themeColors.background4

            const color = themeColors.text

            const animatedStyle = index === 0 ? animatedTextStyle1 : animatedTextStyle2


            // const tabWidth = (index + 1) === (data.length) ? tabWidth - : 10

            return(
                <Pressable style={{
                  ...styles.tabView,

                  marginLeft: margin_between_tabs - 2.5 ,
                  // marginRight: (index + 1) === (data.length) ? 10 : 10, 
                  width: tabWidth ,
                }}
                key={index}
                onPress={() => onTabPress(button, index)}
                >
                    {({pressed}) => {
                        const opacity = !selected && pressed ? 0.3 : 1
                        return(
                            <Animated.Text 
                            style={[animatedStyle,
                              styles.tabText, {color: color}]}>
                                {button.name}
                            </Animated.Text>
                        )
                    }}
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
    backgroundColor: "white",
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
    backgroundColor: "orange",
  },

  tabText: {
    fontSize: useResponsiveFontSize(15),
    fontWeight: "600",
    // backgroundColor: "orange"
  },

  
});