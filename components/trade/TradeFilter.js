import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useThemeColors from '../../hooks/useThemeColors';

export default function TradeFilter({}) {
    const themeColors = useThemeColors()
 return (
  <View style={{...styles.container, backgroundColor: themeColors.background2}}>



    {/* //REVIEW Apply last used filter section  */}
    <View>
     <Text>
        Apply last used filter switch
     </Text>
    </View>

    {/* //REVIEW trade limits section  */}
    <View>
    <Text>Minimum</Text>
    <Text>Maximum</Text> 
    </View>

    {/* //REVIEW payment methods section  */}
    <View>
      <Text>Payment Methods</Text>
    </View>


    {/* //REVIEW user type section  */}
    <View>
      <Text>User Type</Text>
    </View>



    {/* //REVIEW offer tags section  */}
    <View>
      <Text>Offer tags</Text>
    </View>


    {/* //REVIEW offer location section  */}
    <View>
      <Text>Offer location</Text>
    </View>


    {/* //REVIEW offer location section  */}
    <View>
      <Text>Offer tags</Text>
    </View>



    {/* //REVIEW switches section  */}
    <View>
      <Text>Verified offers switch</Text>
      <Text>Recently active traders</Text>
    </View>

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