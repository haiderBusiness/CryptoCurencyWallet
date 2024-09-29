import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { interface_check_bold_white, interface_check_white } from '../assets/dummy/icons_pictures';
import { useResponsiveBothHeightWidth } from '../hooks/useResponsiveness';
// import useThemeColors from '../hooks/useThemeColors';

export default function Checkbox({size = 30, checked = false, themeColors = {}, borderWidth = 2, style}) {

    const checkedBackgroundColor = themeColors.mainColor

    const BACKGROUND_COLOR = checked ? checkedBackgroundColor : "transparent"
    const BORDER_COLOR = checked ? BACKGROUND_COLOR : themeColors.text4 ? themeColors.text4 : "rgba(0,0,0,0.3)"
 return (

   <View style={{
    backgroundColor: BACKGROUND_COLOR, 
    borderWidth: borderWidth, 
    width: size + useResponsiveBothHeightWidth(8), 
    height: size + useResponsiveBothHeightWidth(8),
    borderRadius: 5,
    borderColor: BORDER_COLOR,
    justifyContent: "center",
    alignItems: "center",
    ...style,
    }}>
   {checked && <Image source={interface_check_bold_white} style={{width: size, height: size}}/>}
   </View>
 );
}



const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  },

});