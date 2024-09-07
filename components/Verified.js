import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import useThemeColors from '../hooks/useThemeColors';
import { useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace, useResponsiveWidth } from '../hooks/useResponsiveness';
import { interfaceShieldTrustGreen } from '../assets/dummy/icons_pictures';
import English from '../constants/English';

export default function Verified({isVerified}) {
    
    const themeColors = useThemeColors()

 return (
    <View style={{...styles.verifiedView, backgroundColor: themeColors.lightGreen9}}>
      <Image style={styles.verifiedImage} source={interfaceShieldTrustGreen}/>
      <Text style={{...styles.verifiedText, color: themeColors.text}}>{capitalizeFirstLetter(English.verified)}
      </Text>
    </View>
 );
}



const styles = StyleSheet.create({
    verifiedImage: {
        width: useResponsiveWidth(15),
        height: useResponsiveHeight(15),
        marginRight: useResponsiveHorizontalSpace(5),
      },
    
      verifiedView: {
        // width: useResponsiveWidth(20),
        // height: useResponsiveHeight(20),
        paddingVertical: useResponsiveVerticalSpace(2),
        paddingHorizontal: useResponsiveHorizontalSpace(5),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: useResponsiveRadius(20)
      },
    
      verifiedText: {
    
      },
});