import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { interface_check_white } from '../assets/dummy/icons_pictures';
// import useThemeColors from '../hooks/useThemeColors';

export default function Checkbox({size = 30, checked = false, themeColors, borderWidth = 2, style}) {

    const colors = themeColors ? themeColors() : null
    const checkedBackgroundColor = colors ? colors.main_color : "pink"

    const BACKGROUND_COLOR = checked ? checkedBackgroundColor : "transparent"
 return (

   <View style={{
    backgroundColor: BACKGROUND_COLOR, 
    borderWidth: borderWidth, 
    width: size, 
    height: size,
    borderRadius: 5,
    ...style,
    }}>
   {checked && <Image source={interface_check_white} style={{width: size, height: size}}/>}
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