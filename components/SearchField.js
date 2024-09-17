import React, {useRef} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Pressable, Dimensions} from 'react-native';
import { useResponsiveFontSize, useResponsiveHeight, useResponsiveHorizontalSpace, useResponsiveRadius, useResponsiveVerticalSpace, useResponsiveWidth, useResponsiveBothHeightWidth } from '../hooks/useResponsiveness';
import { interface_search_black } from '../assets/dummy/icons_pictures';
import useThemeColors from '../hooks/useThemeColors';
import Animated from 'react-native-reanimated';


export default function SearchField({style, placeholderColor, onPress}) {


  const {width, height} = Dimensions.get("window")
  const themeColors = useThemeColors()

  const inputRef = useRef(null);

  // Function to focus the TextInput programmatically
  const focusTextInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const searchStyle = {
    backgroundColor: themeColors.background4,
    // backgroundColor: "red"
  }

  const containerStyle = {backgroundColor: themeColors.background}


  const onParentPress = () => {
    focusTextInput()
    onPress()
    // console.log("onPress, ", onPress())

  }




 return (

  <Pressable onPress={onParentPress} style={[styles.container, {height: 45}, style]} >

    <View  style={[styles.child, searchStyle]}>
      <Image pointerEvents='none' source={interface_search_black} style={styles.searchIcon}/>
      <TextInput  
      ref={inputRef} 
      placeholder='Search'
      placeholderTextColor={placeholderColor}
      style={styles.textInput}
      pointerEvents='none'
      />
    </View>
  </Pressable>
 );
}



const styles = StyleSheet.create({
  container: {
  //  width: '100%',
 //   height: useResponsiveBothHeightWidth(40),
   alignItems: 'center',
   justifyContent: 'flex-start',
   backgroundColor: "transparent",
  //  backgroundColor: "red"

 //   paddingHorizontal: useResponsiveHorizontalSpace(30),
   },
 
   child: {
     flexDirection: "row",
     justifyContent: "flex-start",
     alignItems: "center",
     justifyContent: "space-between",
     height: useResponsiveHeight(35),
     // backgroundColor: "green",
     // width: "100%",
     borderRadius: useResponsiveRadius(10),
    //  paddingHorizontal: useResponsiveHorizontalSpace(18),

     backgroundColor: "red",
     // backgroundColor: "pink"
   },
 
   searchBar: {
     height: useResponsiveHeight(45), 
     // paddingRight: useResponsiveHorizontalSpace(5),
     // width: "100%",
     // width: "100%",
     flex: 1,
     // marginLeft: useResponsiveHorizontalSpace(10),
     justifyContent: "flex-start",
     // backgroundColor: "green"
   },
 
   imageTextInputView: {
     flexDirection: "row",
     justifyContent: "flex-start",
     alignItems: "center",
     height: useResponsiveHeight(35),
     width: "100%",
     // backgroundColor: "green",
     // width: "100%",
     borderRadius: useResponsiveRadius(10)
   },
 
 
 
   searchIcon: {
     width: useResponsiveBothHeightWidth(16),
     height: useResponsiveBothHeightWidth(16),
     marginRight: useResponsiveHorizontalSpace(7),
     marginLeft: useResponsiveHorizontalSpace(7),
     opacity: 0.5
   },
 
   earseIcon: {
     width: useResponsiveBothHeightWidth(16),
     height: useResponsiveBothHeightWidth(16),
     marginRight: useResponsiveHorizontalSpace(7),
     marginLeft: useResponsiveHorizontalSpace(7),
     opacity: 0.4
   },
 
   
 
   textInput: {
     fontSize: useResponsiveFontSize(16),
     fontWeight: "400",
     // width: "100%",
     // backgroundColor: "green",
     height: "100%",
     flex: 1,
     marginRight: 10,
     // maxWidth: "94%",
     // alignSelf: 'stretch',
   },
 
 
   cancelButtonStyle : {
     width: useResponsiveWidth(70),
     height: "100%", 
     alignItems: "center", 
     justifyContent: "center", 
     // paddingLeft: useResponsiveHorizontalSpace(5)
     paddingLeft: useResponsiveHorizontalSpace(10),
     // paddingRight: useResponsiveHorizontalSpace(5),
     // backgroundColor: "beige",
     paddingBottom: useResponsiveVerticalSpace(10),
     // paddingLeft: useResponsiveVerticalSpace(5)
   },
 
   cancelText: {
     fontSize: useResponsiveFontSize(18),
     // textAlign: "flex-start",
     // marginLeft: 10,
     // marginBottom: useResponsiveVerticalSpace(8)
   }
 });