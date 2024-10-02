import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomPressable from '../../RNComponents/CustomPressable';
import {useResponsiveVerticalSpace, useResponsiveBothHeightWidth, useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius } from '@hooks/useResponsiveness';
import { arrow_back_black, usdt } from '../../../assets/dummy/icons_pictures';
import { useResponsiveWidth } from '../../../hooks/useResponsiveness';
import Animated, { FadeIn, FadeOut, LinearTransition, useSharedValue, withTiming } from 'react-native-reanimated';

const ITEM_HEIGHT = useResponsiveHeight(50)
const HORIZONTAL_PADDING = useResponsiveHorizontalSpace(18)
export default function CryptoDropdown({
    data = [], themeColors = {}, 
    defaultItem = {name: 'USDT', image: usdt} 
}) {

    const textStyle = {textColor: themeColors.text}

    const [showList, setShowList] = useState(false)
    const [activeItem, setActiveItem] = useState(defaultItem)




    const sectionBackgroundStyle = {
      backgroundColor: themeColors.background,
      borderRadius: useResponsiveRadius(10),
      paddingVertical: useResponsiveVerticalSpace(10),
      paddingHorizontal: HORIZONTAL_PADDING,
      // height: 300,
    }

    const backgroundStyle = {
      backgroundColor: themeColors.background
    }


    // height of all items minus the active item because its not showing in the dropdonw list
    const LIST_HEIGHT =  useSharedValue(0) // its only one item height: don't know why its working as all items height


    const updateActiveItem = (item) => {
      setActiveItem(item);
      onActiveButtonPress()
    }


    const onActiveButtonPress = () => {
 
      if(!showList) {
        LIST_HEIGHT.value = withTiming(ITEM_HEIGHT)
      } else {
        LIST_HEIGHT.value = withTiming(0)
      }
      setShowList(!showList)

    }


 return (
  <View
  // layout={LinearTransition.duration(350)}
  style={{borderRadius: useResponsiveRadius(10), overflow: "hidden", backgroundColor: backgroundStyle.backgroundColor}}
  >


{/* {showList &&    <Animated.View
                    entering={FadeIn.duration(1000)}
                    exiting={FadeOut.duration(1000)}
    style={[styles.titleView, {backgroundColor: "red"}]}
    >
    <View style={styles.textAndCoin}>
      <Text style={[styles.searchResultText, textStyle]}>
            {activeItem.name}
        </Text>
        
      <Image source={activeItem.image} style={styles.coinImage}/>
    </View>

    <Image source={arrow_back_black} style={[styles.arrowImage, {transform: [{rotate: showList ? "90deg": "-90deg"}]}]}/>
    </Animated.View>} */}



    <View>

        <CustomPressable onPress={onActiveButtonPress} 
        style={[styles.titleView, backgroundStyle]}
        >
          <View style={styles.textAndCoin}>
            <Text style={[styles.searchResultText, textStyle]}>
                  {activeItem.name}
              </Text>
              
            <Image source={activeItem.image} style={styles.coinImage}/>
          </View>

          <Image source={arrow_back_black} style={[styles.arrowImage, {transform: [{rotate: showList ? "90deg": "-90deg"}]}]}/>

        </CustomPressable>
        { data.map((item, index) => {

            const paddingVertical =  data.length < 2 ? useResponsiveVerticalSpace(10) : 0
            if(item.name !== activeItem.name)
            return(
              <Animated.View key={index}   
              // layout={LinearTransition.duration(350)}
              style={{height: LIST_HEIGHT}}
              
              >
                {showList && 
                   <Animated.View
                   
                   key={index}
                   entering={FadeIn.duration(350)}
                   exiting={FadeOut.duration(250)}
                   >
                      <CustomPressable 
                       onPress={() => updateActiveItem(item)}
                       style={[styles.titleView 
                        ,backgroundStyle
                        ]}
                       >
                       <View style={styles.textAndCoin}>
                         <Text style={[styles.searchResultText, textStyle]}>
                               {item.name}
                           </Text>
                           
                         
                       </View>
             
                       <Image source={item.image} style={styles.coinImage}/>
         
                    </CustomPressable>
                   </Animated.View>
                }
              </Animated.View>
             
             

            )
            })
        }
    </View>
  </View>
 );
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
//   height: '100%',
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: "red"
  },

  searchResults: {
    maxHeight: useResponsiveHeight(160),
    paddingTop: useResponsiveVerticalSpace(10),

    
    width: "100%",
    position: "absolute",
    top: useResponsiveVerticalSpace(30),
    zIndex: -1,
    borderBottomEndRadius: useResponsiveRadius(10),
    borderBottomStartRadius: useResponsiveRadius(10),
    borderBottomLeftRadius: useResponsiveRadius(10),
    borderBottomRightRadius: useResponsiveRadius(10),
    backgroundColor: "red",
    borderWidth: useResponsiveBothHeightWidth(2),
  },

  searchResult: {
    paddingHorizontal: useResponsiveHorizontalSpace(10),
    marginTop: useResponsiveVerticalSpace(5),
    minHeight: useResponsiveHeight(30),
    justifyContent: "center",
    alignItems: "flex-start",
  },

  searchResultText: {
    fontSize: useResponsiveFontSize(16),
    textTransform: "uppercase"
  },


  arrowImage: {
    width: useResponsiveBothHeightWidth(25),
    height: useResponsiveBothHeightWidth(25),
    opacity: 0.3,
    transform: [{rotate: "-90deg"}],
    // backgroundColor: "red"
  },

  coinImage: {
    width: useResponsiveBothHeightWidth(25),
    height: useResponsiveBothHeightWidth(25),
    marginLeft: 10,
    // backgroundColor: "red"
  },

  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: HORIZONTAL_PADDING,

  },

  textAndCoin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: ITEM_HEIGHT,
    // backgroundColor: "red"
  }
});