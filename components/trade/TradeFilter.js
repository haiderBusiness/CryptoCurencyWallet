import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useThemeColors from '../../hooks/useThemeColors';

export default function TradeFilter({}) {
    const themeColors = useThemeColors()
 return (
  <View style={{...styles.container, backgroundColor: themeColors.background2}}>
   <Text>TradeFilter</Text>
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