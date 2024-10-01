import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomPressable from '../../RNComponents/CustomPressable';
import {useResponsiveVerticalSpace, useResponsiveBothHeightWidth, useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius } from '@hooks/useResponsiveness';

export default function CryptoDropdown({data = [], themeColors = {}, activeItem = "usdt"}) {

    const textStyle = {textColor: themeColors.text}

    const [show, setShow] = useState(false)


 return (
  <View style={styles.container}>
    <View keyboardShouldPersistTaps='always'>

        <View>
            <Text style={[styles.searchResultText, textStyle]}>
                {activeItem}
            </Text>
        </View>
        {show && data.map((item, index) => {

            const paddingVertical =  data.length < 2 ? useResponsiveVerticalSpace(10) : 0
            return(
                <CustomPressable
                style={
                {...styles.searchResult, 
                    backgroundColor: themeColors.background,
                    paddingVertical: paddingVertical,
                }
                } 
                onPress={() => {}} 
                key={index}>
                <Text style={[styles.searchResultText, textStyle]}>
                {item.name}
                </Text>
                </CustomPressable>

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
 
  }
});